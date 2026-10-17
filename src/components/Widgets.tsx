import { useState } from 'react'
import { FINAL_FLAGS } from '../content/reference'
import { PROMPTS } from '../content/prompts'
import { looksLikeSecret, type SavedState } from '../lib/storage'
import { CopyBlock } from './CopyBlock'

export function Architecture() {
  const nodes = [
    { t: '학생 화면', d: '브라우저 (React 앱)', c: 'n-app' },
    { t: '/api/foods', d: '같은 사이트의 서버 함수', c: 'n-fn' },
    { t: 'Cloudflare Secret', d: 'DATA_GO_KR_SERVICE_KEY 사용', c: 'n-secret' },
    { t: '식품 API', d: '공공데이터포털 FoodNtrCpntDbInfo03', c: 'n-api' },
  ]
  return (
    <figure className="arch" aria-labelledby="arch-cap">
      <ol className="arch-flow">
        {nodes.map((n, i) => (
          <li key={n.t} className={`arch-node ${n.c}`}>
            <strong>{n.t}</strong>
            <span>{n.d}</span>
            {i < nodes.length - 1 && (
              <span className="arch-arrow" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="arch-return">
        ↩ 식품 API의 응답에서 <strong>필요한 영양정보만</strong> 골라 학생 화면으로 돌려준다. 인증키는 학생 화면으로 내려가지 않는다.
      </p>
      <figcaption id="arch-cap">
        학생 화면 → 같은 사이트의 /api/foods → Cloudflare의 비밀 인증키 사용 → 식품 API → 필요한 영양정보만 학생 화면으로 반환
      </figcaption>
      <dl className="role-grid">
        <div>
          <dt>화면</dt>
          <dd>Google AI Studio에서 만든 React + Vite 앱</dd>
        </div>
        <div>
          <dt>코드 저장소</dt>
          <dd>GitHub (snack-body-journey)</dd>
        </div>
        <div>
          <dt>배포 서비스</dt>
          <dd>Cloudflare Pages + Pages Functions (pages.dev 주소)</dd>
        </div>
        <div>
          <dt>데이터 제공 기관</dt>
          <dd>식품의약품안전처 (공공데이터포털을 통해 제공)</dd>
        </div>
      </dl>
    </figure>
  )
}

interface FieldProps {
  state: SavedState
  update: (patch: Partial<SavedState>) => void
}

function UrlField({ id, label, value, onChange, placeholder, hint }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder: string; hint: string }) {
  const bad = value.trim() !== '' && !/^https:\/\/\S+$/.test(value.trim())
  const secret = looksLikeSecret(value)
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="url" inputMode="url" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} aria-describedby={`${id}-hint`} />
      <p id={`${id}-hint`} className="help">
        {hint}
      </p>
      {bad && <p className="warn-text">https:// 로 시작하는 주소만 적어 두세요.</p>}
      {secret && <p className="error-text">인증키처럼 보이는 문자열이 있습니다. 주소만 남기고 키는 지우세요.</p>}
      {value.trim() && !bad && !secret && (
        <p className="help">
          <a href={value.trim()} target="_blank" rel="noopener noreferrer">
            새 탭에서 열기
          </a>
        </p>
      )}
    </div>
  )
}

export function RepoInput({ state, update }: FieldProps) {
  return (
    <div className="my-inputs no-print-inputs">
      <h4>내 기록 (이 브라우저에만 저장)</h4>
      <UrlField
        id="repo-url"
        label="내 GitHub 저장소 주소"
        value={state.repoUrl}
        onChange={(v) => update({ repoUrl: v })}
        placeholder="https://github.com/내아이디/snack-body-journey"
        hint="주소만 적습니다. 인증키·비밀번호는 적지 않습니다."
      />
    </div>
  )
}

export function AppUrlInput({ state, update }: FieldProps) {
  return (
    <div className="my-inputs">
      <h4>내 기록 (이 브라우저에만 저장)</h4>
      <UrlField
        id="app-url"
        label="내 완성 앱 주소"
        value={state.appUrl}
        onChange={(v) => update({ appUrl: v })}
        placeholder="https://프로젝트이름.pages.dev"
        hint="Cloudflare 관리 화면 주소가 아니라 학생이 여는 pages.dev 공개 주소를 적습니다."
      />
      {state.appUrl.trim() && /^https:\/\/\S+$/.test(state.appUrl.trim()) && (
        <p className="help">
          상태 확인 주소:{' '}
          <a href={`${state.appUrl.trim().replace(/\/+$/, '')}/api/health`} target="_blank" rel="noopener noreferrer">
            {state.appUrl.trim().replace(/\/+$/, '')}/api/health
          </a>{' '}
          (직접 열어 확인합니다. 이 안내 사이트는 자동으로 호출하지 않습니다.)
        </p>
      )}
    </div>
  )
}

export function FinalFlags({ state, update }: FieldProps) {
  return (
    <div className="final-flags">
      <h4>최종 확인 세 가지 (직접 확인한 것만 체크)</h4>
      <ul className="checklist">
        {FINAL_FLAGS.map((f) => (
          <li key={f.id}>
            <label>
              <input type="checkbox" checked={!!state.finalFlags[f.id]} onChange={(e) => update({ finalFlags: { ...state.finalFlags, [f.id]: e.target.checked } })} />
              <span>
                <strong>{f.label}</strong> — {f.desc}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className="help">세 가지를 각자 직접 확인합니다. 가상 자료 화면만 보고 「실제 공공 API 조회 확인」을 체크하지 않습니다.</p>
    </div>
  )
}

export function ErrorMemo({ state, update }: FieldProps) {
  const m = state.errorMemo
  const set = (k: keyof SavedState['errorMemo'], v: string) => update({ errorMemo: { ...m, [k]: v } })
  const secret = looksLikeSecret(`${m.where} ${m.symptom} ${m.message}`)
  const extra = `현재 작업 위치: ${m.where || '(적지 않음)'}\n증상: ${m.symptom || '(적지 않음)'}\n키 없는 오류 메시지:\n${m.message || '(적지 않음)'}`
  return (
    <div className="my-inputs">
      <h4>프롬프트 09 뒤에 붙일 개인 메모 (이 브라우저에만 저장, 자동 전송 없음)</h4>
      <div className="field">
        <label htmlFor="em-where">현재 작업 위치</label>
        <select id="em-where" value={m.where} onChange={(e) => set('where', e.target.value)}>
          <option value="">선택하세요</option>
          <option value="AI Studio 미리보기">AI Studio 미리보기</option>
          <option value="Cloudflare 배포 주소(pages.dev)">Cloudflare 배포 주소(pages.dev)</option>
          <option value="Cloudflare 빌드 로그">Cloudflare 빌드 로그</option>
          <option value="GitHub 저장소">GitHub 저장소</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="em-symptom">증상</label>
        <input id="em-symptom" value={m.symptom} onChange={(e) => set('symptom', e.target.value)} placeholder="예: 공공데이터 모드에서 검색하면 ‘조회 실패’가 뜬다" />
      </div>
      <div className="field">
        <label htmlFor="em-message">키 없는 오류 메시지</label>
        <textarea id="em-message" rows={4} value={m.message} onChange={(e) => set('message', e.target.value)} placeholder="예: {ok:false,error:{code:'KEY_NOT_CONFIGURED', ...}} — 인증키·전체 요청 URL은 지우고 붙입니다" />
      </div>
      {secret && <p className="error-text">인증키나 serviceKey가 포함된 것처럼 보입니다. 붙이기 전에 그 부분을 지우세요.</p>}
      <CopyBlock block={{ kind: 'prompt', title: `${PROMPTS.p09.title} + 내 메모`, body: PROMPTS.p09.body }} extra={extra} copyLabel="프롬프트 09 + 메모 함께 복사" />
    </div>
  )
}

export function ZipFallback({ print }: { print?: boolean }) {
  const [open, setOpen] = useState(false)
  const body = (
    <>
      <ol className="actions">
        <li>AI Studio에서 코드 ZIP을 다운로드한다.</li>
        <li>압축을 푼다.</li>
        <li>GitHub에서 새 저장소(snack-body-journey)를 만든다.</li>
        <li>Add file → Upload files를 누른다.</li>
        <li>압축을 푼 원본 파일과 폴더를 업로드한다. ZIP 파일 하나를 올리지 않는다.</li>
        <li>Commit changes를 누른다.</li>
      </ol>
      <ul>
        <li>package.json이 한 겹 더 안쪽에 들어갔으면 Cloudflare의 Root directory를 그 폴더로 맞춘다.</li>
        <li>숨김 파일(.gitignore)과 functions 폴더가 빠지지 않았는지 확인한다.</li>
        <li>
          브라우저 업로드 제한에 걸리면 GitHub Desktop으로 저장소를 복제하고 원본을 복사한 뒤 Commit/Push한다. (
          <a href="https://desktop.github.com/" target="_blank" rel="noopener noreferrer">
            GitHub Desktop
          </a>
          )
        </li>
      </ul>
    </>
  )
  if (print)
    return (
      <div className="fold-card">
        <h4>대체 경로: GitHub 연결 기능을 쓸 수 없는 경우 (ZIP 업로드)</h4>
        {body}
      </div>
    )
  return (
    <details className="fold-card" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary>대체 경로: GitHub 연결 기능을 쓸 수 없는 경우 (ZIP 업로드)</summary>
      {body}
    </details>
  )
}
