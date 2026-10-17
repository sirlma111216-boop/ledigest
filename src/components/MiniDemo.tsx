import { useEffect, useMemo, useState } from 'react'
import { DEMO_META } from '../content/reference'
import { AGENTS, MODELS, ORGANS, PICKABLE_ORGANS, type ModelId, type OrganId } from '../content/digestion'
import { DEMO_FOODS, canScale, fmt, plateTotals, scaled, validateAmount, type Food, type NutrientKey, type PlateItem } from '../lib/nutrition'
import { DigestiveSvg } from './DigestiveSvg'
import { Pic } from './Pic'

interface Props {
  reduceMotion: boolean
}

/** 연습용 음식 → 이미지 자료 id (파일이 없으면 FoodIcon 으로 대체) */
const DEMO_IMAGE: Record<string, string> = {
  'DEMO-A': 'demo-a',
  'DEMO-B': 'demo-b',
  'DEMO-C': 'demo-c',
  'DEMO-D': 'demo-d',
  'DEMO-E': 'demo-e',
}

const MAX_PLATE = 5
const SHOW_KEYS: NutrientKey[] = ['carbohydrate', 'protein', 'fat']

export function MiniDemo({ reduceMotion }: Props) {
  const [selId, setSelId] = useState<string>('DEMO-A')
  const [amountInput, setAmountInput] = useState('50')
  const [addMsg, setAddMsg] = useState('')
  const [plate, setPlate] = useState<PlateItem[]>([])
  const [editing, setEditing] = useState<Record<string, string>>({})
  const [editMsg, setEditMsg] = useState<Record<string, string>>({})
  const [showCompare, setShowCompare] = useState(false)

  const food = DEMO_FOODS.find((f) => f.id === selId) as Food
  const totals = useMemo(() => plateTotals(plate, DEMO_FOODS), [plate])

  const add = () => {
    if (!canScale(food)) {
      setAddMsg('이 자료는 기준량을 읽을 수 없어 선택량을 계산할 수 없습니다. 원자료만 확인하세요.')
      return
    }
    if (plate.length >= MAX_PLATE) {
      setAddMsg(`접시에는 최대 ${MAX_PLATE}개까지 담을 수 있습니다.`)
      return
    }
    const v = validateAmount(amountInput)
    if (!v.ok) {
      setAddMsg(v.reason)
      return
    }
    setPlate((p) => [...p, { uid: `${food.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, foodId: food.id, amount: v.value }])
    setAddMsg(`${food.name} ${v.value}${food.basis.unit}을(를) 접시에 담았습니다.`)
  }

  const saveEdit = (uid: string) => {
    const v = validateAmount(editing[uid] ?? '')
    if (!v.ok) {
      setEditMsg((m) => ({ ...m, [uid]: v.reason }))
      return
    }
    setPlate((p) => p.map((it) => (it.uid === uid ? { ...it, amount: v.value } : it)))
    setEditing((e) => {
      const n = { ...e }
      delete n[uid]
      return n
    })
    setEditMsg((m) => ({ ...m, [uid]: '' }))
  }

  const clearPlate = () => {
    if (plate.length === 0) return
    if (window.confirm('접시의 모든 항목을 비울까요?')) setPlate([])
  }

  const maxBar = Math.max(1, ...(['carbohydrate', 'protein', 'fat', 'sugars'] as NutrientKey[]).map((k) => totals[k].sum))

  return (
    <div className="mini-demo app-skin">
      <div className="demo-banner">
        <span className="badge badge-app">학생용 앱 미리보기</span>
        <span className="badge badge-demo">{DEMO_META.badge}</span>
        <p>
          이 미니 체험은 <strong>가상 데이터</strong>만 사용합니다. 실제 제품의 영양성분이 아니며 공공 API를 호출하지 않습니다.
        </p>
      </div>

      {/* 1. 음식 고르기 */}
      <section className="demo-section" aria-labelledby="demo-foods">
        <h4 id="demo-foods">① 음식 고르기</h4>
        <div className="food-picker" role="radiogroup" aria-label="연습용 음식">
          {DEMO_FOODS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={f.id === selId}
              className={`food-chip${f.id === selId ? ' is-on' : ''}`}
              onClick={() => {
                setSelId(f.id)
                setAddMsg('')
              }}
            >
              <Pic id={DEMO_IMAGE[f.id]} className="food-icon" decorative fallback={<FoodIcon unit={f.basis.unit} />} />
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        <FoodCard food={food} onStarch={() => setShowCompare(true)} />

        {showCompare && <GlucoseStarchCard onClose={() => setShowCompare(false)} />}
      </section>

      {/* 2. 접시 */}
      <section className="demo-section" aria-labelledby="demo-plate">
        <h4 id="demo-plate">② 나의 접시 (최대 {MAX_PLATE}개)</h4>
        <div className="add-row">
          <label htmlFor="amount-input">
            선택량 {food.basis.unit ? `(${food.basis.unit})` : ''}
          </label>
          <input
            id="amount-input"
            inputMode="decimal"
            value={amountInput}
            disabled={!canScale(food)}
            onChange={(e) => setAmountInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            aria-describedby="amount-help"
          />
          <span className="unit-tag">{food.basis.unit ?? '단위 미상'}</span>
          <button type="button" className="btn btn-app" onClick={add} disabled={!canScale(food)}>
            접시에 담기
          </button>
        </div>
        <p id="amount-help" className="help">
          {canScale(food)
            ? `기준량(${food.basis.raw})과 같은 단위 ${food.basis.unit}로 입력합니다. ‘한 봉지’ 같은 양은 추정하지 않습니다.`
            : '기준량을 읽을 수 없어 선택량 환산과 접시 담기가 꺼져 있습니다. 원자료 표시는 위 카드에서 확인할 수 있습니다.'}
        </p>
        <p className="status-line" role="status" aria-live="polite">
          {addMsg}
        </p>

        {plate.length === 0 ? (
          <p className="empty">접시가 비어 있습니다. 예: 연습용 간식 A 50g과 연습용 간식 B 100g을 담아 보세요.</p>
        ) : (
          <ul className="plate-list">
            {plate.map((it) => {
              const f = DEMO_FOODS.find((x) => x.id === it.foodId) as Food
              const isEdit = it.uid in editing
              return (
                <li key={it.uid} className="plate-item">
                  <div className="plate-main">
                    <strong>{f.name}</strong>
                    {isEdit ? (
                      <span className="edit-row">
                        <label className="sr-only" htmlFor={`edit-${it.uid}`}>
                          {f.name} 선택량 수정 ({f.basis.unit})
                        </label>
                        <input
                          id={`edit-${it.uid}`}
                          inputMode="decimal"
                          value={editing[it.uid]}
                          onChange={(e) => setEditing((m) => ({ ...m, [it.uid]: e.target.value }))}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(it.uid)}
                        />
                        <span>{f.basis.unit}</span>
                        <button type="button" className="btn btn-small" onClick={() => saveEdit(it.uid)}>
                          저장
                        </button>
                      </span>
                    ) : (
                      <span>
                        {it.amount}
                        {f.basis.unit} (기준 {f.basis.raw})
                      </span>
                    )}
                  </div>
                  <div className="plate-nutrients">
                    {SHOW_KEYS.map((k) => (
                      <span key={k}>
                        {labelOf(k)} {fmt(scaled(f, k, it.amount))}
                      </span>
                    ))}
                    <span className="sub">당류 {fmt(scaled(f, 'sugars', it.amount))} (탄수화물에 포함)</span>
                  </div>
                  {editMsg[it.uid] && <p className="error-text">{editMsg[it.uid]}</p>}
                  <div className="plate-actions">
                    {!isEdit && (
                      <button type="button" className="btn btn-small" onClick={() => setEditing((m) => ({ ...m, [it.uid]: String(it.amount) }))}>
                        선택량 수정
                      </button>
                    )}
                    <button type="button" className="btn btn-small btn-ghost" onClick={() => setPlate((p) => p.filter((x) => x.uid !== it.uid))}>
                      삭제
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {plate.length > 0 && (
          <>
            <table className="totals-table">
              <caption>접시 합계 (선택한 양 기준 · 실제 섭취량이나 개인별 흡수량이 아님)</caption>
              <thead>
                <tr>
                  <th scope="col">영양소</th>
                  <th scope="col">합계</th>
                  <th scope="col">상태</th>
                </tr>
              </thead>
              <tbody>
                {(['carbohydrate', 'protein', 'fat', 'sugars'] as NutrientKey[]).map((k) => {
                  const t = totals[k]
                  const allMissing = t.counted === 0
                  return (
                    <tr key={k}>
                      <th scope="row">{k === 'sugars' ? '└ 당류 (탄수화물에 포함, 따로 더하지 않음)' : labelOf(k)}</th>
                      <td>{allMissing ? '정보 없음' : fmt(t.sum)}</td>
                      <td>{t.missing > 0 ? (allMissing ? `모든 항목 정보 없음 (${t.missing}건)` : `확인된 항목 합계 · 누락 ${t.missing}건`) : '모든 항목 확인됨'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="bars" aria-hidden="true">
              {(['carbohydrate', 'protein', 'fat', 'sugars'] as NutrientKey[]).map((k) => (
                <div key={k} className={`bar-row bar-${k}`}>
                  <span className="bar-label">{k === 'sugars' ? '당류' : labelOf(k)}</span>
                  <span className="bar-track">
                    <span className="bar-fill" style={{ width: `${(totals[k].sum / maxBar) * 100}%` }} />
                  </span>
                  <span className="bar-val">{totals[k].counted === 0 ? '정보 없음' : fmt(totals[k].sum)}</span>
                </div>
              ))}
            </div>
            <p className="help">막대는 영양소 g 값끼리 비교합니다. 탄수화물·단백질·지방의 합이 음식 전체 무게라는 뜻은 아닙니다.</p>
            <button type="button" className="btn btn-ghost" onClick={clearPlate}>
              접시 전체 비우기
            </button>
          </>
        )}
      </section>

      {/* 3. 소화 모형 */}
      <DigestionModel reduceMotion={reduceMotion} />

      {/* 4. 효소 연결 */}
      <EnzymeMatch />
    </div>
  )
}

function labelOf(k: NutrientKey) {
  return k === 'carbohydrate' ? '탄수화물' : k === 'protein' ? '단백질' : k === 'fat' ? '지방' : k === 'sugars' ? '당류' : '에너지'
}

function FoodIcon({ unit }: { unit: 'g' | 'mL' | null }) {
  // 실제 식품 사진 대신 음식 유형의 중립적인 아이콘
  if (unit === 'mL')
    return (
      <svg className="food-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h10l-1.5 17a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7.6 9h8.8" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  return (
    <svg className="food-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="6" width="16" height="13" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 6V4h8v2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function FoodCard({ food, onStarch }: { food: Food; onStarch: () => void }) {
  const n = food.nutrients
  return (
    <article className="food-card" aria-label={`${food.name} 자료 카드`}>
      <header>
        <h5>
          <Pic id={DEMO_IMAGE[food.id]} className="food-card-img" decorative />
          {food.name}
        </h5>
        <span className="badge badge-demo">{DEMO_META.badge}</span>
      </header>
      <dl className="meta-grid">
        <div>
          <dt>식품 코드</dt>
          <dd>{food.id}</dd>
        </div>
        <div>
          <dt>영양성분 기준량</dt>
          <dd>
            {food.basis.unit ? `${food.basis.value}${food.basis.unit}` : `원문: ${food.basis.raw}`}
            {!canScale(food) && <span className="warn-inline"> · 선택량 환산 불가</span>}
          </dd>
        </div>
        <div>
          <dt>업체/자료 구분</dt>
          <dd>{food.maker}</dd>
        </div>
        <div>
          <dt>출처</dt>
          <dd>{food.source}</dd>
        </div>
        <div>
          <dt>자료 날짜</dt>
          <dd>{food.sourceDate ?? '정보 없음'}</dd>
        </div>
      </dl>
      <table className="nutrient-table">
        <caption>기준량 {food.basis.raw} 당 영양성분</caption>
        <thead>
          <tr>
            <th scope="col">영양소</th>
            <th scope="col">값</th>
            <th scope="col">원자료</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">탄수화물</th>
            <td>{fmt(n.carbohydrate.value)}</td>
            <td>
              <code>{rawText(n.carbohydrate.raw)}</code>
            </td>
          </tr>
          <tr className="sub-row">
            <th scope="row">└ 당류 (탄수화물에 포함)</th>
            <td>{fmt(n.sugars.value)}</td>
            <td>
              <code>{rawText(n.sugars.raw)}</code>
            </td>
          </tr>
          <tr>
            <th scope="row">단백질</th>
            <td>{fmt(n.protein.value)}</td>
            <td>
              <code>{rawText(n.protein.raw)}</code>
            </td>
          </tr>
          <tr>
            <th scope="row">지방</th>
            <td>{fmt(n.fat.value)}</td>
            <td>
              <code>{rawText(n.fat.raw)}</code>
            </td>
          </tr>
          <tr>
            <th scope="row">에너지</th>
            <td>{fmt(n.energy.value, 'kcal')}</td>
            <td>
              <code>{rawText(n.energy.raw)}</code>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="starch-entry">
        <button type="button" className="btn btn-small" onClick={onStarch}>
          포도당과 녹말 비교 카드 열기
        </button>
        <p className="caveat">녹말 대표 모형은 소화 원리를 배우기 위한 것입니다. 실제 탄수화물 전체가 녹말이라는 뜻은 아닙니다.</p>
      </div>
    </article>
  )
}

function rawText(raw: string) {
  if (raw === '') return '(빈 문자열)'
  return raw
}

function GlucoseStarchCard({ onClose }: { onClose: () => void }) {
  return (
    <aside className="compare-card" aria-label="포도당과 녹말 비교">
      <h5>포도당과 녹말 비교</h5>
      <div className="compare-grid">
        <figure>
          <svg viewBox="0 0 120 40" aria-hidden="true">
            <circle cx="60" cy="20" r="10" className="mol" />
          </svg>
          <figcaption>
            <strong>포도당</strong>: 이미 작은 분자다. 더 분해하지 않고 소장에서 흡수될 수 있다.
          </figcaption>
        </figure>
        <figure>
          <svg viewBox="0 0 120 40" aria-hidden="true">
            {[10, 26, 42, 58, 74, 90, 106].map((x) => (
              <circle key={x} cx={x} cy="20" r="7" className="mol" />
            ))}
            <path d="M10 20H106" className="bond" />
          </svg>
          <figcaption>
            <strong>녹말</strong>: 포도당이 많이 연결된 큰 분자다. 흡수되려면 소화 효소의 작용으로 작게 분해되어야 한다.
          </figcaption>
        </figure>
      </div>
      <p className="caveat">탄수화물에서 당류를 뺀 값은 녹말량이 아닙니다. 식이섬유 등 다른 성분이 있고 분석 정의가 다르기 때문입니다.</p>
      <button type="button" className="btn btn-small btn-ghost" onClick={onClose}>
        비교 카드 닫기
      </button>
    </aside>
  )
}

function DigestionModel({ reduceMotion }: { reduceMotion: boolean }) {
  const [model, setModel] = useState<ModelId>('starch')
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [cardView, setCardView] = useState(false)
  const m = MODELS[model]
  const step = m.steps[idx]
  const showCards = cardView || reduceMotion

  useEffect(() => {
    if (!playing || reduceMotion) return
    const t = window.setInterval(() => {
      setIdx((i) => {
        if (i >= m.steps.length - 1) {
          setPlaying(false)
          return i
        }
        return i + 1
      })
    }, 3200)
    return () => window.clearInterval(t)
  }, [playing, reduceMotion, m.steps.length])

  useEffect(() => {
    if (reduceMotion) setPlaying(false)
  }, [reduceMotion])

  const choose = (id: ModelId) => {
    setModel(id)
    setIdx(0)
    setPlaying(false)
  }

  return (
    <section className="demo-section" aria-labelledby="demo-model">
      <h4 id="demo-model">③ 교사가 검토한 대표 소화 모형</h4>
      <p className="help">
        음식의 영양소 자료와 별개인 <strong>일반적인 소화 원리 모형</strong>입니다. 단계의 진행 시간은 학습 순서일 뿐 실제 소화 시간이 아니며, 영양소 g 수치와 관계없이 같은 모형이 보입니다.
      </p>
      <div className="model-tabs" role="tablist" aria-label="대표 모형 선택">
        {(Object.keys(MODELS) as ModelId[]).map((id) => (
          <button key={id} type="button" role="tab" aria-selected={id === model} className={`tab${id === model ? ' is-on' : ''}`} onClick={() => choose(id)}>
            {MODELS[id].name}
          </button>
        ))}
      </div>
      <p className="caveat">{m.caveat}</p>

      {showCards ? (
        <>
          {reduceMotion && <p className="help">움직임 줄이기 상태라 모든 단계를 정적인 카드로 보여 줍니다.</p>}
          <ol className="model-cards">
            {m.steps.map((s, i) => (
              <li key={i}>
                <strong>
                  {i + 1}. {s.title}
                </strong>
                {s.helpers && <span className="helper-tag"> 돕는 기관: {s.helpers.map((h) => ORGANS[h].name).join('·')}</span>}
                <p>{s.text}</p>
                {s.image && <Pic id={s.image} className="step-pic" alt={`${s.title} 모형 그림`} />}
              </li>
            ))}
          </ol>
        </>
      ) : (
        <div className="model-split">
          <div className="model-svg">
            <DigestiveSvg active={step.organ} helpers={step.helpers} />
            <p className="legend">진한 실선: 음식물이 지나는 길 · 점선: 소화를 돕는 기관(음식물이 지나가지 않음)</p>
          </div>
          <div className="model-text" aria-live="polite">
            <p className="step-count">
              {idx + 1} / {m.steps.length}단계
            </p>
            <h5>{step.title}</h5>
            {step.helpers && <p className="helper-tag">돕는 기관: {step.helpers.map((h) => ORGANS[h].name).join('·')}</p>}
            <p>{step.text}</p>
            <div className="step-pics">
              <Pic id={ORGANS[step.organ].image} className="step-pic organ-pic" alt={`${ORGANS[step.organ].name} 확대 그림`} />
              {step.image && <Pic id={step.image} className="step-pic" alt={`${step.title} 모형 그림`} />}
            </div>
          </div>
        </div>
      )}

      <div className="model-controls no-print">
        {!showCards && (
          <>
            <button type="button" className="btn btn-small" onClick={() => setIdx(0)}>
              처음으로
            </button>
            <button type="button" className="btn btn-small" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}>
              이전
            </button>
            {!reduceMotion && (
              <button type="button" className="btn btn-small btn-app" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
                {playing ? '정지' : '재생'}
              </button>
            )}
            <button type="button" className="btn btn-small" onClick={() => setIdx((i) => Math.min(m.steps.length - 1, i + 1))} disabled={idx === m.steps.length - 1}>
              다음
            </button>
          </>
        )}
        {!reduceMotion && (
          <button type="button" className="btn btn-small btn-ghost" onClick={() => setCardView((v) => !v)} aria-pressed={cardView}>
            {cardView ? '모식도로 보기' : '모든 단계 카드로 보기'}
          </button>
        )}
      </div>
    </section>
  )
}

function EnzymeMatch() {
  const [agentId, setAgentId] = useState<string>('amylase')
  const [picked, setPicked] = useState<OrganId | null>(null)
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null)
  const agent = AGENTS.find((a) => a.id === agentId)!

  const pick = (organ: OrganId) => {
    setPicked(organ)
    const ok = agent.actsIn.includes(organ)
    let text = agent.feedback
    if (!ok) {
      if (agent.madeIn.includes(ORGANS[organ].name)) text = `${ORGANS[organ].name}은(는) ${agent.name}이(가) 만들어지는 곳입니다. 작용하는 곳은 ${agent.actsIn.map((o) => ORGANS[o].name).join('·')}입니다. ${agent.feedback}`
      else text = `${ORGANS[organ].name}에서는 ${agent.name}이(가) 주로 작용하지 않습니다. 다시 골라 보세요.`
    }
    setResult({ ok, text })
  }

  return (
    <section className="demo-section" aria-labelledby="demo-enzyme">
      <h4 id="demo-enzyme">④ 효소·담즙이 작용하는 곳 연결하기</h4>
      <p className="help">드래그 없이 버튼이나 모식도의 기관을 클릭·키보드(Tab, Enter)로 선택합니다.</p>
      <div className="agent-picker" role="radiogroup" aria-label="연결할 물질">
        {AGENTS.map((a) => (
          <button
            key={a.id}
            type="button"
            role="radio"
            aria-checked={a.id === agentId}
            className={`food-chip${a.id === agentId ? ' is-on' : ''}`}
            onClick={() => {
              setAgentId(a.id)
              setPicked(null)
              setResult(null)
            }}
          >
            <Pic id={a.image} className="food-icon" decorative />
            {a.name}
            {!a.isEnzyme && <span className="sub"> (효소 아님)</span>}
          </button>
        ))}
      </div>
      <p>
        <strong>{agent.name}</strong>이(가) 작용하는 곳은 어디일까요?
      </p>
      <div className="model-split">
        <div className="model-svg">
          <DigestiveSvg onPick={pick} picked={picked} />
        </div>
        <div>
          <div className="organ-buttons" role="group" aria-label="기관 선택 버튼">
            {PICKABLE_ORGANS.map((o) => (
              <button key={o} type="button" className={`btn btn-small${picked === o ? ' is-on' : ''}`} aria-pressed={picked === o} onClick={() => pick(o)}>
                {ORGANS[o].name}
              </button>
            ))}
          </div>
          <div className="feedback" role="status" aria-live="polite">
            {result && (
              <p className={result.ok ? 'fb-ok' : 'fb-no'}>
                <strong>{result.ok ? '맞아요.' : '다시 생각해 봐요.'}</strong> {result.text}
              </p>
            )}
            {result?.ok && picked && <Pic id={ORGANS[picked].image} className="step-pic organ-pic" alt={`${ORGANS[picked].name} 확대 그림`} />}
            {result?.ok && (
              <p className="help">
                만들어지는 곳: {agent.madeIn} · 작용하는 곳: {agent.actsIn.map((o) => ORGANS[o].name).join('·')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
