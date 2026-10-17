import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { STEPS, TOTAL_MINUTES } from './content/steps'
import { DOC_DATE, SCOPE, WORKPLACE_LINKS } from './content/reference'
import type { Workplace } from './content/types'
import { clearState, defaultState, loadState, saveState, type SavedState, type View } from './lib/storage'
import { StepView } from './components/StepView'
import { ApiPage, InstructorPage, OverviewPage, SourcesPage } from './components/Pages'
import { MiniDemo } from './components/MiniDemo'
import { ImagesPage } from './components/ImagesPage'
import { Pic } from './components/Pic'

const EXTRA_VIEWS: { view: View; label: string }[] = [
  { view: 'demo', label: '미니 체험 (가상 데이터)' },
  { view: 'images', label: '이미지 자료 (내려받기·프롬프트)' },
  { view: 'api', label: 'API 명세·정규화 정책' },
  { view: 'instructor', label: '강사 준비·수업 운영' },
  { view: 'sources', label: '선택 확장·공식 자료' },
]

function isView(v: string): v is View {
  if (['overview', 'demo', 'api', 'instructor', 'sources', 'images'].includes(v)) return true
  const m = /^step-(\d+)$/.exec(v)
  return !!m && STEPS.some((s) => s.id === Number(m[1]))
}

function stepIdOf(v: View): number | null {
  const m = /^step-(\d+)$/.exec(v)
  return m ? Number(m[1]) : null
}

function usePrefersReducedMotion() {
  const [r, setR] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const on = () => setR(mq.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return r
}

export default function App() {
  const initial = useMemo(() => loadState(), [])
  const [state, setState] = useState<SavedState>(() => {
    const hash = window.location.hash.replace(/^#/, '')
    return isView(hash) ? { ...initial.state, view: hash } : initial.state
  })
  const [storageOk, setStorageOk] = useState(initial.storageOk)
  const [tocOpen, setTocOpen] = useState(false)
  const firstRender = useRef(true)
  const sysReduce = usePrefersReducedMotion()
  const reduceMotion = sysReduce || state.reduceMotion

  useEffect(() => {
    setStorageOk(saveState(state))
  }, [state])

  const update = useCallback((patch: Partial<SavedState>) => setState((s) => ({ ...s, ...patch })), [])

  const go = useCallback((view: View) => {
    setState((s) => ({ ...s, view }))
    setTocOpen(false)
  }, [])

  // 해시 동기화와 포커스 이동
  useEffect(() => {
    try {
      history.replaceState(null, '', `#${state.view}`)
    } catch {
      /* 무시 */
    }
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    const h = document.querySelector<HTMLElement>('#main h2')
    h?.focus({ preventScroll: true })
  }, [state.view, reduceMotion])

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, '')
      if (isView(h)) setState((s) => (s.view === h ? s : { ...s, view: h }))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // 인쇄 시 인쇄용 영역의 접는 카드를 모두 펼친다 (Ctrl+P 포함)
  useEffect(() => {
    const open = () => document.querySelectorAll<HTMLDetailsElement>('.print-only details').forEach((d) => (d.open = true))
    window.addEventListener('beforeprint', open)
    return () => window.removeEventListener('beforeprint', open)
  }, [])

  const curStepId = stepIdOf(state.view)
  const curStep = curStepId !== null ? STEPS.find((s) => s.id === curStepId)! : null
  const workplaces: Workplace[] = curStep ? curStep.workplaces : ['연수 안내']

  const resetAll = () => {
    if (!window.confirm('이 브라우저에 저장한 체크, 저장소·앱 주소, 메모를 모두 지울까요? 되돌릴 수 없습니다.')) return
    clearState()
    setState(defaultState())
  }

  const print = () => {
    document.querySelectorAll<HTMLDetailsElement>('.print-only details').forEach((d) => (d.open = true))
    window.print()
  }

  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <div className="app-shell screen-only">
        <header className="top">
          <div className="top-inner">
            <div className="title-block">
              <p className="eyebrow">
                <span className="badge badge-guide">교사용 연수 안내</span> 중학교 과학 바이브코딩 연수 · 문서 확인일 {DOC_DATE}
              </p>
              <h1>내가 먹은 간식의 몸속 여행 만들기</h1>
              <p className="question">
                핵심 질문: <strong>내가 먹은 음식은 몸속에서 어떻게 달라질까?</strong>
              </p>
              <p className="sub-title">공공 API·Google AI Studio·GitHub·Cloudflare Pages로 학생용 앱을 만드는 0~14단계 안내</p>
              <Pic id="hero" className="hero-img" decorative />
            </div>
            <div className="status-block">
              <dl className="facts">
                <div>
                  <dt>준비 계정</dt>
                  <dd>{SCOPE.accounts.join(' · ')}</dd>
                </div>
                <div>
                  <dt>권장 시간</dt>
                  <dd>약 {TOTAL_MINUTES}분 (1회 약 4시간 또는 2회 분할)</dd>
                </div>
                <div>
                  <dt>현재 단계</dt>
                  <dd>{curStep ? `${curStep.id}단계 · ${curStep.title}` : EXTRA_VIEWS.find((e) => e.view === state.view)?.label ?? '연수 개요'}</dd>
                </div>
              </dl>
              <div className="top-actions">
                <button type="button" className="btn btn-primary" onClick={() => go(curStep ? state.view : 'step-0')}>
                  {curStep ? `지금 단계: ${curStep.id}단계` : '0단계부터 시작'}
                </button>
                <button type="button" className="btn" onClick={print}>
                  전체 인쇄
                </button>
                <button type="button" className="btn btn-ghost" onClick={resetAll}>
                  저장한 기록 지우기
                </button>
                <label className="toggle">
                  <input type="checkbox" checked={reduceMotion} disabled={sysReduce} onChange={(e) => update({ reduceMotion: e.target.checked })} />
                  <span>움직임 줄이기{sysReduce ? ' (기기 설정으로 켜짐)' : ''}</span>
                </label>
              </div>
              <p className={`storage-status ${storageOk ? '' : 'is-warn'}`} role="status">
                {storageOk ? '보던 단계·체크·주소·메모는 이 브라우저에 자동 저장됩니다.' : '브라우저 저장이 차단되어 있습니다. 이 탭을 닫으면 체크와 메모가 사라집니다.'}
              </p>
            </div>
          </div>
          <div className="where-bar" aria-label="작업 위치">
            <span>
              <strong>지금 보는 곳:</strong> <span className="wp wp-guide">연수 안내</span>
            </span>
            <span>
              <strong>지금 작업할 곳:</strong>{' '}
              {workplaces.map((w) =>
                WORKPLACE_LINKS[w] ? (
                  <a key={w} className="wp wp-svc" href={WORKPLACE_LINKS[w].url} target="_blank" rel="noopener noreferrer">
                    {w} ↗
                  </a>
                ) : (
                  <span key={w} className={`wp ${w === '완성 앱' ? 'wp-app' : 'wp-guide'}`}>
                    {w}
                  </span>
                ),
              )}
            </span>
            <span className="preview-mini">
              <strong>완성 앱 기능:</strong> 음식 찾기 · 나의 접시 · 소화 탐구 · 탐구 기록
            </span>
          </div>
        </header>

        <div className="layout">
          <aside className="toc-col">
            <button type="button" className="btn toc-toggle" aria-expanded={tocOpen} aria-controls="toc" onClick={() => setTocOpen((o) => !o)}>
              {tocOpen ? '목차 닫기' : '목차 열기'}
            </button>
            <nav id="toc" className={`toc ${tocOpen ? 'is-open' : ''}`} aria-label="연수 단계 목차">
              <button type="button" className={`toc-item ${state.view === 'overview' ? 'is-current' : ''}`} aria-current={state.view === 'overview' ? 'page' : undefined} onClick={() => go('overview')}>
                <span className="toc-title">연수 개요·과학 기준</span>
              </button>
              <p className="toc-group">단계별 실습</p>
              <ol>
                {STEPS.map((s) => {
                  const v = `step-${s.id}` as View
                  return (
                    <li key={s.id}>
                      <button type="button" className={`toc-item ${state.view === v ? 'is-current' : ''}`} aria-current={state.view === v ? 'step' : undefined} onClick={() => go(v)}>
                        <span className="toc-no">{s.id}</span>
                        <span className="toc-title">{s.title}</span>
                        <span className="toc-meta">{s.minutes}분</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
              <p className="toc-group">참고</p>
              {EXTRA_VIEWS.map((e) => (
                <button key={e.view} type="button" className={`toc-item ${state.view === e.view ? 'is-current' : ''}`} aria-current={state.view === e.view ? 'page' : undefined} onClick={() => go(e.view)}>
                  <span className="toc-title">{e.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main id="main" className="main-col" tabIndex={-1}>
            {state.view === 'overview' && <OverviewPage onStart={() => go('step-0')} />}
            {state.view === 'api' && <ApiPage />}
            {state.view === 'instructor' && <InstructorPage />}
            {state.view === 'sources' && <SourcesPage />}
            {state.view === 'images' && <ImagesPage />}
            {state.view === 'demo' && (
              <article className="page" aria-labelledby="demo-title">
                <h2 id="demo-title" tabIndex={-1}>
                  미니 체험 (가상 데이터)
                </h2>
                <p>참가자가 만들 학생용 앱의 핵심 동작을 가상 데이터로 미리 봅니다. 연습용 간식 A~E로 기준량·결측값·접시 합계와 대표 소화 모형, 효소 연결을 확인합니다.</p>
                <MiniDemo reduceMotion={reduceMotion} />
              </article>
            )}
            {curStep && (
              <StepView
                key={curStep.id}
                step={curStep}
                state={state}
                update={update}
                reduceMotion={reduceMotion}
                onPrev={curStep.id > 0 ? () => go(`step-${curStep.id - 1}`) : () => go('overview')}
                prevTitle={curStep.id > 0 ? `${curStep.id - 1}단계 ${STEPS[curStep.id - 1].title}` : '연수 개요'}
                onNext={curStep.id < STEPS.length - 1 ? () => go(`step-${curStep.id + 1}`) : () => go('instructor')}
                nextTitle={curStep.id < STEPS.length - 1 ? `${curStep.id + 1}단계 ${STEPS[curStep.id + 1].title}` : '강사 준비·수업 운영'}
              />
            )}
          </main>
        </div>
        <footer className="foot">
          <p>
            이 안내 사이트는 정적 페이지입니다. 인증키를 받거나 식품 API를 호출하지 않습니다. 진행 상황·주소·메모는 이 브라우저에만 저장되며 어디로도 전송되지 않습니다.
          </p>
        </footer>
      </div>

      {/* 전체 인쇄용: 모든 단계·프롬프트·설정표를 펼친 상태 */}
      <div className="print-only" aria-hidden="true">
        <header className="print-head">
          <h1>내가 먹은 간식의 몸속 여행 만들기 — 공공 API·Cloudflare 연수 안내</h1>
          <p>핵심 질문: 내가 먹은 음식은 몸속에서 어떻게 달라질까? · 권장 {TOTAL_MINUTES}분 · 문서 확인일 {DOC_DATE}</p>
          {(state.repoUrl || state.appUrl) && (
            <p>
              {state.repoUrl ? `저장소: ${state.repoUrl}` : ''}
              {state.repoUrl && state.appUrl ? ' · ' : ''}
              {state.appUrl ? `완성 앱: ${state.appUrl}` : ''}
            </p>
          )}
        </header>
        <OverviewPage />
        {STEPS.map((s) => (
          <div className="print-step" key={s.id}>
            <StepView step={s} state={state} update={update} print reduceMotion />
          </div>
        ))}
        <ApiPage />
        <InstructorPage />
        <SourcesPage />
        <ImagesPage print />
      </div>
    </>
  )
}
