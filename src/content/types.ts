export type Workplace =
  | '연수 안내'
  | 'AI Studio'
  | '공공데이터포털'
  | 'GitHub'
  | 'Cloudflare'
  | '완성 앱'

export interface LinkRef {
  label: string
  url: string
  note?: string
}

export interface CopyBlock {
  /** 복사 블록의 종류. prompt = AI Studio에 입력할 프롬프트, settings = 계정·빌드 설정값, text = 기타 */
  kind: 'prompt' | 'settings' | 'text'
  title: string
  /** 복사 버튼이 그대로 복사하는 전문 */
  body: string
  /** 설정표 형식일 때 행 단위로 함께 표시 */
  rows?: { key: string; value: string; note?: string }[]
}

export interface Trouble {
  symptom: string
  where: string
  fix: string
  recheck: string
}

export interface Step {
  id: number
  title: string
  minutes: number
  goal: string
  workplaces: Workplace[]
  /** 2) 현재 작업할 서비스와 공식 링크 */
  links: LinkRef[]
  /** 3) 한 줄에 한 행동씩 적은 번호형 따라 하기 */
  actions: string[]
  /** 4) 복사할 프롬프트 전문 또는 계정 설정값 */
  copyBlocks: CopyBlock[]
  /** 5) 화면에서 직접 확인할 결과 */
  expected: string[]
  /** 6) 완료 체크리스트 — 사용자가 직접 체크해야 완료로 표시 */
  checklist: string[]
  /** 7) 자주 생기는 문제와 복구 프롬프트 */
  troubles: Trouble[]
  recoveryPrompts: { title: string; body: string }[]
  /** 단계 전용 보조 설명(설명 카드·강사 메모·접는 카드) */
  notes?: { title: string; body: string[]; tone?: 'info' | 'warn' | 'teacher' }[]
  /** 단계 안에 렌더링할 특수 블록 */
  widgets?: ('architecture' | 'mini-demo' | 'repo-input' | 'app-url-input' | 'final-flags' | 'error-memo' | 'zip-fallback' | 'images-link')[]
}
