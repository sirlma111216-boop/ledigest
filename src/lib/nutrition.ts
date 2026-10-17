/**
 * 미니 체험용 정규화·계산 로직 (가상 데이터 전용).
 * 참가자 앱에 요구하는 정규화 정책을 그대로 따른다.
 * - 빈 문자열·null·'-'·수치가 아닌 값은 0이 아니라 null + 원문
 * - 기준량은 '100g', '100 g', '100mL'처럼 명확할 때만 파싱
 * - g와 mL를 서로 환산하지 않음
 * - 당류는 탄수화물에 포함되므로 합계에서 중복 합산하지 않음
 */
import { DEMO_RAW, DEMO_META, type DemoRaw } from '../content/reference'

export type Unit = 'g' | 'mL'
export type NutrientKey = 'carbohydrate' | 'protein' | 'fat' | 'sugars' | 'energy'

export interface Nutrient {
  value: number | null
  raw: string
}

export interface Food {
  id: string
  name: string
  maker: string
  basis: { raw: string; value: number | null; unit: Unit | null }
  nutrients: Record<NutrientKey, Nutrient>
  source: string
  sourceKind: 'demo'
  sourceDate: string | null
}

export const NUTRIENT_LABEL: Record<NutrientKey, string> = {
  carbohydrate: '탄수화물',
  protein: '단백질',
  fat: '지방',
  sugars: '당류(탄수화물에 포함)',
  energy: '에너지',
}

/** 원자료 값을 숫자로 읽는다. 유한한 음이 아닌 수치만 숫자로 인정한다. */
export function parseNutrient(raw: unknown): Nutrient {
  if (raw === null || raw === undefined) return { value: null, raw: raw === null ? 'null' : '' }
  const s = String(raw).trim()
  if (s === '' || s === '-') return { value: null, raw: s }
  if (!/^\d+(\.\d+)?$/.test(s)) return { value: null, raw: s }
  const n = Number(s)
  if (!Number.isFinite(n) || n < 0) return { value: null, raw: s }
  return { value: n, raw: s }
}

/** 명확한 숫자+단위(g 또는 mL)일 때만 기준량을 읽는다. */
export function parseBasis(raw: string): Food['basis'] {
  const s = (raw ?? '').trim()
  const m = /^(\d+(?:\.\d+)?)\s*(g|ml)$/i.exec(s)
  if (!m) return { raw: s, value: null, unit: null }
  const value = Number(m[1])
  if (!Number.isFinite(value) || value <= 0) return { raw: s, value: null, unit: null }
  const unit: Unit = m[2].toLowerCase() === 'g' ? 'g' : 'mL'
  // 'G'처럼 대문자 g는 mg 등과 혼동될 수 있으나 정규식이 숫자 바로 뒤 단위만 허용하므로 g로 읽는다.
  return { raw: s, value, unit }
}

export function normalizeDemo(r: DemoRaw): Food {
  return {
    id: r.FOOD_CD,
    name: r.FOOD_NM_KR,
    maker: DEMO_META.maker,
    basis: parseBasis(r.SERVING_SIZE),
    nutrients: {
      energy: parseNutrient(r.AMT_NUM1),
      protein: parseNutrient(r.AMT_NUM3),
      fat: parseNutrient(r.AMT_NUM4),
      carbohydrate: parseNutrient(r.AMT_NUM6),
      sugars: parseNutrient(r.AMT_NUM7),
    },
    source: DEMO_META.source,
    sourceKind: 'demo',
    sourceDate: null,
  }
}

export const DEMO_FOODS: Food[] = DEMO_RAW.map(normalizeDemo)

export function canScale(f: Food): boolean {
  return f.basis.value !== null && f.basis.unit !== null
}

/** 선택량 문자열 검사. 빈 값·0·음수·무한대·숫자가 아닌 값은 거부한다. */
export function validateAmount(input: string): { ok: true; value: number } | { ok: false; reason: string } {
  const s = input.trim()
  if (s === '') return { ok: false, reason: '선택량을 입력하세요.' }
  if (!/^\d+(\.\d+)?$/.test(s)) return { ok: false, reason: '양수 숫자만 입력할 수 있습니다.' }
  const n = Number(s)
  if (!Number.isFinite(n)) return { ok: false, reason: '유한한 숫자를 입력하세요.' }
  if (n <= 0) return { ok: false, reason: '0보다 큰 양을 입력하세요.' }
  if (n > 5000) return { ok: false, reason: '연습에서는 5000 이하로 입력하세요.' }
  return { ok: true, value: n }
}

/** 영양소 선택량 = 기준 영양소 × 선택량 / 기준량 */
export function scaled(f: Food, key: NutrientKey, amount: number): number | null {
  const v = f.nutrients[key].value
  if (v === null || f.basis.value === null) return null
  return (v * amount) / f.basis.value
}

export interface PlateItem {
  uid: string
  foodId: string
  amount: number
}

export interface TotalCell {
  sum: number
  missing: number
  counted: number
}

const TOTAL_KEYS: NutrientKey[] = ['carbohydrate', 'protein', 'fat', 'sugars']

/** 합계는 상태에 저장하지 않고 현재 접시 원자료로 매번 계산한다. */
export function plateTotals(items: PlateItem[], foods: Food[]): Record<NutrientKey, TotalCell> {
  const out = {} as Record<NutrientKey, TotalCell>
  for (const k of [...TOTAL_KEYS, 'energy' as NutrientKey]) out[k] = { sum: 0, missing: 0, counted: 0 }
  for (const it of items) {
    const f = foods.find((x) => x.id === it.foodId)
    if (!f) continue
    for (const k of Object.keys(out) as NutrientKey[]) {
      const v = scaled(f, k, it.amount)
      if (v === null) out[k].missing += 1
      else {
        out[k].sum += v
        out[k].counted += 1
      }
    }
  }
  return out
}

export function fmt(n: number | null, unit = 'g'): string {
  if (n === null) return '정보 없음'
  const r = Math.round(n * 10) / 10
  const s = Number.isInteger(r) ? String(r) : r.toFixed(1)
  return `${s}${unit}`
}
