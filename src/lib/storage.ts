/**
 * 버전이 있는 localStorage 저장소. 저장이 차단되면 메모리로 계속 동작한다.
 * 인증키는 어떤 필드에도 저장하지 않는다(입력란 자체가 없다).
 */
export type View = 'overview' | 'demo' | 'api' | 'instructor' | 'sources' | 'images' | `step-${number}`

export interface SavedState {
  version: 1
  view: View
  checks: Record<string, boolean>
  finalFlags: Record<string, boolean>
  repoUrl: string
  appUrl: string
  memo: string
  errorMemo: { where: string; symptom: string; message: string }
  reduceMotion: boolean
}

export const STORAGE_KEY = 'snack-body-journey-guide'
export const STORAGE_VERSION = 1 as const

export function defaultState(): SavedState {
  return {
    version: STORAGE_VERSION,
    view: 'overview',
    checks: {},
    finalFlags: {},
    repoUrl: '',
    appUrl: '',
    memo: '',
    errorMemo: { where: '', symptom: '', message: '' },
    reduceMotion: false,
  }
}

let memoryFallback: SavedState | null = null

export function loadState(): { state: SavedState; storageOk: boolean } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { state: defaultState(), storageOk: true }
    const parsed = JSON.parse(raw) as Partial<SavedState>
    if (parsed?.version !== STORAGE_VERSION) return { state: defaultState(), storageOk: true }
    const d = defaultState()
    return {
      state: {
        ...d,
        ...parsed,
        errorMemo: { ...d.errorMemo, ...(parsed.errorMemo ?? {}) },
        checks: { ...(parsed.checks ?? {}) },
        finalFlags: { ...(parsed.finalFlags ?? {}) },
      } as SavedState,
      storageOk: true,
    }
  } catch {
    return { state: memoryFallback ?? defaultState(), storageOk: false }
  }
}

export function saveState(s: SavedState): boolean {
  memoryFallback = s
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    return true
  } catch {
    return false
  }
}

export function clearState(): boolean {
  memoryFallback = null
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

/** 붙여 넣은 문자열에 인증키 흔적이 있는지 가볍게 검사(경고용, 저장을 막지 않음). */
export function looksLikeSecret(text: string): boolean {
  if (/serviceKey\s*=/i.test(text)) return true
  if (/DATA_GO_KR_SERVICE_KEY\s*[=:]\s*\S{8,}/.test(text)) return true
  // 공공데이터포털 인증키처럼 보이는 긴 영숫자/특수문자열
  if (/[A-Za-z0-9%+/=]{60,}/.test(text)) return true
  return false
}
