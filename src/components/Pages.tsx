import { API_SPEC, APP_FEATURES, CURRICULUM, DEMO_META, DOC_DATE, EXTENSIONS, HAND_CHECKS, INSTRUCTOR, OFFICIAL_LINKS, SCIENCE_RULES, SCOPE } from '../content/reference'
import { STEPS, TOTAL_MINUTES } from '../content/steps'
import { CopyBlock } from './CopyBlock'

const CIRCLED = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫']

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
      <span className="url-print"> ({href})</span>
    </>
  )
}

export function OverviewPage({ onStart }: { onStart?: () => void }) {
  const s1 = STEPS.filter((s) => s.id <= 6)
  const s2 = STEPS.filter((s) => s.id >= 7)
  const sum = (a: typeof STEPS) => a.reduce((x, s) => x + s.minutes, 0)
  return (
    <article className="page" aria-labelledby="ov-title">
      <h2 id="ov-title" tabIndex={-1}>
        연수 개요
      </h2>

      <section className="sec">
        <h3>두 프로젝트를 구분합니다</h3>
        <div className="two-projects">
          <div className="proj proj-guide">
            <span className="badge badge-guide">지금 보는 곳</span>
            <h4>연수 안내 웹페이지</h4>
            <p>{SCOPE.guideProduct}</p>
            <p className="help">정적 사이트입니다. 인증키를 받지 않고 식품 API를 직접 호출하지 않습니다. 미니 체험은 가상 데이터만 씁니다.</p>
          </div>
          <div className="proj proj-app">
            <span className="badge badge-app">참가자가 만들 것</span>
            <h4>간식의 몸속 여행 (학생용 앱)</h4>
            <p>{SCOPE.participantProduct}</p>
            <p className="help">React + Vite + TypeScript 앱을 Cloudflare Pages에 배포하고 같은 프로젝트의 Pages Functions가 공공 API를 호출합니다.</p>
          </div>
        </div>
      </section>

      <section className="sec">
        <h3>완성 앱의 기능 미리보기</h3>
        <div className="feature-grid">
          <div className="feature">
            <h4>음식 찾기</h4>
            <p>‘연습 데이터’와 ‘공공데이터 검색’ 모드를 구분합니다. 검색 버튼 또는 Enter로 /api/foods에 요청하고 10개씩 봅니다.</p>
          </div>
          <div className="feature">
            <h4>나의 접시</h4>
            <p>기준량과 같은 단위로 선택량을 넣어 최대 5개를 담습니다. 결측은 0이 아니라 ‘정보 없음’과 누락 건수로 보입니다.</p>
          </div>
          <div className="feature">
            <h4>소화 탐구</h4>
            <p>입 → 식도 → 위 → 소장 → 대장 경로와 간·이자·쓸개를 구분한 모식도에서 녹말·단백질·지방 대표 모형을 봅니다.</p>
          </div>
          <div className="feature">
            <h4>탐구 기록</h4>
            <p>처음 예상과 고친 설명을 기록합니다. 이 브라우저에만 저장되고 A4 활동지로 인쇄합니다.</p>
          </div>
        </div>
      </section>

      <section className="sec">
        <h3>참가자 앱 제작 흐름</h3>
        <ol className="flow-chips">
          {SCOPE.flow.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ol>
      </section>

      <section className="sec">
        <h3>기술 기본값</h3>
        <ul>
          {SCOPE.defaults.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <p className="help">
          왜 필요한가: 화면은 정적 파일로 빠르게 배포하고, 인증키가 필요한 요청만 같은 사이트의 서버 함수가 대신 처리하면 키가 학생 브라우저에 노출되지 않습니다. 무료 한도는{' '}
          <Ext href={OFFICIAL_LINKS.cfPricing.url}>Cloudflare Functions 사용량 문서</Ext>에서 확인합니다.
        </p>
      </section>

      <section className="sec">
        <h3>권장 운영 시간</h3>
        <p>{SCOPE.time}</p>
        <table className="schedule">
          <caption>단계별 시간 (합계 {TOTAL_MINUTES}분, 계정 준비·휴식 제외)</caption>
          <thead>
            <tr>
              <th scope="col">단계</th>
              <th scope="col">내용</th>
              <th scope="col">작업할 곳</th>
              <th scope="col">시간</th>
            </tr>
          </thead>
          <tbody>
            {STEPS.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.title}</td>
                <td>{s.workplaces.join('·')}</td>
                <td>{s.minutes}분</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="split-plan">
          <div>
            <h4>2회 분할 시 1회차 (0~6단계, {sum(s1)}분)</h4>
            <p>공공 API 신청과 명세 읽기, AI Studio에서 화면·정규화·접시·소화 모형·기록까지 연습 데이터로 완성합니다.</p>
          </div>
          <div>
            <h4>2회 분할 시 2회차 (7~14단계, {sum(s2)}분)</h4>
            <p>서버 함수, 실제 검색 연결, GitHub 저장, Cloudflare 배포, 인증키 등록, 실제 검증, 재배포를 진행합니다.</p>
          </div>
        </div>
        <p className="help">사전 과제: 네 가지 계정 준비와 공공데이터포털 활용신청(1단계)을 연수 전에 해 두면 시간이 여유롭습니다.</p>
      </section>

      <section className="sec">
        <h3>교육과정과 학습 목표</h3>
        <p className="standard">{CURRICULUM.mainStandard}</p>
        <p>{CURRICULUM.enzymes}</p>
        <h4>학생용 앱의 학습 흐름</h4>
        <ol className="flow-chips">
          {CURRICULUM.flow.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ol>
        <p>
          <strong>학습 목표</strong>: {CURRICULUM.objective}
        </p>
        <table className="levels">
          <thead>
            <tr>
              <th scope="col">구분</th>
              <th scope="col">학생이 하는 일</th>
            </tr>
          </thead>
          <tbody>
            {CURRICULUM.levels.map((l) => (
              <tr key={l.name}>
                <th scope="row">{l.name}</th>
                <td>{l.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="help">{CURRICULUM.levelsCaveat}</p>
        <p>{CURRICULUM.extension}</p>
        <details className="fold-card note-teacher">
          <summary>교사용 카드: 소화와 세포호흡의 구분</summary>
          <p>소화는 음식 속 큰 분자를 흡수할 수 있는 작은 물질로 분해하는 과정이다. 흡수된 포도당 등은 순환계를 통해 세포로 전달되고, 세포는 호흡으로 들어온 산소를 이용한 세포호흡으로 에너지를 얻는다.</p>
          <p>따라서 위에서 음식이 곧바로 에너지로 바뀌는 것이 아니다. 기본판의 앱은 소장 흡수까지만 다루고, 세포호흡은 [9과13-05] 확장 활동에서 연결한다.</p>
        </details>
        <p>
          <Ext href={OFFICIAL_LINKS.curriculum.url}>{OFFICIAL_LINKS.curriculum.label}</Ext> · <Ext href={OFFICIAL_LINKS.niddk.url}>{OFFICIAL_LINKS.niddk.label}</Ext>
        </p>
      </section>

      <section className="sec">
        <h3>반드시 지킬 과학 내용 12가지</h3>
        <ol className="rules">
          {SCIENCE_RULES.map((r, i) => (
            <li key={i}>
              <span className="rule-no">{CIRCLED[i]}</span> {r}
            </li>
          ))}
        </ol>
        <p className="note note-warn">{CURRICULUM.noHealthScoring}</p>
      </section>

      <section className="sec">
        <h3>참가자 앱의 기본 기능 명세</h3>
        <p>{APP_FEATURES.modes}</p>
        <details className="fold-card" open>
          <summary>음식 검색</summary>
          <ul>
            {APP_FEATURES.search.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </details>
        <details className="fold-card">
          <summary>음식 카드와 접시</summary>
          <ul>
            {APP_FEATURES.plate.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </details>
        <details className="fold-card">
          <summary>소화 탐구</summary>
          <ul>
            {APP_FEATURES.digestion.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </details>
        <details className="fold-card">
          <summary>기록</summary>
          <ul>
            {APP_FEATURES.record.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </details>
      </section>

      <DemoDataSection />

      {onStart && (
        <div className="pager no-print">
          <span />
          <button type="button" className="btn btn-primary" onClick={onStart}>
            0단계부터 시작하기 →
          </button>
        </div>
      )}
    </article>
  )
}

function DemoDataSection() {
  const body = `가상 원자료 A: FOOD_CD=DEMO-A, FOOD_NM_KR=연습용 간식 A, SERVING_SIZE=100g, AMT_NUM1=158, AMT_NUM3=5, AMT_NUM4=2, AMT_NUM6=30, AMT_NUM7=4.
가상 원자료 B: FOOD_CD=DEMO-B, FOOD_NM_KR=연습용 간식 B, SERVING_SIZE=100g, AMT_NUM1=155, AMT_NUM3=12, AMT_NUM4=7, AMT_NUM6=11, AMT_NUM7=3.
가상 원자료 C: FOOD_CD=DEMO-C, FOOD_NM_KR=연습용 음료 C, SERVING_SIZE=100mL, AMT_NUM1=52, AMT_NUM3=3, AMT_NUM4=2, AMT_NUM6=5.5, AMT_NUM7=5.
가상 원자료 D: FOOD_CD=DEMO-D, FOOD_NM_KR=연습용 결측 자료 D, SERVING_SIZE=100g, AMT_NUM1='', AMT_NUM3='', AMT_NUM4='0', AMT_NUM6='-', AMT_NUM7=null.
가상 원자료 E: FOOD_CD=DEMO-E, FOOD_NM_KR=연습용 기준량 미상 E, SERVING_SIZE='기준량 확인 필요', AMT_NUM3=2, AMT_NUM4=1, AMT_NUM6=10, AMT_NUM7=2.
모든 예시의 업체명은 ‘연수용 가상 자료’, 출처는 ‘기능 검증용 직접 구성’으로 표시한다. 날짜를 공공기관 검증 날짜로 꾸미지 않는다.`
  return (
    <section className="sec">
      <h3>개발용 예시 데이터와 확인값</h3>
      <p>{DEMO_META.caveat} 모든 이름 앞에 ‘연습용’을 붙이고, 공급처 배지를 ‘수업용 가상 데이터’로 표시한다.</p>
      <CopyBlock block={{ kind: 'settings', title: '가상 원자료 A~E', body }} />
      <h4>손으로 확인할 값</h4>
      <ul>
        {HAND_CHECKS.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </section>
  )
}

export function ApiPage() {
  return (
    <article className="page" aria-labelledby="api-title">
      <h2 id="api-title" tabIndex={-1}>
        API 연결에 사용할 확인된 명세
      </h2>
      <p className="help">
        문서 확인일 {DOC_DATE}. 이 날짜는 공개 Swagger 화면을 확인한 날이며, 인증키로 실제 호출을 확인한 날이 아닙니다. 실제 호출은 12단계에서 각자 확인합니다.
      </p>
      <section className="sec">
        <h3>서비스</h3>
        <table className="settings-table">
          <tbody>
            <tr>
              <th scope="row">서비스명</th>
              <td>{API_SPEC.serviceName}</td>
            </tr>
            <tr>
              <th scope="row">서비스 상세</th>
              <td>
                <Ext href={API_SPEC.detailUrl}>{API_SPEC.detailUrl}</Ext>
              </td>
            </tr>
            <tr>
              <th scope="row">요청 주소(HTTPS)</th>
              <td>
                <code>{API_SPEC.endpoint}</code>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="note note-warn">{API_SPEC.endpointNote}</p>
      </section>

      <section className="sec">
        <h3>주요 요청변수</h3>
        <table className="settings-table">
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">의미</th>
            </tr>
          </thead>
          <tbody>
            {API_SPEC.params.map((p) => (
              <tr key={p.key}>
                <th scope="row">
                  <code>{p.key}</code>
                </th>
                <td>{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <CopyBlock block={{ kind: 'text', title: '학습용 요청 형태 (키 제외)', body: API_SPEC.exampleRequest }} />
        <p className="note note-warn">{API_SPEC.exampleNote}</p>
      </section>

      <section className="sec">
        <h3>주요 응답 필드와 의미 (공식 Model 화면 기준)</h3>
        <table className="settings-table">
          <thead>
            <tr>
              <th scope="col">필드</th>
              <th scope="col">의미</th>
            </tr>
          </thead>
          <tbody>
            {API_SPEC.fields.map((f) => (
              <tr key={f.key}>
                <th scope="row">
                  <code>{f.key}</code>
                </th>
                <td>{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>{API_SPEC.responseNote}</p>
      </section>

      <section className="sec">
        <h3>정규화 정책</h3>
        <p className="help">왜 필요한가: 공공 자료에는 빈칸·‘-’·서로 다른 기준량이 섞여 있습니다. 이를 0이나 100g으로 단정하면 학생이 틀린 숫자로 과학 설명을 하게 됩니다.</p>
        <ul>
          {API_SPEC.normalization.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      <details className="fold-card note-teacher">
        <summary>교사용 카드: 서버 함수 응답 계약 상세</summary>
        <pre className="copy-body print-full">{`GET /api/foods?q=검색어&page=1
  q: 공백 정리 후 1~50자 / page: 정수 1~100 / numOfRows: 서버에서 10 고정
  GET 외 → 405 / 잘못된 입력 → 400 (JSON)
  키 없음 → 503 {ok:false,error:{code:'KEY_NOT_CONFIGURED',message}}

성공: {ok:true, mode:'public', items:[정규화 음식], page, pageSize:10,
       totalCount(확인 불가 시 null), hasNext, fetchedAt}
오류: {ok:false, error:{code, message}}
  예: KEY_NOT_CONFIGURED, UPSTREAM_AUTH, UPSTREAM_TIMEOUT, UPSTREAM_QUOTA,
      UPSTREAM_SCHEMA_ERROR, BAD_REQUEST, METHOD_NOT_ALLOWED

items 정규화: 배열 / items.item 배열 / items.item 단일 객체 / FOOD_CD가 있는 단일 items 객체
  → 배열로. 정상 0건은 빈 배열. 그 밖의 구조는 UPSTREAM_SCHEMA_ERROR.

GET /api/health → {ok:true, service:'food-api', configured:키존재여부, version:'1'} (no-store)
  configured:true는 설정 유무만 뜻한다. 키의 유효성·권한은 실제 검색으로 확인한다.

캐시: 정상 응답만 검색어·페이지·매핑 버전별 10분 (Cloudflare Cache API).
  캐시 키에 인증키를 넣지 않는다. 오류는 캐시하지 않는다.`}</pre>
      </details>
    </article>
  )
}

export function InstructorPage() {
  return (
    <article className="page" aria-labelledby="ins-title">
      <h2 id="ins-title" tabIndex={-1}>
        강사 준비와 수업 운영
      </h2>
      <section className="sec">
        <h3>연수 전</h3>
        <ul className="checklist-static">
          {INSTRUCTOR.before.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="help">문서 확인과 실제 호출 성공은 따로 기록합니다. 이 안내 사이트는 강사나 참가자의 공공 API를 자동으로 호출하지 않습니다.</p>
      </section>
      <section className="sec">
        <h3>완성 앱으로 하는 수업 예시 (40분 + 후속 활동)</h3>
        <table className="settings-table">
          <tbody>
            {INSTRUCTOR.lesson.map((l) => (
              <tr key={l.phase}>
                <th scope="row">{l.phase}</th>
                <td>{l.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="help">{INSTRUCTOR.lessonNote}</p>
      </section>
      <section className="sec">
        <h3>평가 관찰 예시</h3>
        <ul>
          {INSTRUCTOR.observe.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <p className="note note-warn">{INSTRUCTOR.observeNote}</p>
      </section>
    </article>
  )
}

export function SourcesPage() {
  return (
    <article className="page" aria-labelledby="src-title">
      <h2 id="src-title" tabIndex={-1}>
        선택 확장과 공식 자료
      </h2>
      <section className="sec">
        <h3>선택 확장 (기본 과정에 포함되지 않음)</h3>
        {EXTENSIONS.map((e) => (
          <div key={e.title} className="ext-card">
            <h4>{e.title}</h4>
            <p>{e.body}</p>
            {e.link && (
              <p>
                <Ext href={e.link.url}>{e.link.label}</Ext>
              </p>
            )}
          </div>
        ))}
        <p className="help">선택 확장과 개인 맞춤 문구 수정의 완성도를 학업 성취도로 평가하지 않습니다.</p>
      </section>
      <section className="sec">
        <h3>공식 자료와 출처</h3>
        <ul className="links">
          {Object.values(OFFICIAL_LINKS)
            .filter((l) => !['aiStudio', 'github', 'cfDash'].some((k) => OFFICIAL_LINKS[k] === l))
            .map((l) => (
              <li key={l.url}>
                <Ext href={l.url}>{l.label}</Ext>
              </li>
            ))}
        </ul>
        <p className="help">
          작성 기준일은 {DOC_DATE}입니다. 문서 확인일과 실제 API 호출 확인일을 구분합니다. 이 안내 사이트를 만들 때 개인 인증키로 실제 식품 API를 호출하거나 참가자 앱을 배포하지는 않았습니다. 실제로 수행하지 않은 연결·배포를 검증 완료로 표시하지 않습니다.
        </p>
        <p className="help">
          단계별 진행 방식 참고 주소: <Ext href="https://highmap.labbitory.com/">highmap.labbitory.com</Ext>. 이 사이트는 본 명세를 기준으로 제작했으며 참고 사이트의 화면을 모방했다고 주장하지 않습니다.
        </p>
      </section>
    </article>
  )
}
