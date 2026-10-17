import type { LinkRef } from './types'

export const DOC_DATE = '2026-10-16'

export const OFFICIAL_LINKS: Record<string, LinkRef> = {
  curriculum: {
    label: '2022 개정 과학과 교육과정(교육부 고시)',
    url: 'https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=141&boardSeq=93458&lev=0&search=',
  },
  niddk: {
    label: 'NIDDK — 소화계의 구조와 기능',
    url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works',
  },
  dataGoKr: {
    label: '공공데이터포털 — 식품의약품안전처_식품영양성분DB정보 (신청·Swagger 명세)',
    url: 'https://www.data.go.kr/data/15127578/openapi.do',
  },
  mfds: {
    label: '식약처 식품영양성분 DB 안내',
    url: 'https://various.foodsafetykorea.go.kr/nutrient/industry/openApi/info.do',
  },
  aiStudioBuild: {
    label: 'Google AI Studio Build 모드와 GitHub 연결',
    url: 'https://ai.google.dev/gemini-api/docs/aistudio-build-mode',
  },
  aiStudio: { label: 'Google AI Studio 열기', url: 'https://aistudio.google.com/' },
  github: { label: 'GitHub', url: 'https://github.com/' },
  cfDash: { label: 'Cloudflare 대시보드', url: 'https://dash.cloudflare.com/' },
  cfGit: {
    label: 'Cloudflare Pages — Git 연결',
    url: 'https://developers.cloudflare.com/pages/get-started/git-integration/',
  },
  cfBuild: {
    label: 'Cloudflare Pages — 빌드 설정',
    url: 'https://developers.cloudflare.com/pages/configuration/build-configuration/',
  },
  cfFunctions: {
    label: 'Cloudflare Functions — 시작·배포 방법',
    url: 'https://developers.cloudflare.com/pages/functions/get-started/',
  },
  cfRouting: {
    label: 'Cloudflare Functions — 경로(라우팅)',
    url: 'https://developers.cloudflare.com/pages/functions/routing/',
  },
  cfSecrets: {
    label: 'Cloudflare Functions — Secret 설정',
    url: 'https://developers.cloudflare.com/pages/functions/bindings/#secrets',
  },
  cfLocal: {
    label: 'Cloudflare Functions — 로컬 실행',
    url: 'https://developers.cloudflare.com/pages/functions/local-development/',
  },
  cfPricing: {
    label: 'Cloudflare Functions — 무료·유료 사용량',
    url: 'https://developers.cloudflare.com/pages/functions/pricing/',
  },
}

export const WORKPLACE_LINKS: Record<string, LinkRef> = {
  'AI Studio': OFFICIAL_LINKS.aiStudio,
  공공데이터포털: OFFICIAL_LINKS.dataGoKr,
  GitHub: OFFICIAL_LINKS.github,
  Cloudflare: OFFICIAL_LINKS.cfDash,
}

/** 2. 교육과정과 과학 내용의 기준 */
export const CURRICULUM = {
  mainStandard:
    '[9과13-01] 소화계의 구조와 기능을 이해하고, 소화 과정을 소화 효소의 작용과 관련지어 추론할 수 있다.',
  enzymes: '성취기준 해설에서 다루는 대표 효소인 아밀레이스, 펩신, 트립신, 라이페이스 등을 중심으로 간단하게 설명한다. 관련 탐구인 영양소 검출·침의 소화 작용은 실제 수업의 후속 활동으로 제안한다.',
  flow: ['음식 고르기', '영양소 자료 읽기', '소화 기관·효소 예상하기', '대표 소화 모형 확인하기', '자신의 설명 수정하기'],
  objective: '선택한 음식의 영양소 자료를 근거로 소화 기관과 효소의 작용을 설명한다. 영양성분 표만 조회하고 끝내지 않는다.',
  levels: [
    { name: '기초', desc: '자료의 기준량과 탄수화물·단백질·지방 값을 읽는다.' },
    { name: '설명', desc: '대표 영양소와 소화 기관·효소를 연결한다.' },
    { name: '적용', desc: '음식이 달라졌을 때 탐구할 영양소 구성이 어떻게 달라지는지 설명한다.' },
  ],
  levelsCaveat:
    '이 구분은 자체 수업 설계 예시이며 공식 A~E 성취수준이 아니다. 활동 완료율이나 선택형 문항 점수를 A~E로 자동 변환하지 않는다.',
  extension:
    '확장 성취기준은 [9과13-05]의 기관계 통합과 에너지 획득이다. 기본판이 이 전체 성취기준까지 달성한다고 주장하지 않는다. 소화와 세포호흡을 구분하는 짧은 교사용 해설 정도로 연결한다.',
  noHealthScoring:
    '학생의 체중·BMI·감량 목표를 받지 않는다. 음식에 ‘나쁜 음식’ 점수나 개인별 건강 처방을 붙이지 않는다. 이 앱은 영양소와 소화 원리를 배우는 과학 수업 도구다.',
}

/** 반드시 지킬 과학 내용 ①~⑫ */
export const SCIENCE_RULES: string[] = [
  'API는 음식의 영양성분 자료를 제공한다. 효소 종류·소화 속도·개인별 흡수율·식후 에너지 생성량을 제공하지 않는다.',
  '영양소의 질량을 그 음식의 소화 시간이나 기관별 소화 비율로 환산하지 않는다. 애니메이션의 진행 시간은 학습 순서를 뜻한다.',
  '‘탄수화물 전체=녹말’이 아니다. 당류는 탄수화물에 포함된다. 탄수화물과 당류를 더해 탄수화물 총량을 만들지 않는다.',
  '탄수화물−당류를 녹말량으로 표시하지 않는다. 식이섬유 등 다른 성분과 분석 정의의 차이가 있으므로 API 값만으로 녹말량을 확정할 수 없다.',
  '탄수화물 카드에는 ‘소화 원리를 배우는 녹말 대표 모형’ 진입 버튼을 둔다. 선택한 음식의 실제 탄수화물이 전부 녹말이라는 뜻이 아님을 바로 옆에 표시한다. 이미 작은 분자인 포도당과 녹말을 비교하는 별도 학습 카드를 제공한다.',
  '단백질은 위의 펩신, 소장에서 작용하는 트립신 등 여러 효소의 작용을 거쳐 최종적으로 아미노산으로 소화된다고 설명한다. 펩신 하나가 곧바로 모든 단백질을 아미노산으로 만든다고 표시하지 않는다.',
  '녹말의 소화는 입과 소장에서 관련 효소가 작용하는 대표 과정을 다룬다. 아밀레이스 하나가 입에서 모든 녹말을 곧바로 포도당으로 완전히 바꾼다고 표시하지 않는다.',
  '지방은 소장에서 쓸개의 담즙이 유화를 돕고 라이페이스가 분해에 관여하는 대표 과정을 보여 준다. 담즙은 효소가 아니다. 담즙의 생성은 간, 저장·농축은 쓸개이며 소장으로 분비된다는 점을 구분한다. 이자에서 만들어진 효소가 소장에서 작용할 수 있음을 표시한다.',
  '지방 분해 산물은 ‘지방산과 모노글리세리드 등’으로 표시하고 교과서의 단순화 표현은 교사용 참고에서 다룬다. 기본 화면은 소장 흡수까지로 제한한다. 확장에서 이동 경로를 그리면 대부분의 장쇄 지방 유래 성분이 림프를 거쳐 혈액으로 이동하는 점을 고려해 ‘모든 영양소가 곧바로 모세혈관으로 간다’고 그리지 않는다.',
  '소장에서는 대부분의 영양소 흡수가 일어나며 대장에서는 남은 내용물의 수분 흡수 등이 일어난다고 설명한다. 수분 흡수가 대장에서만 일어난다고 하지 않는다. 음식이 간·이자·쓸개 속을 통과하는 경로를 그리지 않는다.',
  '소화는 흡수 가능한 작은 물질로 분해하는 과정이고 세포가 에너지를 얻는 과정은 세포호흡과 연결된다. 위에서 음식이 곧바로 에너지로 바뀐다는 연출을 하지 않는다.',
  '식품 정보는 동일 이름이어도 제조사·조리 상태·제품이 다를 수 있다. 검색 첫 결과를 학생이 실제 먹은 음식과 동일하다고 단정하지 않는다.',
]

/** 4. 참가자 앱의 기본 기능 */
export const APP_FEATURES = {
  modes:
    '첫 화면은 ‘연습 데이터’와 ‘공공데이터 검색’ 두 모드를 구분한다. 초기 개발은 연습 모드이며 모드 표시를 항상 보이게 한다. 사용자가 직접 공공데이터 모드를 선택한 뒤 실패했다고 몰래 연습 데이터로 바꾸지 않는다.',
  search: [
    '검색어를 입력하고 검색 버튼 또는 Enter로 조회한다. 매 글자마다 API를 호출하지 않는다.',
    '실제 검색은 앱의 /api/foods?q=검색어&page=1 주소로 요청한다.',
    '결과는 식품명·업체 또는 자료 구분·기준량·출처·자료 날짜를 보여 준다. 값이 없으면 ‘정보 없음’으로 표시한다.',
    '한 번에 10개, 다음 페이지 버튼을 둔다. 검색어가 바뀌면 첫 페이지로 돌아간다.',
    '초기·로딩·성공·0건·연결 실패를 별도 상태로 만든다. 0건은 오류가 아니다.',
    '직전 검색의 늦은 응답이 새 검색 결과를 덮지 않도록 취소 또는 요청 ID를 사용한다.',
  ],
  plate: [
    '탄수화물·단백질·지방을 g 단위로 표시한다. 당류는 탄수화물의 하위 정보로 별도 설명한다.',
    '기준량을 카드마다 표시한다. 영양성분 기준량과 1회 섭취참고량, 제품 전체 중량을 혼동하지 않는다.',
    '사용자가 명확한 기준량과 동일한 단위로 선택량을 입력하면 해당 양의 영양소를 계산한다.',
    '기준량을 읽을 수 없으면 원자료 표시는 유지하고 선택량 환산만 비활성화한다.',
    '접시에는 최대 5개 항목을 담고 선택량 수정·개별 삭제·전체 비우기를 제공한다.',
    '‘한 개’, ‘한 봉지’의 중량을 AI가 추정하지 않는다. 기본은 g 또는 mL 입력이며 원자료와 단위가 맞을 때만 계산한다.',
    '결과는 ‘선택한 양 기준’이며 실제 섭취량 측정이나 개인별 흡수량이 아니다.',
  ],
  digestion: [
    '선택한 음식과 영양소 자료를 왼쪽, 소화계 모식도를 오른쪽에 배치한다.',
    '입 → 식도 → 위 → 소장 → 대장의 통과 경로를 제공한다. 간·이자·쓸개는 소화를 돕는 별도 기관으로 그린다.',
    '영양소별 대표 모형, 기관 선택, 효소 연결, 단계 재생·정지·다음·처음으로 기능을 둔다.',
    '작은 화면과 움직임 줄이기 상태에서는 정적인 단계 카드로 같은 내용을 볼 수 있어야 한다.',
    '대표 모형의 입자 수나 애니메이션 속도를 API 영양소 g 수치와 일대일 대응시키지 않는다.',
  ],
  record: [
    '선택한 음식, 확인한 기준량·영양소, 처음 예상, 소화 경로 설명, 생각을 고친 이유를 기록한다.',
    '정답이 명확한 선택형 문항은 즉시 피드백하되 자유 서술은 자동 채점하지 않는다.',
    '기록은 해당 브라우저에만 저장한다. 교사에게 자동 전송된다고 안내하지 않는다.',
    '화면 새로고침 복원, 기록 삭제, A4 활동지 인쇄를 제공한다. 이름·학번은 필수가 아니다.',
  ],
}

/** 5. API 연결에 사용할 확인된 명세 */
export const API_SPEC = {
  detailUrl: 'https://www.data.go.kr/data/15127578/openapi.do',
  serviceName: '식품의약품안전처_식품영양성분DB정보',
  endpoint: 'https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo03/getFoodNtrCpntDbInq03',
  endpointNote:
    '2026-10-16 공개 Swagger 화면에서 확인한 HTTPS 요청 주소. 이전 블로그의 Info01·Info02 주소나 식품안전나라의 I0750·I2791 서비스 주소를 섞지 않는다. API 제공 기관이 같아도 서비스 주소·키·필드가 같다고 가정하지 않는다. 본 연수의 신청과 호출은 위 공공데이터포털 서비스로 통일한다.',
  params: [
    { key: 'serviceKey', desc: '해당 서비스 활용신청에 연결된 인증키. 서버(Pages Functions)에서만 주입한다.' },
    { key: 'pageNo', desc: '페이지 번호.' },
    { key: 'numOfRows', desc: '한 페이지 결과 수. 앱은 10으로 고정.' },
    { key: 'type', desc: 'json.' },
    { key: 'FOOD_NM_KR', desc: '식품명 검색어. 대소문자를 그대로 사용.' },
  ],
  exampleRequest: `GET https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo03/getFoodNtrCpntDbInq03
쿼리: serviceKey=서버에서만주입, pageNo=1, numOfRows=10, type=json, FOOD_NM_KR=김밥`,
  exampleNote:
    '실제 인증키가 포함된 완성 URL을 참가자끼리 공유하거나 AI 대화창에 붙여 넣도록 시키지 않는다.',
  fields: [
    { key: 'FOOD_CD', desc: '식품 식별 코드' },
    { key: 'FOOD_NM_KR', desc: '식품명' },
    { key: 'SERVING_SIZE', desc: '영양성분함량기준량' },
    { key: 'AMT_NUM1', desc: '에너지(kcal)' },
    { key: 'AMT_NUM3', desc: '단백질(g)' },
    { key: 'AMT_NUM4', desc: '지방(g)' },
    { key: 'AMT_NUM6', desc: '탄수화물(g)' },
    { key: 'AMT_NUM7', desc: '당류(g)' },
    { key: 'NUTRI_AMOUNT_SERVING', desc: '1회 섭취참고량. 기준량 대신 사용하지 않는다.' },
    { key: 'MAKER_NM', desc: '업체명' },
    { key: 'SUB_REF_NAME', desc: '출처 관련 원문' },
    { key: 'RESEARCH_YMD, UPDATE_DATE', desc: '자료 생성·수정 날짜 관련 원문' },
  ],
  responseNote:
    'Swagger의 응답 모형은 header, body, body.items.item, body.totalCount 등을 제시한다. 실제 JSON은 배열 포장 방식이 다를 수 있으므로 실제 성공 응답과 대조한다. 포털의 Example Value에 보이는 ‘string’은 실제 음식 데이터가 아니다.',
  normalization: [
    '원자료 문자열과 변환 숫자를 함께 보존한다.',
    '빈 문자열·null·‘-’·검출한계 표현·수치가 아닌 값은 0으로 변환하지 않는다. 숫자로 쓸 수 없는 값은 null과 원문으로 보관한다.',
    '실제 ‘0’만 0으로 표시한다. 유한한 음이 아닌 수치만 합산에 사용한다.',
    'SERVING_SIZE가 명확한 ‘100g’, ‘100 g’, ‘100mL’ 등일 때만 기준량과 단위를 읽는다. 읽을 수 없으면 원문만 표시한다. NUTRI_AMOUNT_SERVING을 이용해 빈 기준량을 임의 보충하지 않는다.',
    'g와 mL를 밀도 없이 서로 환산하지 않는다. API의 모든 항목이 100g 기준이라고 하드코딩하지 않는다.',
    '기준량 b, 같은 단위의 선택량 a이면 영양소 선택량=기준 영양소×a/b.',
    '접시 합계에 결측 영양소가 포함되면 해당 영양소는 ‘확인된 항목 합계’와 누락 건수를 함께 보여 준다. 완전한 총량처럼 표시하지 않는다.',
    '합계에서 당류는 탄수화물과 중복 합산하지 않는다. 영양소 합이 음식 전체 질량과 같아야 한다고 요구하지 않는다.',
    '실제 자료를 바탕으로 녹말량·효소량·흡수율을 만들어 내지 않는다.',
  ],
}

/** 6. 개발용 예시 데이터와 확인값 (가상 자료) */
export interface DemoRaw {
  FOOD_CD: string
  FOOD_NM_KR: string
  SERVING_SIZE: string
  AMT_NUM1: string | number | null
  AMT_NUM3: string | number | null
  AMT_NUM4: string | number | null
  AMT_NUM6: string | number | null
  AMT_NUM7: string | number | null
}

export const DEMO_RAW: DemoRaw[] = [
  { FOOD_CD: 'DEMO-A', FOOD_NM_KR: '연습용 간식 A', SERVING_SIZE: '100g', AMT_NUM1: 158, AMT_NUM3: 5, AMT_NUM4: 2, AMT_NUM6: 30, AMT_NUM7: 4 },
  { FOOD_CD: 'DEMO-B', FOOD_NM_KR: '연습용 간식 B', SERVING_SIZE: '100g', AMT_NUM1: 155, AMT_NUM3: 12, AMT_NUM4: 7, AMT_NUM6: 11, AMT_NUM7: 3 },
  { FOOD_CD: 'DEMO-C', FOOD_NM_KR: '연습용 음료 C', SERVING_SIZE: '100mL', AMT_NUM1: 52, AMT_NUM3: 3, AMT_NUM4: 2, AMT_NUM6: 5.5, AMT_NUM7: 5 },
  { FOOD_CD: 'DEMO-D', FOOD_NM_KR: '연습용 결측 자료 D', SERVING_SIZE: '100g', AMT_NUM1: '', AMT_NUM3: '', AMT_NUM4: '0', AMT_NUM6: '-', AMT_NUM7: null },
  { FOOD_CD: 'DEMO-E', FOOD_NM_KR: '연습용 기준량 미상 E', SERVING_SIZE: '기준량 확인 필요', AMT_NUM1: null, AMT_NUM3: 2, AMT_NUM4: 1, AMT_NUM6: 10, AMT_NUM7: 2 },
]

export const DEMO_META = {
  maker: '연수용 가상 자료',
  source: '기능 검증용 직접 구성',
  badge: '수업용 가상 데이터',
  caveat:
    '실제 제품의 영양성분이 아닌 UI·계산 확인용 가상 자료다. 공식 API 응답을 흉내 낸 실제 관측 자료라고 주장하지 않는다. 날짜를 공공기관 검증 날짜로 꾸미지 않는다.',
}

export const HAND_CHECKS: string[] = [
  'A 50g: 탄수화물 15g, 단백질 2.5g, 지방 1g, 당류 2g.',
  'B 100g: 탄수화물 11g, 단백질 12g, 지방 7g, 당류 3g.',
  'A 50g+B 100g: 탄수화물 26g, 단백질 14.5g, 지방 8g, 당류 5g. 당류를 더해 탄수화물 31g이라고 표시하면 오류다.',
  'C 200mL: 탄수화물 11g, 단백질 6g, 지방 4g, 당류 10g. C를 200g으로 자동 환산하지 않는다.',
  'D: 지방만 0g, 나머지는 정보 없음. 전체를 0g으로 표시하지 않는다.',
  'E: 원자료 조회는 가능, 선택량 환산은 불가.',
  '빈 선택량·0·음수·무한대는 접시 추가를 거부한다.',
]

/** 8. 강사 준비와 수업 운영 */
export const INSTRUCTOR = {
  before: [
    '강사 본인 계정으로 API를 신청하고 Cloudflare에서 실제 검색을 시험한다. 문서 확인과 호출 성공은 별도로 기록한다.',
    '현재 서비스 주소·필드·기준량·승인 유형·Cloudflare 무료 한도를 다시 확인한다.',
    '실제 검색 결과 중 기준량과 영양소가 명확한 서로 다른 음식 2~3개를 선정한다. 이름만으로 특정 제품과 같다고 하지 않는다.',
    '제공기관 장애 시 쓸 가상 예시 데이터와 단계별 시작 코드를 준비한다. 장애 시에 실제 API 연결 완료를 선언하지 않는다.',
    '학교 관리 계정이 외부 서비스 연결을 제한하는지 사전 확인한다. 참가자에게 자신이 사용 가능한 계정을 준비하도록 안내한다.',
    '교육과정과 사용 교과서의 소화 효소·지방 분해 표현을 대조하고 교사 검토 규칙을 확정한다.',
    '강사의 인증키를 참가자 프롬프트나 공유 자료에 배포하지 않는다. 각 참가자가 자신의 키를 사용한다.',
  ],
  lesson: [
    { phase: '도입 5분', desc: '두 음식을 선택하고 어떤 영양소의 소화가 필요할지 예상한다.' },
    { phase: '자료 탐색 10분', desc: '기준량과 실제 영양소 값을 확인하고 비교한다.' },
    { phase: '모형 탐구 15분', desc: '대표 모형에서 기관과 효소를 연결하고 설명한다.' },
    { phase: '정리 10분', desc: '처음 생각과 바뀐 설명을 비교해 기록한다.' },
    { phase: '후속 활동', desc: '영양소 검출 또는 침의 소화 작용 실험과 연계한다.' },
  ],
  lessonNote: '이 수업안은 교사의 시간표에 맞춰 조정 가능하다.',
  observe: [
    '자료의 기준량과 선택량을 구분하는가?',
    '탄수화물 전체를 녹말로 단정하지 않는가?',
    '소화 기관과 효소의 작용을 연결하는가?',
    '소화와 흡수를 구분하는가?',
    'API 자료로 알 수 있는 것과 모형으로 설명하는 것을 구별하는가?',
  ],
  observeNote: '자유 서술에 특정 단어가 있다는 이유만으로 정답 처리하지 않는다.',
}

/** 9. 선택 확장 — 기본 과정에 포함되지 않음 */
export const EXTENSIONS = [
  {
    title: '가. 실제 영양소 검출 실험과 비교',
    body: '반응 결과는 교사가 직접 입력한다. API 수치만으로 시약의 정확한 색·반응 강도를 계산하지 않는다.',
  },
  {
    title: '나. 기관계 통합',
    body: '소화·흡수된 물질과 호흡으로 들어온 산소가 순환계를 통해 세포에 전달되고 세포호흡과 연결됨을 모식도로 설명한다. API 영양소량으로 개인별 ATP 생성량을 단정하지 않는다.',
  },
  {
    title: '다. 로컬 개발',
    body: 'Node.js가 있는 참가자만 npm install → npm run build → npx wrangler pages dev dist로 화면과 Functions를 함께 확인한다. .dev.vars에 DATA_GO_KR_SERVICE_KEY를 개인 컴퓨터에서 설정하고 Git에 포함하지 않는다. 실제 키를 명령줄 인수에 적지 않는다. Vite의 npm run dev만으로 Cloudflare Functions가 자동 실행된다고 설명하지 않는다.',
    link: OFFICIAL_LINKS.cfLocal,
  },
  {
    title: '라. QR 공유',
    body: '완성된 공개 주소만 QR로 만든다. 관리 화면 주소나 인증키 포함 URL은 공유하지 않는다.',
  },
]

/** 1. 결과물과 연수의 범위 */
export const SCOPE = {
  guideProduct: '교사용 연수 안내 웹페이지 (지금 보고 있는 이 사이트)',
  participantProduct: '중학생용 ‘간식의 몸속 여행’ 앱 (참가자가 안내를 따라 자신의 계정에서 만드는 별도 프로젝트)',
  flow: [
    'Google AI Studio에서 예시 데이터로 화면 제작',
    '공공 API용 서버 함수 작성',
    'GitHub에 원본 저장',
    'Cloudflare Pages 배포',
    'Cloudflare에 인증키 등록',
    '실제 식품 검색 검증',
    '수정 후 재배포',
  ],
  defaults: [
    'React + Vite + TypeScript.',
    '정적 화면은 Cloudflare Pages, API 연결은 같은 프로젝트의 Pages Functions.',
    '생성형 AI는 코드 제작에 사용한다. 완성 앱이 Gemini API를 호출할 필요는 없다.',
    '앱의 소화 설명과 피드백은 교사가 검토한 고정 규칙으로 동작한다.',
    '서버 DB·학생 로그인·교사용 수집 서버는 기본판에 넣지 않는다.',
    'GitHub 연결 배포를 본문 경로로 통일한다. Cloudflare 대시보드에 dist 폴더만 끌어다 놓는 방식은 Pages Functions를 배포하는 기본 경로로 안내하지 않는다.',
    '유료 도메인 구매 없이 pages.dev 주소를 사용한다. 무료 요금제의 사용량 제한 안에서 운영하며 무제한 무료를 약속하지 않는다.',
  ],
  time: '권장 운영 시간은 계정 준비·휴식 제외 약 235분이다. 1회 약 4시간 또는 2회 분할 연수로 제안한다. 계정·API 신청은 사전 과제로 권한다. 짧은 연수에서는 강사가 검증한 시작 프로젝트를 제공하되 API 연결과 배포 단계를 생략한 것을 ‘전체 완료’라고 하지 않는다.',
  accounts: ['Google AI Studio', '공공데이터포털', 'GitHub', 'Cloudflare'],
}

export const FINAL_FLAGS = [
  { id: 'ui', label: '앱 화면 완성', desc: '연습 모드에서 음식 카드·접시 계산·소화 모형·기록·인쇄가 동작한다.' },
  { id: 'deploy', label: '공개 배포 완료', desc: 'pages.dev 공개 주소에서 앱이 열리고 /api/health가 JSON을 반환한다.' },
  { id: 'api', label: '실제 공공 API 조회 확인', desc: '배포 주소의 공공데이터 모드에서 실제 검색 결과가 표시되고 출처·기준량·영양성분이 원자료와 일치한다.' },
]
