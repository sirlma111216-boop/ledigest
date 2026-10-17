import type { Step } from '../content/types'
import { WORKPLACE_LINKS } from '../content/reference'
import type { SavedState } from '../lib/storage'
import { CopyBlock } from './CopyBlock'
import { MiniDemo } from './MiniDemo'
import { AppUrlInput, Architecture, ErrorMemo, FinalFlags, RepoInput, ZipFallback } from './Widgets'

interface Props {
  step: Step
  state: SavedState
  update: (patch: Partial<SavedState>) => void
  print?: boolean
  reduceMotion: boolean
  onPrev?: () => void
  onNext?: () => void
  prevTitle?: string
  nextTitle?: string
}

function Fold({ title, print, children, className = '' }: { title: string; print?: boolean; children: React.ReactNode; className?: string }) {
  if (print)
    return (
      <div className={`fold-card ${className}`}>
        <h4>{title}</h4>
        {children}
      </div>
    )
  return (
    <details className={`fold-card ${className}`}>
      <summary>{title}</summary>
      {children}
    </details>
  )
}

export function StepView({ step, state, update, print, reduceMotion, onPrev, onNext, prevTitle, nextTitle }: Props) {
  const hid = print ? `p-step-${step.id}` : `step-${step.id}-title`

  return (
    <article className="step" aria-labelledby={hid}>
      <header className="step-head">
        <p className="step-kicker">
          {step.id}단계 · 예상 {step.minutes}분
        </p>
        <h2 id={hid} tabIndex={-1}>
          {step.title}
        </h2>
      </header>

      {/* 1) 목표와 예상 시간 */}
      <section className="sec">
        <h3>
          <span className="sec-no">1</span> 목표와 예상 시간
        </h3>
        <p>{step.goal}</p>
        <p className="muted">예상 시간: {step.minutes}분</p>
      </section>

      {/* 2) 현재 작업할 서비스와 공식 링크 */}
      <section className="sec">
        <h3>
          <span className="sec-no">2</span> 지금 작업할 곳과 공식 링크
        </h3>
        <p className="workplaces">
          {step.workplaces.map((w) => (
            <span key={w} className={`wp wp-${w === '연수 안내' ? 'guide' : w === '완성 앱' ? 'app' : 'svc'}`}>
              {w}
            </span>
          ))}
        </p>
        <ul className="links">
          {step.workplaces
            .filter((w) => WORKPLACE_LINKS[w])
            .map((w) => (
              <li key={`wp-${w}`}>
                <a href={WORKPLACE_LINKS[w].url} target="_blank" rel="noopener noreferrer">
                  {w} 열기
                </a>
                <span className="url-print"> ({WORKPLACE_LINKS[w].url})</span>
              </li>
            ))}
          {step.links
            .filter((l) => !step.workplaces.some((w) => WORKPLACE_LINKS[w]?.url === l.url))
            .map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
                <span className="url-print"> ({l.url})</span>
              </li>
            ))}
        </ul>
        {step.workplaces.some((w) => w !== '연수 안내' && w !== '완성 앱') && (
          <p className="help">서비스 메뉴 이름은 바뀔 수 있습니다. 안내에 적힌 목적과 현재 확인된 메뉴를 기준으로 찾고, 다르면 위 공식 도움말 링크를 엽니다.</p>
        )}
      </section>

      {/* 3) 번호형 따라 하기 */}
      <section className="sec">
        <h3>
          <span className="sec-no">3</span> 따라 하기
        </h3>
        <ol className="actions">
          {step.actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </section>

      {step.widgets?.includes('architecture') && <Architecture />}

      {/* 4) 복사할 프롬프트 전문 또는 설정값 */}
      <section className="sec">
        <h3>
          <span className="sec-no">4</span> 복사할 프롬프트·설정값
        </h3>
        {step.copyBlocks.map((b) => (
          <CopyBlock key={b.title} block={b} print={print} />
        ))}
      </section>

      {step.widgets?.includes('mini-demo') &&
        (print ? (
          <section className="sec">
            <h3>미니 체험 (가상 데이터)</h3>
            <p>화면에서 연습용 간식 A~E를 골라 기준량·결측값·접시 계산과 대표 소화 모형을 직접 확인한다. 인쇄본에서는 생략한다.</p>
          </section>
        ) : (
          <section className="sec">
            <h3>미니 체험: 연습용 간식 A로 소화 과정 예상하기</h3>
            <MiniDemo reduceMotion={reduceMotion} />
          </section>
        ))}

      {step.widgets?.includes('zip-fallback') && <ZipFallback print={print} />}
      {step.widgets?.includes('images-link') && (
        <aside className="note note-info images-link">
          <h4>선택: 교사가 제공한 그림 자료 넣기</h4>
          <p>
            연수 운영자가 만든 음식 아이콘·소화계·분자 모형 그림 묶음을 <a href="#images">이미지 자료 페이지</a>에서 내려받아 저장소의 public/images에 올리고, 부록 프롬프트 A로 앱에 적용할 수 있습니다. 그림이 없어도 앱은 기본 아이콘으로 완성됩니다. 이 작업은 선택 사항입니다.
          </p>
        </aside>
      )}

      {/* 5) 화면에서 직접 확인할 결과 */}
      <section className="sec">
        <h3>
          <span className="sec-no">5</span> 화면에서 직접 확인할 결과
        </h3>
        <ul className="expected">
          {step.expected.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </section>

      {/* 6) 완료 체크리스트 */}
      <section className="sec">
        <h3>
          <span className="sec-no">6</span> 완료 체크리스트
        </h3>
        <p className="help">직접 확인한 항목만 체크합니다. 체크는 이 브라우저에만 저장되는 개인 메모이며 어디에도 집계되지 않습니다.</p>
        <ul className="checklist">
          {step.checklist.map((c, i) => {
            const key = `s${step.id}-${i}`
            return (
              <li key={key}>
                <label>
                  <input type="checkbox" checked={!!state.checks[key]} onChange={(e) => update({ checks: { ...state.checks, [key]: e.target.checked } })} />
                  <span>{c}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </section>

      {step.widgets?.includes('repo-input') && !print && <RepoInput state={state} update={update} />}
      {step.widgets?.includes('error-memo') && !print && <ErrorMemo state={state} update={update} />}
      {step.widgets?.includes('app-url-input') && !print && <AppUrlInput state={state} update={update} />}
      {step.widgets?.includes('final-flags') && <FinalFlags state={state} update={update} />}

      {/* 7) 자주 생기는 문제와 복구 프롬프트 */}
      <section className="sec">
        <h3>
          <span className="sec-no">7</span> 자주 생기는 문제와 복구 프롬프트
        </h3>
        <Fold title={`문제 해결표 (${step.troubles.length}가지): 증상 → 확인할 곳 → 수정 → 다시 확인`} print={print}>
          <table className="trouble-table">
            <thead>
              <tr>
                <th scope="col">증상</th>
                <th scope="col">확인할 곳</th>
                <th scope="col">수정</th>
                <th scope="col">다시 확인</th>
              </tr>
            </thead>
            <tbody>
              {step.troubles.map((t, i) => (
                <tr key={i}>
                  <th scope="row" data-label="증상">
                    {t.symptom}
                  </th>
                  <td data-label="확인할 곳">{t.where}</td>
                  <td data-label="수정">{t.fix}</td>
                  <td data-label="다시 확인">{t.recheck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fold>
        {step.recoveryPrompts.length > 0 ? (
          step.recoveryPrompts.map((r) => <CopyBlock key={r.title} block={{ kind: 'prompt', title: r.title, body: r.body }} print={print} copyLabel="복구 프롬프트 복사" />)
        ) : (
          <p className="help">
            이 단계는 계정·서비스 화면에서 하는 작업이라 AI 복구 프롬프트 대신 위 문제 해결표로 확인합니다. 앱 코드를 고쳐야 하면 13단계의 프롬프트 09에 키 없는 오류 메시지를 붙여 사용합니다.
          </p>
        )}
      </section>

      {step.notes?.map((n) =>
        n.tone === 'teacher' ? (
          <Fold key={n.title} title={`교사용 카드: ${n.title}`} print={print} className="note-teacher">
            {n.body.map((b, i) => (
              <p key={i}>{b}</p>
            ))}
          </Fold>
        ) : (
          <aside key={n.title} className={`note note-${n.tone ?? 'info'}`}>
            <h4>{n.title}</h4>
            {n.body.map((b, i) => (
              <p key={i}>{b}</p>
            ))}
          </aside>
        ),
      )}

      {/* 8) 이전·다음 */}
      {!print && (
        <nav className="pager no-print" aria-label="단계 이동">
          {onPrev ? (
            <button type="button" className="btn" onClick={onPrev}>
              ← 이전: {prevTitle}
            </button>
          ) : (
            <span />
          )}
          {onNext ? (
            <button type="button" className="btn btn-primary" onClick={onNext}>
              다음: {nextTitle} →
            </button>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  )
}
