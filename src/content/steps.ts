import type { Step } from './types'
import { PROMPTS } from './prompts'
import { OFFICIAL_LINKS as L, API_SPEC } from './reference'

const P = (id: keyof typeof PROMPTS) => ({ kind: 'prompt' as const, title: PROMPTS[id].title, body: PROMPTS[id].body })

export const STEPS: Step[] = [
  // ───────────────────────────── 0 ─────────────────────────────
  {
    id: 0,
    title: '오늘 만들 앱과 역할 나누기',
    minutes: 10,
    goal: '화면, 코드 저장소, 배포 서비스, 데이터 제공 기관의 역할을 구분하고 안내 사이트와 내 학생용 앱이 별개임을 확인한다.',
    workplaces: ['연수 안내'],
    links: [L.curriculum, L.niddk],
    actions: [
      '‘내가 먹은 음식은 몸속에서 어떻게 달라질까?’ 질문을 읽는다.',
      '아래 미니 체험에서 연습용 간식 A의 자료를 보고 대표적인 소화 과정을 예상한다.',
      '안내 사이트(청록 배지)와 자신의 학생용 앱(주황 배지)이 별개의 프로젝트임을 확인한다.',
      'AI Studio·공공데이터포털·GitHub·Cloudflare 계정의 로그인 가능 여부를 확인한다.',
      '아래 구조도를 쉬운 말과 화살표로 읽는다: 학생 화면 → 같은 사이트의 /api/foods → Cloudflare의 비밀 인증키 사용 → 식품 API → 필요한 영양정보만 학생 화면으로 반환.',
      '계정 비밀번호·인증키는 AI 프롬프트에 쓰지 않는다는 안내를 확인한다.',
    ],
    copyBlocks: [
      {
        kind: 'settings',
        title: '준비 계정 점검표 (복사해 메모장에 붙여 두고 체크)',
        body: `[간식의 몸속 여행 연수 — 준비 계정]
□ Google AI Studio 로그인 가능 (https://aistudio.google.com/)
□ 공공데이터포털 로그인 가능 (https://www.data.go.kr/)
□ GitHub 로그인 가능 (https://github.com/)
□ Cloudflare 로그인 가능 (https://dash.cloudflare.com/)
주의: 비밀번호·인증키는 이 메모에도, AI 프롬프트에도 적지 않는다.`,
        rows: [
          { key: 'Google AI Studio', value: '화면 코드 제작', note: 'Build 모드의 새 프로젝트' },
          { key: '공공데이터포털', value: '식품영양성분 API 활용신청·인증키', note: '개발계정' },
          { key: 'GitHub', value: '원본 코드 저장', note: '저장소 이름 snack-body-journey' },
          { key: 'Cloudflare', value: 'Pages 배포·Functions·Secret', note: 'pages.dev 주소 사용' },
        ],
      },
    ],
    expected: [
      '미니 체험에서 연습용 간식 A가 100g 기준 탄수화물 30g·단백질 5g·지방 2g·당류 4g으로 보인다.',
      '구조도에서 인증키가 학생 화면이 아니라 Cloudflare 서버 함수에만 있음을 읽을 수 있다.',
      '네 가지 계정이 모두 로그인된다.',
    ],
    checklist: [
      '핵심 질문과 학습 흐름(음식 고르기 → 영양소 자료 읽기 → 소화 기관·효소 예상 → 대표 모형 확인 → 설명 수정)을 읽었다.',
      '안내 사이트와 학생용 앱이 별개 프로젝트임을 확인했다.',
      '네 가지 계정에 로그인할 수 있다.',
      '화면·저장소·배포·데이터 제공 기관의 역할을 구분할 수 있다.',
      '비밀번호와 인증키를 AI 프롬프트에 쓰지 않는다는 규칙을 확인했다.',
    ],
    troubles: [
      {
        symptom: '학교 관리 계정으로 GitHub·Cloudflare 가입이나 외부 연결이 막힌다.',
        where: '해당 서비스의 가입·OAuth 화면에 뜨는 관리자 제한 안내.',
        fix: '본인이 사용할 수 있는 개인 계정을 준비한다. 관리자에게 외부 연결 허용을 요청하는 것은 연수 시간 안에 끝나지 않을 수 있다.',
        recheck: '네 서비스에 모두 로그인되는지 다시 확인한다.',
      },
      {
        symptom: '안내 사이트 안에서 인증키를 입력하는 칸을 찾는다.',
        where: '이 안내 사이트에는 인증키 입력란이 없다.',
        fix: '인증키는 12단계에서 Cloudflare의 Secret에만 직접 입력한다. 안내 사이트·프롬프트·GitHub에는 넣지 않는다.',
        recheck: '12단계 설명을 미리 읽어 둔다.',
      },
    ],
    recoveryPrompts: [],
    widgets: ['architecture', 'mini-demo'],
    notes: [
      {
        title: '두 프로젝트 구분',
        tone: 'info',
        body: [
          '연수 안내(이 사이트, 청록색): 교사가 읽고 따라 하는 정적 안내 페이지. 인증키를 받지 않고 식품 API를 직접 호출하지 않는다. 미니 체험은 가상 데이터만 쓴다.',
          '학생용 앱(참가자가 만드는 것, 주황색): React + Vite + TypeScript 앱. Cloudflare Pages에 배포하고 같은 프로젝트의 Pages Functions가 공공 API를 호출한다.',
        ],
      },
    ],
  },

  // ───────────────────────────── 1 ─────────────────────────────
  {
    id: 1,
    title: '공공 API 활용신청과 명세 읽기',
    minutes: 15,
    goal: '서비스 승인 상태와 현재 요청 주소·검색변수·기준량 필드를 확인한다.',
    workplaces: ['공공데이터포털'],
    links: [L.dataGoKr, L.mfds],
    actions: [
      'https://www.data.go.kr/data/15127578/openapi.do 를 연다.',
      '제목이 ‘식품의약품안전처_식품영양성분DB정보’인지 확인한다.',
      '로그인 후 ‘활용신청’을 선택한다. 개발계정으로 신청하고 필요한 활용 목적·기간 등을 실제 계획에 맞게 작성한다.',
      '활용 목적 예시는 아래 복사 블록을 참고한다. 참가자 개인 상황은 각자 작성한다.',
      '마이페이지의 OpenAPI 활용 내역 또는 신청 상세에서 이 서비스의 승인 상태를 확인한다. 발급 후 즉시 모든 호출이 성공한다고 약속하지 않는다.',
      '인증키 표시 영역을 확인한다. Encoding/Decoding 두 형태가 있으면 이번 코드에서는 일반 인증키의 Decoding 값을 사용한다. 실제 키는 지금 프롬프트나 안내 페이지에 저장하지 않고 12단계에서 Cloudflare의 Secret에 직접 입력한다.',
      'API 상세의 ‘활용명세’에서 GET /getFoodNtrCpntDbInq03을 펼친다.',
      'serviceKey, pageNo, numOfRows, type, FOOD_NM_KR의 이름과 의미를 확인한다.',
      'Responses의 Model을 펼쳐 SERVING_SIZE와 AMT_NUM3·4·6·7의 의미를 확인한다. ‘Example Value’의 string 값을 실제 자료로 복사하지 않는다.',
      '공개 명세가 아래 표와 달라졌다면 현재 명세를 확인하고 변경 부분만 기록한다. 인증키는 기록에 포함하지 않는다.',
    ],
    copyBlocks: [
      {
        kind: 'text',
        title: '활용 목적 예시 (신청서에 참고용으로 붙여 넣고 본인 상황에 맞게 고친다)',
        body: '중학교 과학 교사 연수에서 식품의 영양성분과 소화 원리를 탐구하는 교육용 웹앱 개발',
      },
      {
        kind: 'settings',
        title: '이번 연수에서 쓰는 API 명세 요약 (2026-10-16 확인)',
        body: `서비스명: ${API_SPEC.serviceName}
서비스 상세: ${API_SPEC.detailUrl}
요청 주소: ${API_SPEC.endpoint}
요청변수: serviceKey(서버에서만), pageNo, numOfRows=10, type=json, FOOD_NM_KR=검색어
응답 필드: FOOD_CD 식품코드 / FOOD_NM_KR 식품명 / SERVING_SIZE 영양성분함량기준량 / AMT_NUM1 에너지(kcal) / AMT_NUM3 단백질(g) / AMT_NUM4 지방(g) / AMT_NUM6 탄수화물(g) / AMT_NUM7 당류(g) / NUTRI_AMOUNT_SERVING 1회 섭취참고량(기준량 대신 쓰지 않음) / MAKER_NM 업체명 / SUB_REF_NAME 출처 / RESEARCH_YMD, UPDATE_DATE 날짜
명세 변경 메모(키 제외): `,
        rows: [
          { key: '서비스명', value: API_SPEC.serviceName },
          { key: '요청 주소', value: API_SPEC.endpoint, note: 'Info01·Info02, I0750·I2791 주소와 섞지 않는다' },
          { key: '검색변수', value: 'FOOD_NM_KR', note: '식품명 검색어, 대소문자 그대로' },
          { key: '기준량 필드', value: 'SERVING_SIZE', note: 'NUTRI_AMOUNT_SERVING(1회 섭취참고량)과 다르다' },
          { key: '영양소 필드', value: 'AMT_NUM3 단백질 / AMT_NUM4 지방 / AMT_NUM6 탄수화물 / AMT_NUM7 당류', note: 'AMT_NUM1은 에너지(kcal)' },
          { key: '사용할 키', value: '일반 인증키의 Decoding 값', note: '12단계에서 Cloudflare Secret에만 입력' },
        ],
      },
    ],
    expected: [
      '신청 상세 또는 활용 내역에서 이 서비스가 승인 상태로 보인다.',
      '활용명세의 GET /getFoodNtrCpntDbInq03 아래에 serviceKey, pageNo, numOfRows, type, FOOD_NM_KR이 보인다.',
      'Model에 SERVING_SIZE, AMT_NUM3, AMT_NUM4, AMT_NUM6, AMT_NUM7이 보인다.',
    ],
    checklist: [
      '서비스명이 ‘식품의약품안전처_식품영양성분DB정보’임을 확인했다.',
      '개발계정으로 활용신청을 완료하고 승인 상태를 확인했다.',
      '현재 요청 주소가 FoodNtrCpntDbInfo03/getFoodNtrCpntDbInq03임을 확인했다.',
      '검색변수 FOOD_NM_KR과 기준량 필드 SERVING_SIZE를 확인했다.',
      '인증키를 어디에도 복사해 두지 않았다 (12단계에서 Cloudflare에만 입력).',
    ],
    troubles: [
      {
        symptom: '활용신청은 승인인데 아직 실제 호출을 해 보지 않았다.',
        where: '이 단계는 실제 호출을 하지 않는다.',
        fix: '‘실제 검색 확인 전’으로 표시하고 화면 제작(2단계)을 계속한다. 승인·인증키 발급·실제 호출 성공은 별개다.',
        recheck: '12단계에서 배포 주소의 공공데이터 모드로 실제 검색을 확인한다.',
      },
      {
        symptom: '블로그에서 본 Info01·Info02 주소나 식품안전나라 I0750·I2791 주소가 나온다.',
        where: '현재 포털 Swagger의 요청 주소.',
        fix: '본 연수는 공공데이터포털의 FoodNtrCpntDbInfo03/getFoodNtrCpntDbInq03으로 통일한다. 다른 서비스의 키·필드를 섞지 않는다.',
        recheck: '활용명세에 표시된 주소와 위 표를 대조한다.',
      },
      {
        symptom: '포털 메뉴 이름이 안내와 다르다.',
        where: '마이페이지 → OpenAPI 활용 내역(또는 신청 상세) / API 상세 → 활용명세.',
        fix: '목적은 ① 승인 상태 확인 ② 인증키 위치 확인 ③ Swagger 요청·응답 모형 확인이다. 메뉴명이 바뀌었으면 이 세 가지를 제공하는 화면을 찾는다.',
        recheck: '세 가지를 모두 확인했는지 체크리스트로 돌아간다.',
      },
    ],
    recoveryPrompts: [],
    notes: [
      {
        title: '도움말',
        tone: 'info',
        body: ['활용신청 승인과 인증키 발급, 실제 호출 성공은 별개다. 이 단계에서 실제 호출을 하지 않았으면 ‘실제 검색 확인 전’으로 표시하고 화면 제작을 계속한다.'],
      },
      {
        title: '강사 메모',
        tone: 'teacher',
        body: [
          '개발계정은 자동승인, 운영계정은 심의승인으로 안내되어 있다. 수업용 배포 확인과 상시 운영 신청의 구분을 설명한다. 운영 전 포털의 실제 이용기간·호출량·승인 조건을 확인한다.',
        ],
      },
    ],
  },

  // ───────────────────────────── 2 ─────────────────────────────
  {
    id: 2,
    title: '앱의 화면 뼈대 만들기',
    minutes: 15,
    goal: 'AI Studio Build 새 프로젝트에서 연습 데이터 모드만 동작하는 첫 화면을 만든다.',
    workplaces: ['AI Studio'],
    links: [L.aiStudio, L.aiStudioBuild],
    actions: [
      'Google AI Studio의 Build에서 새 앱을 만든다.',
      '아래 프롬프트 01을 전체 복사해 입력한다.',
      '생성이 끝나면 ‘연습용 간식 A’를 눌러 음식 카드가 열리는지 확인한다.',
      '페이지 제목·모드 배지·모바일 화면을 확인한다.',
    ],
    copyBlocks: [P('p01')],
    expected: ['A 선택 시 기준 100g과 탄수화물 30g이 보인다.', 'C에는 100mL가 표시된다.', '모드 배지에 ‘연습 데이터’가 항상 보이고 공공데이터 검색은 ‘연결 예정’으로 표시된다.'],
    checklist: [
      '프롬프트 01을 입력해 앱이 생성되었다.',
      '연습용 간식 A 카드에 기준 100g, 탄수화물 30g이 보인다.',
      '연습용 음료 C에 100mL가 표시된다.',
      '모드 배지와 모바일 화면을 확인했다.',
    ],
    troubles: [
      {
        symptom: '모든 음식이 100g으로 표시되거나 C가 100g으로 나온다.',
        where: '음식 카드의 기준량 표시.',
        fix: '아래 복구 프롬프트를 입력한다. 항목별 기준량을 표시하게 한다.',
        recheck: 'C 카드에 100mL가 보이는지 확인한다.',
      },
      {
        symptom: 'AI가 Express 서버나 Gemini API 호출, 로그인 화면을 함께 만들었다.',
        where: '파일 목록과 package.json.',
        fix: '‘완성 앱에는 Gemini API, 학생 로그인, DB, Express를 넣지 마. React+Vite 정적 화면만 유지해 줘’라고 다시 요청한다.',
        recheck: '파일 목록에 server.js, Express 의존성이 없는지 확인한다.',
      },
      {
        symptom: '공공데이터 검색이 ‘연결됨’처럼 보인다.',
        where: '첫 화면의 모드 표시.',
        fix: '현재는 가상 자료만 사용하고 실제 API 연결 성공이라고 표시하지 않게 수정한다.',
        recheck: '공공데이터 모드가 ‘연결 예정’으로 보인다.',
      },
    ],
    recoveryPrompts: [
      {
        title: '복구 프롬프트 (기준량 표시)',
        body: '모든 음식을 100g으로 표시하지 말고 항목별 기준량을 표시해 줘. 현재는 가상 자료만 사용하고 실제 API 연결 성공이라고 표시하지 마.',
      },
    ],
  },

  // ───────────────────────────── 3 ─────────────────────────────
  {
    id: 3,
    title: '기준량·결측값 처리하기',
    minutes: 15,
    goal: '실제 API와 연습 데이터가 공통으로 쓰는 정규화 함수를 만들고 결측과 실제 0을 구분한다.',
    workplaces: ['AI Studio'],
    links: [L.aiStudio, L.dataGoKr],
    actions: [
      '같은 AI Studio 프로젝트에 프롬프트 02를 입력한다.',
      '결측 자료 D와 기준량 미상 E를 연다.',
      '빈칸과 실제 0이 다르게 보이는지 확인한다.',
      '영양성분 기준량과 1회 섭취참고량의 차이를 읽는다.',
    ],
    copyBlocks: [P('p02')],
    expected: ['D의 단백질은 정보 없음, 지방은 0으로 표시된다.', 'E의 기준량은 ‘기준량 확인 필요’ 원문이 그대로 표시된다.', 'A·B·C의 기존 표시는 유지된다.'],
    checklist: [
      '프롬프트 02를 입력해 정규화 함수가 생겼다.',
      'D의 단백질·탄수화물·당류는 정보 없음, 지방만 0으로 보인다.',
      'E는 원자료 표시만 되고 양 환산은 불가로 표시된다.',
      '기준량(SERVING_SIZE)과 1회 섭취참고량(NUTRI_AMOUNT_SERVING)의 차이를 읽었다.',
    ],
    troubles: [
      {
        symptom: 'D의 빈칸이 0g으로 표시된다.',
        where: '정규화 함수의 숫자 변환.',
        fix: 'Number(빈 문자열)이 0이 되는 문제다. 아래 복구 프롬프트를 입력한다.',
        recheck: 'D의 단백질이 ‘정보 없음’으로 바뀌었는지 확인한다.',
      },
      {
        symptom: 'E의 기준량이 100g으로 채워져 있다.',
        where: 'basis 파싱.',
        fix: '숫자와 단위가 명확할 때만 파싱하고 읽을 수 없으면 원문만 표시하게 한다. 1회 섭취참고량으로 보충하지 않게 한다.',
        recheck: 'E의 기준량 칸에 ‘기준량 확인 필요’가 그대로 보인다.',
      },
    ],
    recoveryPrompts: [
      {
        title: '복구 프롬프트 (결측과 0 분리)',
        body: 'Number(빈 문자열)이 0이 되는 문제를 막아 줘. 숫자 변환 전 결측 표현과 기준 단위를 확인하고, 결측과 실제 0을 분리해 줘.',
      },
    ],
  },

  // ───────────────────────────── 4 ─────────────────────────────
  {
    id: 4,
    title: '접시와 선택량 계산하기',
    minutes: 15,
    goal: '선택량 입력 → 접시 담기 → 합계 계산이 손으로 확인한 값과 일치하게 만든다.',
    workplaces: ['AI Studio'],
    links: [L.aiStudio],
    actions: [
      '같은 AI Studio 프로젝트에 프롬프트 03을 입력한다.',
      'A 50g과 B 100g을 담는다.',
      '탄수화물 26g·단백질 14.5g·지방 8g을 확인한다.',
      'D를 추가했을 때 결측 포함 안내가 나오는지 확인한다.',
      'C는 mL로만 입력하는지 확인한다.',
    ],
    copyBlocks: [
      P('p03'),
      {
        kind: 'settings',
        title: '손으로 확인할 값',
        body: `A 50g: 탄수화물 15g, 단백질 2.5g, 지방 1g, 당류 2g.
B 100g: 탄수화물 11g, 단백질 12g, 지방 7g, 당류 3g.
A 50g+B 100g: 탄수화물 26g, 단백질 14.5g, 지방 8g, 당류 5g. 당류를 더해 탄수화물 31g이라고 표시하면 오류다.
C 200mL: 탄수화물 11g, 단백질 6g, 지방 4g, 당류 10g. C를 200g으로 자동 환산하지 않는다.
D: 지방만 0g, 나머지는 정보 없음. 전체를 0g으로 표시하지 않는다.
E: 원자료 조회는 가능, 선택량 환산은 불가.
빈 선택량·0·음수·무한대는 접시 추가를 거부한다.`,
        rows: [
          { key: 'A 50g', value: '탄수화물 15g · 단백질 2.5g · 지방 1g · 당류 2g' },
          { key: 'B 100g', value: '탄수화물 11g · 단백질 12g · 지방 7g · 당류 3g' },
          { key: 'A 50g + B 100g', value: '탄수화물 26g · 단백질 14.5g · 지방 8g · 당류 5g', note: '탄수화물 31g이면 당류 중복 합산 오류' },
          { key: 'C 200mL', value: '탄수화물 11g · 단백질 6g · 지방 4g · 당류 10g', note: '200g으로 자동 환산 금지' },
          { key: 'D', value: '지방만 0g, 나머지 정보 없음' },
          { key: 'E', value: '원자료 조회 가능, 선택량 환산 불가' },
          { key: '빈 값·0·음수·무한대', value: '접시 추가 거부' },
        ],
      },
    ],
    expected: ['A 50g+B 100g 합계가 탄수화물 26g·단백질 14.5g·지방 8g·당류 5g이다.', 'D를 담으면 결측 영양소에 ‘확인된 항목 합계’와 누락 건수가 보인다.', 'C는 mL 단위로만 입력된다.'],
    checklist: [
      'A 50g+B 100g 합계가 26g·14.5g·8g·5g으로 맞다.',
      'D 포함 시 누락 건수 안내가 보인다.',
      'C는 mL로만 입력되고 g과 섞이지 않는다.',
      '선택량 수정·삭제·전체 비우기 후 합계가 함께 바뀐다.',
      '0·음수·빈칸 선택량이 거부된다.',
    ],
    troubles: [
      {
        symptom: '합계가 탄수화물 31g으로 나온다.',
        where: '합계 계산에서 당류 중복 합산.',
        fix: '당류는 탄수화물의 일부이므로 총량에 더하지 않게 수정한다.',
        recheck: 'A 50g+B 100g 탄수화물이 26g인지 확인한다.',
      },
      {
        symptom: '항목을 삭제했는데 합계가 그대로다.',
        where: '합계를 상태에 따로 저장한 경우.',
        fix: '아래 복구 프롬프트로 현재 접시 원자료에서 매번 계산하게 한다.',
        recheck: '삭제 후 합계가 즉시 바뀌는지 확인한다.',
      },
      {
        symptom: 'D를 담으면 결측이 0으로 합산된다.',
        where: '합계 함수의 null 처리.',
        fix: '결측은 0으로 치환하지 말고 ‘확인된 항목 합계’와 누락 건수를 표시하게 한다.',
        recheck: 'D 포함 합계에 누락 1건 안내가 보인다.',
      },
    ],
    recoveryPrompts: [
      {
        title: '복구 프롬프트 (합계·결측·단위)',
        body: '합계를 상태에 중복 저장하지 말고 현재 접시 원자료로 계산해 줘. 결측은 0으로 치환하지 말고 누락 건수를 보여 줘. g와 mL 입력이 섞이지 않게 해 줘.',
      },
    ],
  },

  // ───────────────────────────── 5 ─────────────────────────────
  {
    id: 5,
    title: '소화계 모형과 효소 연결하기',
    minutes: 25,
    goal: '음식의 영양소 자료와 교사가 검토한 대표 소화 모형을 구분해 소화 탐구 영역을 만든다.',
    workplaces: ['AI Studio'],
    links: [L.aiStudio, L.niddk, L.curriculum],
    actions: [
      '같은 AI Studio 프로젝트에 프롬프트 04를 입력한다.',
      '음식의 영양소 자료를 확인한 뒤 대표 소화 모형을 선택한다.',
      '기관·효소 카드를 클릭해 예상하고 설명을 확인한다.',
      '재생·정지·다음·처음으로와 키보드 조작을 확인한다.',
    ],
    copyBlocks: [P('p04')],
    expected: [
      '음식 데이터는 그대로 남고 별도 대표 모형이 동작한다.',
      '담즙이 효소로 분류되지 않는다.',
      '효소가 만들어지는 곳(예: 이자)과 작용하는 곳(예: 소장)이 구분된다.',
      '움직임 줄이기 상태에서 정적인 단계 카드로 같은 내용이 보인다.',
    ],
    checklist: [
      '입 → 식도 → 위 → 소장 → 대장 경로와 간·이자·쓸개 보조 기관이 구분되어 그려진다.',
      '녹말·단백질·지방 세 모형이 동작하고 모형의 한계 문구가 보인다.',
      '담즙이 효소로 표시되지 않는다.',
      '효소의 생성 기관과 작용 기관이 구분된다.',
      '드래그 없이 클릭·키보드로 기관과 효소를 연결할 수 있다.',
      '과학 설명 규칙이 별도 파일에 모여 있다.',
    ],
    troubles: [
      {
        symptom: '선택 음식의 탄수화물 g을 전부 녹말 입자로 바꿔 보여 준다.',
        where: '모형 입자 수와 영양소 g 수치의 연결.',
        fix: '아래 복구 프롬프트를 입력한다. 음식 자료와 모형을 분리하고 한계를 표시하게 한다.',
        recheck: '탄수화물 카드 옆에 ‘실제 탄수화물 전체가 녹말이라는 뜻은 아닙니다’가 보인다.',
      },
      {
        symptom: '음식이 간이나 이자 속을 통과하는 경로로 그려진다.',
        where: 'SVG 경로.',
        fix: '통과 경로는 입 → 식도 → 위 → 소장 → 대장만 두고 간·이자·쓸개는 별도 보조 기관으로 그리게 한다.',
        recheck: '경로 애니메이션이 보조 기관을 지나지 않는다.',
      },
      {
        symptom: '담즙이 ‘지방 분해 효소’로 적혀 있다.',
        where: '지방 모형의 설명 문장.',
        fix: '담즙은 효소가 아니며 유화를 돕고, 분해에는 라이페이스가 관여한다고 고치게 한다.',
        recheck: '지방 모형 설명을 다시 읽는다.',
      },
    ],
    widgets: ['images-link'],
    recoveryPrompts: [
      {
        title: '복구 프롬프트 (자료와 모형 분리)',
        body: '선택 음식의 탄수화물을 전부 녹말로 추정하지 마. 음식의 실제 자료와 일반적인 소화 원리 모형을 분리하고 모형의 한계를 짧게 표시해 줘.',
      },
    ],
  },

  // ───────────────────────────── 6 ─────────────────────────────
  {
    id: 6,
    title: '질문·피드백·탐구 보고서',
    minutes: 15,
    goal: '선택형 질문 5개와 이유 피드백, 브라우저에만 저장되는 탐구 기록과 A4 인쇄를 만든다.',
    workplaces: ['AI Studio'],
    links: [L.aiStudio],
    actions: [
      '같은 AI Studio 프로젝트에 프롬프트 05를 입력한다.',
      '문항에 일부러 틀린 답을 선택해 설명을 확인한다.',
      '자신의 예상과 수정한 설명을 기록한다.',
      '새로고침, 삭제, 인쇄 미리보기를 확인한다.',
    ],
    copyBlocks: [P('p05')],
    expected: ['틀린 답을 고르면 근거 설명이 나오고 재도전할 수 있다.', '새로고침 후 기록이 복원된다.', '인쇄 미리보기에 자료·출처·학생 설명이 있고 조작 버튼은 숨겨진다.'],
    checklist: [
      '선택형 질문 5개와 이유 피드백이 동작한다.',
      '탐구 기록에 음식·기준량·선택량·출처·처음 예상·설명·고친 이유 칸이 있다.',
      '새로고침 후 기록이 복원되고 삭제는 확인 후 처리된다.',
      '‘이 브라우저에만 저장되고 교사에게 자동 전송되지 않는다’ 안내가 보인다.',
      'A4 인쇄 미리보기에서 조작 버튼이 숨겨진다.',
    ],
    troubles: [
      {
        symptom: '점수가 A~E 성취수준으로 표시된다.',
        where: '질문 결과 화면.',
        fix: '점수를 공식 성취수준으로 바꾸지 않게 수정한다. 문항별 근거 설명과 재도전만 남긴다.',
        recheck: '결과 화면에 A~E 등급이 없다.',
      },
      {
        symptom: '모드를 바꾸면 기존 기록이 사라진다.',
        where: '기록 저장 키.',
        fix: '가상 데이터와 공공데이터 기록을 구분해 저장하고, 모드 전환이 기록을 삭제하지 않게 한다.',
        recheck: '모드를 바꿨다가 돌아와도 기록이 남아 있다.',
      },
      {
        symptom: '이름·학번을 입력하지 않으면 다음으로 못 간다.',
        where: '기록 양식의 필수 항목.',
        fix: '이름·학번을 선택 항목으로 바꾸게 한다.',
        recheck: '빈 채로도 기록이 저장된다.',
      },
    ],
    recoveryPrompts: [
      {
        title: '복구 프롬프트 (기록 저장)',
        body: '탐구 기록을 버전이 있는 localStorage에 저장하고 저장이 차단돼도 메모리로 계속 쓸 수 있게 해 줘. 가상 데이터 기록과 공공데이터 기록을 분리하고, 삭제는 확인 후에만 처리해 줘. 자유 서술은 채점하지 마.',
      },
    ],
  },

  // ───────────────────────────── 7 ─────────────────────────────
  {
    id: 7,
    title: 'Cloudflare 서버 함수 만들기',
    minutes: 25,
    goal: '학생 화면 대신 공공 API를 호출하는 Pages Functions(functions/api/foods.ts, health.ts) 코드를 만든다. 실데이터 성공 확인은 12단계다.',
    workplaces: ['AI Studio'],
    links: [L.aiStudio, L.cfFunctions, L.cfRouting, L.dataGoKr],
    actions: [
      '‘학생 화면에서 키를 직접 쓰지 않고 서버 함수가 대신 요청한다’는 구조를 확인한다.',
      '프롬프트 06을 입력한다. 실제 키는 입력하지 않는다.',
      '파일 목록에서 프로젝트 최상위의 functions/api/foods.ts와 health.ts를 확인한다.',
      'public/_routes.json을 확인한다. functions를 src·public·dist 안에 넣지 않는다.',
      'AI Studio 화면 미리보기가 Cloudflare 런타임을 제공하지 않을 수 있음을 읽는다. 이 단계의 성공은 함수 코드 작성과 형식 점검이며 실데이터 성공 확인은 12단계다.',
    ],
    copyBlocks: [
      P('p06'),
      {
        kind: 'settings',
        title: '서버 함수 파일 위치와 응답 계약 (점검용)',
        body: `functions/api/foods.ts   ← 프로젝트 최상위. GET /api/foods?q=검색어&page=1
functions/api/health.ts  ← {ok:true,service:'food-api',configured:키존재여부,version:'1'}, no-store
public/_routes.json      ← {"version":1,"include":["/api/*"],"exclude":[]}
환경변수 이름: DATA_GO_KR_SERVICE_KEY (Cloudflare Secret, 12단계에서 입력)
상류 주소(서버 코드 고정): https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo03/getFoodNtrCpntDbInq03
성공: {ok:true,mode:'public',items:[...],page,pageSize:10,totalCount,hasNext,fetchedAt}
오류: {ok:false,error:{code,message}}  — KEY_NOT_CONFIGURED(503), UPSTREAM_SCHEMA_ERROR 등`,
        rows: [
          { key: 'functions/api/foods.ts', value: 'GET /api/foods?q=검색어&page=1', note: '프로젝트 최상위' },
          { key: 'functions/api/health.ts', value: "{ok,service:'food-api',configured,version:'1'}", note: 'no-store, 키 값 반환 금지' },
          { key: 'public/_routes.json', value: '{"version":1,"include":["/api/*"],"exclude":[]}', note: '빌드 시 dist/_routes.json으로 복사' },
          { key: 'Secret 이름', value: 'DATA_GO_KR_SERVICE_KEY', note: 'context.env에서 읽음, VITE_ 접두사 금지' },
          { key: '상류 주소', value: API_SPEC.endpoint, note: '서버 코드에 고정' },
        ],
      },
    ],
    expected: ['함수 파일·경로·정규화·오류 반환 코드가 생성되고 키의 실제 값은 어디에도 없다.', 'public/_routes.json이 있다.', 'README에 구조 설명이 있다.'],
    checklist: [
      '프로젝트 최상위에 functions/api/foods.ts와 functions/api/health.ts가 있다.',
      'public/_routes.json이 {"version":1,"include":["/api/*"],"exclude":[]}이다.',
      '코드·README·프롬프트 어디에도 실제 인증키가 없다.',
      '키가 없을 때 503 KEY_NOT_CONFIGURED를 반환하고 가상 데이터를 반환하지 않는다.',
      '미리보기에서 실데이터가 안 나와도 이 단계의 성공은 코드 작성임을 이해했다.',
    ],
    troubles: [
      {
        symptom: 'AI가 Express의 app.listen이나 Vite 환경변수(import.meta.env.VITE_…)로 키를 읽는 코드를 만들었다.',
        where: 'functions 폴더 대신 server.js, 또는 src 안의 fetch 코드.',
        fix: '아래 복구 프롬프트를 입력한다. 키는 context.env에서만 읽는다.',
        recheck: 'VITE_로 시작하는 키 변수가 없고 functions가 최상위에 있다.',
      },
      {
        symptom: 'functions 폴더가 src나 public 안에 들어갔다.',
        where: '파일 트리.',
        fix: 'Pages Functions의 파일 라우팅은 프로젝트 최상위 functions 폴더를 사용한다. 위치를 옮기게 한다.',
        recheck: 'package.json과 같은 높이에 functions가 있다.',
      },
      {
        symptom: 'AI Studio 미리보기에서 /api/foods가 HTML을 돌려준다.',
        where: '미리보기 환경.',
        fix: '미리보기는 Cloudflare 런타임이 아닐 수 있다. 키를 프런트로 옮기지 말고 11~12단계의 배포 주소에서 확인한다.',
        recheck: '배포 후 /api/health가 JSON인지 확인한다.',
      },
    ],
    recoveryPrompts: [
      {
        title: '복구 프롬프트 (파일 라우팅)',
        body: 'Cloudflare Pages Functions의 파일 라우팅에 맞게 프로젝트 최상위 functions/api/foods.ts와 health.ts를 만들어 줘. Express의 app.listen이나 Vite의 브라우저 환경변수로 키를 읽는 방식은 제거해 줘.',
      },
    ],
    notes: [
      {
        title: '설명 카드: configured:true의 뜻',
        tone: 'info',
        body: ['/api/health의 configured:true는 설정 유무만 뜻한다. 올바른 키인지·API 권한이 있는지는 실제 검색으로 확인한다.'],
      },
      {
        title: '왜 서버 함수가 필요한가',
        tone: 'teacher',
        body: [
          '인증키를 브라우저 코드에 넣으면 학생 누구나 개발자 도구로 키를 볼 수 있다. 같은 사이트의 /api/foods가 Cloudflare의 Secret으로 대신 요청하면 키가 학생 화면에 내려가지 않는다.',
          '캐시(10분)는 같은 검색을 반복할 때 상류 호출을 줄이기 위한 것이며, 전 세계 단일 캐시나 호출량 보장을 뜻하지 않는다.',
        ],
      },
    ],
  },

  // ───────────────────────────── 8 ─────────────────────────────
  {
    id: 8,
    title: '실제 검색 화면 연결하기',
    minutes: 15,
    goal: '공공데이터 검색 모드가 /api/foods에만 fetch하고 상태를 구분해 표시하게 한다.',
    workplaces: ['AI Studio'],
    links: [L.aiStudio],
    actions: [
      '같은 AI Studio 프로젝트에 프롬프트 07을 입력한다.',
      '연습 모드의 기존 기능이 유지되는지 확인한다.',
      '공공데이터 모드를 선택해 연결 상태 안내를 확인한다.',
      '아직 서버를 배포하지 않은 미리보기에서 실제 조회가 실패하는 것은 구분해 기록한다.',
    ],
    copyBlocks: [P('p07')],
    expected: ['예시 모드는 동작한다.', '실제 모드 오류는 설명과 함께 표시되고 예시 데이터로 몰래 바뀌지 않는다.', '아직 실제 호출이 성공하지 않았다면 연결 완료 체크를 하지 않는다.'],
    checklist: [
      '검색은 버튼 또는 Enter에서만 호출되고 매 글자마다 호출되지 않는다.',
      '처음·조회 중·성공·0건·설정 미완료·조회 실패 상태가 구분된다.',
      '/api가 HTML을 돌려주면 배포 경로 확인 안내가 뜬다.',
      '실패해도 연습 데이터로 자동 전환되지 않는다.',
      '연습 모드 기능이 그대로 유지된다.',
    ],
    troubles: [
      {
        symptom: '미리보기에서 공공데이터 검색이 ‘조회 실패’다.',
        where: 'AI Studio 미리보기(서버 함수 미실행).',
        fix: '정상 범위다. 배포 전에는 실패로 기록하고, 키를 브라우저로 옮기거나 CORS 우회 서버를 쓰지 않는다.',
        recheck: '12단계에서 배포 주소로 확인한다.',
      },
      {
        symptom: '실패하면 자동으로 연습 데이터가 나온다.',
        where: '오류 처리 분기.',
        fix: '오류를 숨기지 말고 표시하게 수정한다. 사용자가 직접 ‘연습 모드로 이동’을 누르는 것만 허용한다.',
        recheck: '실패 상태에서 결과 목록이 비어 있고 오류 설명이 보인다.',
      },
      {
        symptom: '글자를 칠 때마다 요청이 나간다.',
        where: '검색 입력 핸들러.',
        fix: '버튼 또는 Enter에서만 호출하고 중복 클릭을 막게 수정한다.',
        recheck: '네트워크 탭에서 입력 중 요청이 없다.',
      },
    ],
    recoveryPrompts: [
      {
        title: '복구 프롬프트 (상태 구분)',
        body: '공공데이터 검색의 상태를 처음·조회 중·성공·0건·설정 미완료·조회 실패로 분리해 줘. 응답 Content-Type이 JSON이 아니면 배포 경로 확인 안내를 보여 주고, 실패 시 연습 데이터로 자동 전환하지 마.',
      },
    ],
  },

  // ───────────────────────────── 9 ─────────────────────────────
  {
    id: 9,
    title: '배포 전 프로젝트 점검',
    minutes: 10,
    goal: '원본 파일·빌드 설정·키 제외 규칙을 확인한다. 빌드 가능 환경에서는 빌드를 통과한다.',
    workplaces: ['AI Studio'],
    links: [L.aiStudio, L.cfBuild],
    actions: ['프롬프트 08을 입력한다.', '빌드 결과와 미확인 항목을 읽는다.', 'README와 비밀 파일 제외 규칙을 확인한다.'],
    copyBlocks: [
      P('p08'),
      {
        kind: 'settings',
        title: '최상위 파일 체크 목록',
        body: `package.json
index.html
src/
functions/api/foods.ts
functions/api/health.ts
public/_routes.json
README.md
.gitignore  (.env*, .dev.vars*, node_modules, dist 제외)`,
        rows: [
          { key: 'package.json', value: 'build 스크립트가 Vite 화면을 dist에 만든다' },
          { key: 'functions/api/*.ts', value: 'foods.ts, health.ts', note: '최상위' },
          { key: 'public/_routes.json', value: '/api/* 포함' },
          { key: '.gitignore', value: '.env*, .dev.vars*, node_modules, dist', note: '실제 키 없음' },
          { key: '금지', value: 'VITE_로 시작하는 키 변수·번들·README·로그에 키' },
        ],
      },
    ],
    expected: ['AI가 빌드를 실행했으면 성공 로그가, 못 했으면 ‘실행하지 못했다’는 보고가 보인다.', '함수 타입 검사와 프런트 빌드가 구분되어 보고된다.', '실제 인증키 검색·Cloudflare 배포는 ‘외부 확인 필요’로 남아 있다.'],
    checklist: [
      '프롬프트 08을 입력해 점검 보고를 받았다.',
      '최상위 파일 목록이 모두 있다.',
      '.gitignore에 .env*, .dev.vars*, node_modules, dist가 있다.',
      'README에 Cloudflare Pages 설정(build=npm run build, output=dist, Secret=DATA_GO_KR_SERVICE_KEY)이 있다.',
      '빌드 가능 환경에서는 npm run build가 통과했다 (불가능하면 ‘미확인’으로 표시).',
    ],
    troubles: [
      {
        symptom: 'AI가 ‘배포까지 검증했다’고 말한다.',
        where: 'AI의 보고 문장.',
        fix: 'AI Studio는 Cloudflare 배포나 실제 키 검색을 수행하지 않는다. 외부 확인 필요로 남기게 다시 요청한다.',
        recheck: '보고에 외부 확인 필요 항목이 명시된다.',
      },
      {
        symptom: '.env 예시 파일에 값이 들어 있다.',
        where: '.env.example 또는 .dev.vars.example.',
        fix: '예시 파일은 값 없는 설명용만 허용한다. 값을 지우게 한다.',
        recheck: '예시 파일에 키 형태의 문자열이 없다.',
      },
    ],
    recoveryPrompts: [
      {
        title: '복구 프롬프트 (점검 보고 분리)',
        body: '프런트 빌드 성공, 함수 타입 검사, 실제 인증키 검색, Cloudflare 배포를 각각 ‘확인함/실행하지 못함/외부 확인 필요’로 분리해 보고해 줘. 수행하지 않은 것을 검증했다고 말하지 마.',
      },
    ],
  },

  // ───────────────────────────── 10 ─────────────────────────────
  {
    id: 10,
    title: 'GitHub에 원본 저장',
    minutes: 15,
    goal: '저장소 snack-body-journey에 실제 코드와 최신 변경이 들어 있음을 확인한다.',
    workplaces: ['AI Studio', 'GitHub'],
    links: [L.aiStudioBuild, L.github],
    actions: [
      'AI Studio의 Settings에서 GitHub 탭 또는 저장소 연결 기능을 찾는다. 메뉴가 다르면 공식 Build 안내의 GitHub 항목을 연다.',
      '자신의 GitHub 계정으로 연결하고 이번 프로젝트에 필요한 저장소 접근 범위를 확인한다.',
      '새 저장소 이름을 snack-body-journey로 설정한다. 공개·비공개 중 실제 운영 목적에 맞게 선택한다. 비공개여도 키를 코드에 넣지 않는다.',
      'AI Studio의 현재 변경을 저장소에 보내는 Push/Sync 작업을 수행한다. 연결만 했다고 모든 변경이 자동 업로드된다고 가정하지 않는다.',
      'GitHub 저장소를 열어 실제 소스가 있는지 확인한다. package.json과 functions 폴더가 있는 위치, 기본 브랜치, 최신 커밋을 확인한다.',
      '아래 파일 체크리스트를 직접 확인한다: package.json / index.html / src / functions/api/foods.ts / functions/api/health.ts / public/_routes.json / README / .gitignore.',
      '.env나 .dev.vars, 학생 활동 기록, 실제 인증키가 없는지 확인한다. 비밀값을 실수로 올렸다면 현재 파일만 지우는 것으로 끝내지 말고 포털에서 키를 폐기·재발급하는 절차를 따른다.',
      '이 안내 페이지의 ‘내 저장소 주소’ 칸에 주소만 기록한다.',
    ],
    copyBlocks: [
      {
        kind: 'settings',
        title: 'GitHub 저장소 설정값',
        body: `저장소 이름: snack-body-journey
공개 여부: 실제 운영 목적에 맞게 선택 (비공개여도 키는 코드에 넣지 않음)
확인할 파일: package.json / index.html / src / functions/api/foods.ts / functions/api/health.ts / public/_routes.json / README / .gitignore
있으면 안 되는 것: .env, .dev.vars, 학생 활동 기록, 실제 인증키
기본 브랜치 이름(확인해서 적기): `,
        rows: [
          { key: '저장소 이름', value: 'snack-body-journey' },
          { key: '기본 브랜치', value: 'GitHub에서 확인 (보통 main)', note: '11단계 Production branch에 그대로 사용' },
          { key: '반드시 있어야 함', value: 'package.json, index.html, src, functions/api/foods.ts, functions/api/health.ts, public/_routes.json, README, .gitignore' },
          { key: '있으면 안 됨', value: '.env, .dev.vars, 학생 기록, 실제 인증키' },
        ],
      },
    ],
    expected: ['GitHub 저장소 첫 화면에 package.json과 functions 폴더가 보인다.', '최신 커밋 시각이 방금 Push한 시각이다.', '기본 브랜치 이름을 확인했다.'],
    checklist: [
      '저장소 snack-body-journey가 만들어졌다.',
      'Push/Sync 후 GitHub에서 최신 커밋을 확인했다.',
      '파일 체크리스트 8개 항목이 모두 있다.',
      '.env·.dev.vars·실제 인증키가 저장소에 없다.',
      '아래 ‘내 저장소 주소’ 칸에 주소를 기록했다.',
    ],
    troubles: [
      {
        symptom: '연결은 됐는데 GitHub에 파일이 없다.',
        where: 'AI Studio의 Push/Sync 상태.',
        fix: '연결과 업로드는 별개다. Push/Sync를 실행하고 GitHub를 새로고침한다.',
        recheck: '최신 커밋이 보인다.',
      },
      {
        symptom: 'package.json이 한 겹 더 안쪽 폴더에 있다.',
        where: '저장소 파일 트리.',
        fix: '그대로 두어도 되지만 11단계 Cloudflare의 Root directory를 그 폴더로 맞춘다.',
        recheck: '11단계 빌드 설정표의 Root directory를 기록한다.',
      },
      {
        symptom: '실수로 .env나 키를 올렸다.',
        where: '저장소 파일·커밋 기록.',
        fix: '파일만 지우는 것으로 끝내지 않는다. 공공데이터포털에서 키를 폐기·재발급하고 저장소에서 파일을 제거한다.',
        recheck: '새 키는 12단계에서 Cloudflare Secret에만 입력한다.',
      },
    ],
    recoveryPrompts: [],
    widgets: ['zip-fallback', 'repo-input', 'images-link'],
  },

  // ───────────────────────────── 11 ─────────────────────────────
  {
    id: 11,
    title: 'Cloudflare Pages에 첫 배포',
    minutes: 15,
    goal: '공개 주소에서 연습 앱이 열리고 /api/health가 JSON을 반환한다. 이는 공공 API 실제 연결 완료와 다르다.',
    workplaces: ['Cloudflare'],
    links: [L.cfDash, L.cfGit, L.cfBuild, L.cfFunctions],
    actions: [
      'https://dash.cloudflare.com/ 에 로그인한다.',
      'Workers & Pages에서 새 프로젝트 추가 경로를 연다.',
      'Pages의 Git 저장소 연결 경로를 선택한다. 화면이 Workers 생성을 먼저 보여 주면 Pages로 전환하는 항목을 찾는다. 이번 설정은 Pages이므로 Workers 배포용 설정을 혼합하지 않는다.',
      'GitHub를 연결하고 snack-body-journey 저장소에 접근할 수 있도록 설정한다.',
      '저장소를 선택하고 프로젝트 이름을 정한다. 이미 사용 중이면 끝에 짧은 구분자를 붙인다.',
      'Production branch는 GitHub에서 확인한 기본 브랜치를 선택한다. 보통 main이지만 실제 값을 우선한다.',
      '아래 빌드 설정표를 맞춘다.',
      '첫 배포를 시작한다. 이때 키가 없어도 화면 빌드는 성공해야 한다.',
      '빌드 로그에서 의존성 설치·Vite 빌드·Functions 빌드 상태를 확인한다. 오류면 로그의 첫 실제 원인부터 확인한다.',
      '배포 완료 후 제공되는 HTTPS의 pages.dev 주소를 연다. Cloudflare 관리 화면 주소를 학생용 주소로 복사하지 않는다.',
      '연습 모드에서 A 50g+B 100g의 계산과 소화 모형이 동작하는지 확인한다.',
      '공개 주소 뒤에 /api/health를 붙여 연다. 키를 아직 등록하지 않았다면 JSON의 configured:false가 예상 결과다. HTML 첫 화면이나 404면 Functions 경로·배포 누락을 먼저 확인한다.',
    ],
    copyBlocks: [
      {
        kind: 'settings',
        title: 'Cloudflare Pages 빌드 설정표',
        body: `배포 방식: Pages → Git 저장소 연결 (GitHub)
저장소: snack-body-journey
Production branch: GitHub에서 확인한 기본 브랜치 (보통 main)
Framework preset: React (Vite)  — 없으면 아래 명령·폴더를 직접 입력
Build command: npm run build
Build output directory: dist
Root directory: package.json이 저장소 최상위면 기본값(비움). 하위 폴더면 그 상대 경로
환경변수/Secret: 첫 배포에서는 아직 없음 (12단계에서 DATA_GO_KR_SERVICE_KEY 추가)`,
        rows: [
          { key: '배포 방식', value: 'Pages → Git 저장소 연결', note: 'dist 수동 업로드는 Functions 배포 경로가 아님' },
          { key: 'Production branch', value: 'GitHub 기본 브랜치', note: '보통 main, 실제 값 우선' },
          { key: 'Framework preset', value: 'React (Vite)', note: '없으면 직접 입력' },
          { key: 'Build command', value: 'npm run build' },
          { key: 'Build output directory', value: 'dist' },
          { key: 'Root directory', value: '기본값 또는 package.json이 있는 하위 폴더' },
        ],
      },
    ],
    expected: ['빌드 로그에 의존성 설치·Vite 빌드·Functions 빌드가 성공으로 보인다.', 'pages.dev 주소에서 연습 앱이 열리고 A 50g+B 100g 계산이 맞다.', '/api/health가 JSON이며 키 등록 전이므로 configured:false다.'],
    checklist: [
      'Pages 프로젝트가 GitHub 저장소와 연결되었다.',
      'Production branch가 실제 기본 브랜치와 같다.',
      '빌드 설정이 npm run build / dist로 되어 있다.',
      '첫 배포가 성공했고 pages.dev 주소에서 연습 앱이 열린다.',
      '/api/health가 JSON을 반환한다 (configured:false 예상).',
    ],
    troubles: [
      {
        symptom: '빌드 실패.',
        where: 'Root directory, package.json의 build 스크립트, 의존성, 빌드 로그의 첫 오류 메시지.',
        fix: '순서대로 확인한다. Root directory가 package.json 위치와 맞는지 먼저 본다.',
        recheck: 'Retry deployment 후 로그를 다시 읽는다.',
      },
      {
        symptom: '화면은 열리나 /api/health가 404 또는 HTML.',
        where: '최상위 functions 폴더, 최신 커밋, Pages Git 연결 배포 여부, _routes.json.',
        fix: 'dist만 수동 업로드한 상태인지 확인한다. Git 연결 배포에서 functions가 포함된 커밋이 배포되었는지 본다.',
        recheck: '/api/health가 JSON으로 바뀌었는지 확인한다.',
      },
      {
        symptom: 'Workers 생성 화면으로 들어가 설정이 다르다.',
        where: 'Workers & Pages의 생성 흐름.',
        fix: 'Pages로 전환하는 항목을 찾아 Git 연결 Pages 프로젝트로 만든다. Workers용 설정을 섞지 않는다.',
        recheck: '프로젝트 종류가 Pages로 표시된다.',
      },
    ],
    recoveryPrompts: [],
    notes: [
      {
        title: '완료 조건의 의미',
        tone: 'warn',
        body: ['공개 주소에서 연습 앱이 열리고 /api/health가 JSON을 반환하면 이 단계는 완료다. 이는 공공 API 실제 연결 완료와 다르다. 실제 연결은 12단계에서 확인한다.'],
      },
    ],
  },

  // ───────────────────────────── 12 ─────────────────────────────
  {
    id: 12,
    title: '인증키 등록과 실제 공공 API 연결',
    minutes: 20,
    goal: '배포 주소에서 실제 API 검색 결과가 표시되고, 출처·기준량·영양성분이 원자료와 일치한다.',
    workplaces: ['공공데이터포털', 'Cloudflare', '완성 앱'],
    links: [L.cfSecrets, L.dataGoKr, L.cfDash],
    actions: [
      'Cloudflare에서 방금 만든 Pages 프로젝트를 선택한다.',
      'Settings → Variables and Secrets 또는 현재 UI의 동일 역할 설정으로 이동한다.',
      'Production 환경에 비밀값을 추가한다. 이름은 정확히 DATA_GO_KR_SERVICE_KEY로 입력한다.',
      '공공데이터포털의 해당 서비스 신청 상세에서 일반 인증키의 Decoding 값을 복사해 Cloudflare에 직접 붙인다. 앞뒤 공백·줄바꿈이 들어가지 않았는지 확인한다.',
      'Secret/Encrypt 설정을 선택하고 저장한다. 값을 프롬프트·GitHub·공개 활동지에 붙이지 않는다. 키 앞에 VITE_를 붙이지 않는다.',
      'Preview 배포에서도 실제 검색이 필요한 경우에만 Preview 환경에도 별도로 설정한다. Production 설정이 Preview로 자동 복사된다고 가정하지 않는다.',
      '저장 후 재배포한다. Deployments에서 재배포/Retry가 가능하면 사용하고, 없으면 GitHub에서 README의 검증 메모 등 작은 변경을 커밋해 새 배포를 시작한다. 설정 저장만으로 기존 배포가 갱신되었다고 판단하지 않는다.',
      '새 배포가 성공했는지 확인한 뒤 공개 주소의 /api/health를 다시 연다. configured:true인지 확인한다. true는 키의 존재만 확인한다.',
      '공개 앱에서 ‘공공데이터 검색’ 모드를 선택한다.',
      '김밥 또는 우유를 입력하고 검색한다. 실결과의 식품 코드·이름·기준량·업체 또는 출처를 확인한다. 특정 식품이 반드시 몇 건 나온다고 약속하지 않는다.',
      '결과가 있으면 한 항목을 선택하고 기준량을 읽은 뒤 같은 단위의 선택량을 넣는다. 접시에 담고 모형과 기록으로 연결되는지 확인한다.',
      '강사는 처음 성공한 응답의 키 없는 음식 항목 1개와 화면을 대조해 단백질·지방·탄수화물 필드가 맞는지 확인한다. 요청 URL 전체나 헤더의 비밀값은 공유하지 않는다.',
      '오류가 있으면 13단계의 오류표로 진단한다. 가상 자료 화면만 보고 공공 API 연결 완료를 체크하지 않는다.',
    ],
    copyBlocks: [
      {
        kind: 'settings',
        title: 'Cloudflare Secret 설정값',
        body: `위치: Pages 프로젝트 → Settings → Variables and Secrets (또는 동일 역할 메뉴)
환경: Production (Preview는 필요할 때만 별도 추가)
변수 이름: DATA_GO_KR_SERVICE_KEY
값: 공공데이터포털 일반 인증키의 Decoding 값 (앞뒤 공백·줄바꿈 없이)
형식: Secret / Encrypt
금지: VITE_ 접두사, 프롬프트·GitHub·활동지에 값 붙여 넣기
저장 후: 반드시 재배포 (Retry deployment 또는 작은 커밋)
확인: 공개주소/api/health → configured:true (키 존재만 뜻함) → 공공데이터 모드에서 ‘김밥’ 또는 ‘우유’ 검색`,
        rows: [
          { key: '변수 이름', value: 'DATA_GO_KR_SERVICE_KEY', note: '철자 정확히' },
          { key: '값', value: '일반 인증키 Decoding 값', note: '공백·줄바꿈 금지' },
          { key: '환경', value: 'Production', note: 'Preview는 자동 복사되지 않음' },
          { key: '형식', value: 'Secret / Encrypt' },
          { key: '저장 후', value: '재배포 필수' },
          { key: '검증 검색어', value: '김밥 또는 우유', note: '건수는 약속하지 않음' },
        ],
      },
    ],
    expected: ['재배포 후 /api/health가 configured:true다.', '공공데이터 모드에서 검색 결과에 식품 코드·이름·기준량·업체 또는 출처가 보인다.', '선택한 항목이 접시·모형·기록으로 이어진다.'],
    checklist: [
      'DATA_GO_KR_SERVICE_KEY를 Production Secret으로 저장했다.',
      '저장 후 새 배포가 성공했다.',
      '/api/health가 configured:true다.',
      '공공데이터 모드에서 실제 검색 결과가 표시되었다.',
      '결과 1개의 기준량·단백질·지방·탄수화물을 화면과 대조했다.',
    ],
    troubles: [
      {
        symptom: 'configured:false가 계속 나온다.',
        where: 'Secret 이름·Production/Preview 환경·설정 후 새 배포 여부.',
        fix: '이름 철자와 환경을 확인하고 재배포한다. 설정 저장만으로는 기존 배포가 바뀌지 않는다.',
        recheck: '새 배포 성공 후 /api/health를 다시 연다.',
      },
      {
        symptom: 'configured:true지만 인증 실패.',
        where: '해당 서비스 승인·키 형식·기간·공백·중복 인코딩.',
        fix: '키의 존재가 유효성을 보장하지 않는다. Decoding 키인지, 앞뒤 공백이 없는지, 이 서비스에 승인된 키인지 확인한다.',
        recheck: '값을 다시 붙여 넣고 재배포 후 검색한다.',
      },
      {
        symptom: '검색 결과 0건.',
        where: '공백·검색어·현재 페이지·총건수.',
        fix: '다른 일반 식품명을 시도한다. 0건은 오류가 아니다.',
        recheck: '김밥·우유 등으로 다시 검색한다.',
      },
    ],
    recoveryPrompts: [],
    notes: [
      {
        title: '설명 카드: Encoding 키와 Decoding 키',
        tone: 'info',
        body: [
          'Decoding 키를 URLSearchParams에 전달하면 코드가 필요한 인코딩을 한 번 수행한다. Encoding 키를 같은 방식으로 다시 인코딩하면 %25 등이 생기며 실패할 수 있다. 키 형식이 바뀌었거나 포털에서 한 종류만 제공되면 그 서비스의 현행 가이드를 따르고, 문자열을 추측으로 여러 번 디코딩하지 않는다.',
        ],
      },
    ],
  },

  // ───────────────────────────── 13 ─────────────────────────────
  {
    id: 13,
    title: '실제 배포 검증과 문제 해결',
    minutes: 15,
    goal: '공개 앱과 Cloudflare 로그로 배포를 검증하고, 증상 → 확인할 곳 → 수정 → 다시 확인 표로 문제를 해결한다.',
    workplaces: ['완성 앱', 'Cloudflare', 'AI Studio'],
    links: [L.cfDash, L.cfRouting, L.cfSecrets, L.dataGoKr],
    actions: [
      '시크릿 창 또는 로그아웃 상태에서 공개 주소를 연다.',
      '아래 검증 체크리스트 12개를 하나씩 직접 확인하며 체크한다.',
      '문제가 있으면 오류표에서 증상을 찾아 확인할 곳 → 수정 → 다시 확인 순서로 진행한다.',
      'AI에게 고치게 할 때는 프롬프트 09 뒤에 ‘현재 작업 위치/증상/키 없는 오류 메시지’를 붙인다. 아래 개인 메모 칸에 정리해 둔다.',
    ],
    copyBlocks: [P('p09')],
    expected: ['12개 검증 항목이 모두 통과한다.', '브라우저 네트워크 탭의 요청이 자체 /api/foods로만 가고 인증키가 포함되지 않는다.'],
    checklist: [
      '시크릿 창/로그아웃 상태에서 공개 주소가 열린다.',
      '/api/health가 JSON이며 configured:true다.',
      '공공데이터 모드에서 실제 검색이 성공한다.',
      '식품 코드·기준량·원자료와 카드 표시를 대조했다.',
      '실제 조회 0건은 빈 상태로 표시된다. 없는 검색어 테스트 결과도 실제 응답을 기준으로 판단한다.',
      '연결 실패는 오류로 표시되고 예시 데이터로 몰래 바뀌지 않는다.',
      'g/mL와 기준량이 정확하고 결측값이 0이 되지 않는다.',
      '음식 추가·선택량 수정·삭제 후 합계가 맞다.',
      '대표 소화 모형의 효소·기관 설명이 정확하다.',
      '기록 새로고침 복원·삭제·인쇄가 동작한다.',
      '휴대전화와 키보드만으로 핵심 기능을 사용할 수 있다.',
      '브라우저의 요청은 자체 /api/foods로 가고 인증키가 포함되지 않는다.',
    ],
    troubles: [
      {
        symptom: '빌드 실패',
        where: 'Root directory와 package.json의 build 스크립트, 의존성, 첫 오류 메시지.',
        fix: '이 순서로 확인한다. 첫 실제 원인부터 고친다.',
        recheck: '재배포 로그에서 빌드 성공을 확인한다.',
      },
      {
        symptom: '화면은 열리나 /api가 404 또는 HTML',
        where: '최상위 functions 폴더와 최신 커밋, Pages Git 연결 배포 여부, _routes.json.',
        fix: 'dist만 수동 업로드한 상태인지 확인한다. Git 연결 배포로 functions가 포함되게 한다.',
        recheck: '/api/health가 JSON이다.',
      },
      {
        symptom: 'configured:false',
        where: 'Secret 이름·Production/Preview 환경·설정 후 새 배포 여부.',
        fix: '이름과 환경을 바로잡고 재배포한다.',
        recheck: '/api/health가 configured:true다.',
      },
      {
        symptom: 'configured:true지만 인증 실패',
        where: '키의 존재가 유효성을 보장하지 않는다. 해당 서비스 승인·키 형식·기간·공백·중복 인코딩.',
        fix: 'Decoding 키를 공백 없이 다시 넣고, 이 서비스에 승인된 키인지 확인한다.',
        recheck: '재배포 후 공공데이터 모드 검색.',
      },
      {
        symptom: '401/403 또는 공공 API 권한 코드',
        where: '상류 응답이 인증 문제인지 확인한다.',
        fix: '화면 코드나 CORS 설정부터 바꾸지 않는다. 승인 상태와 키를 확인한다.',
        recheck: '검색 결과 상태가 성공으로 바뀐다.',
      },
      {
        symptom: '요청 주소 404',
        where: '현재 서비스의 Info03/Inq03 주소와 명세 변경 여부.',
        fix: '포털 Swagger의 현재 주소와 코드의 상류 주소를 대조한다.',
        recheck: '수정 후 재배포하여 검색.',
      },
      {
        symptom: 'XML/HTML을 JSON으로 읽는 오류',
        where: 'Content-Type과 본문 형식을 분리해 확인한다.',
        fix: 'API 게이트웨이의 XML 오류와 Vite의 HTML 대체 응답은 다른 문제다. 어느 쪽인지 먼저 가른다.',
        recheck: '응답 본문의 첫 줄을 확인한다.',
      },
      {
        symptom: '‘정보 없음’만 나옴',
        where: '실제 응답의 배열 구조와 필드명, 기준량 파싱.',
        fix: '값이 비었다고 가짜 숫자로 채우지 않는다. 구조 차이를 정규화에 반영한다.',
        recheck: '한 항목의 원자료와 카드 표시를 대조한다.',
      },
      {
        symptom: '검색 결과 0건',
        where: '공백·검색어·현재 페이지.',
        fix: '다른 일반 식품명을 시도한다. 총건수와 페이지 크기를 확인한다.',
        recheck: '김밥·우유로 다시 검색한다.',
      },
      {
        symptom: '호출량 초과',
        where: '한도·캐시·검색 버튼 방식·자동 새로고침 여부.',
        fix: '반복 호출을 멈춘다. 무한 자동 재시도하지 않는다.',
        recheck: '잠시 후 한 번만 검색한다.',
      },
      {
        symptom: '시간초과/제공기관 점검',
        where: '상류 응답 시간.',
        fix: '오류를 보존하고 사용자가 예시 모드로 연습을 계속할 수 있게 한다. 실제 연결 검증은 미완료로 남긴다.',
        recheck: '나중에 다시 검색한다.',
      },
      {
        symptom: 'AI Studio 미리보기만 실패',
        where: 'Cloudflare 전용 함수가 그 미리보기에서 실행되는지.',
        fix: '배포 주소에서 확인하며 키를 프런트로 옮기지 않는다.',
        recheck: 'pages.dev 주소의 공공데이터 모드로 확인한다.',
      },
      {
        symptom: '화면 수정이 안 보임',
        where: 'AI Studio 변경을 GitHub에 Push했는지, Cloudflare가 같은 브랜치의 최신 커밋을 배포했는지.',
        fix: 'Push/Sync 후 Deployments에서 새 배포를 확인한다.',
        recheck: '강력 새로고침 후 문구를 확인한다.',
      },
    ],
    recoveryPrompts: [],
    widgets: ['error-memo'],
  },

  // ───────────────────────────── 14 ─────────────────────────────
  {
    id: 14,
    title: '한 문장 수정하고 재배포',
    minutes: 10,
    goal: 'AI Studio → GitHub → Cloudflare → 공개 앱으로 이어지는 수정·재배포 흐름을 직접 돌리고 최종 확인 세 가지를 점검한다.',
    workplaces: ['AI Studio', 'GitHub', 'Cloudflare', '완성 앱'],
    links: [L.aiStudio, L.github, L.cfDash],
    actions: [
      '프롬프트 10을 입력한다.',
      '미리보기에서 문구 수정과 기존 기능을 확인한다.',
      'GitHub에 변경을 Push/Sync한다. ZIP 대체 경로였다면 변경된 원본 파일을 다시 업로드한다.',
      'GitHub의 새 커밋과 Cloudflare의 새 배포가 연결되어 있는지 확인한다.',
      '같은 공개 주소에서 새 문구와 실제 검색을 확인한다.',
      '아래 ‘내 완성 앱 주소’ 칸에 주소를 저장하고 최종 체크 3개를 직접 확인한다.',
    ],
    copyBlocks: [P('p10')],
    expected: ['공개 주소의 제목 아래 안내문이 ‘내가 고른 음식의 영양소는 어디에서 어떻게 소화될까요?’로 바뀌었다.', '검색·API·접시 계산·모형·기록 기능이 그대로 동작한다.'],
    checklist: [
      '프롬프트 10으로 문구를 수정했다.',
      'GitHub에 새 커밋이 올라갔다.',
      'Cloudflare에 새 배포가 성공했다.',
      '공개 주소에서 새 문구와 실제 검색을 확인했다.',
      '아래 ‘내 완성 앱 주소’를 기록했다.',
    ],
    troubles: [
      {
        symptom: 'AI가 Push·배포까지 완료했다고 말한다.',
        where: 'GitHub 커밋 목록과 Cloudflare Deployments.',
        fix: 'AI는 Push나 배포를 대신하지 않는다. 직접 Push/Sync하고 새 배포를 확인한다.',
        recheck: '커밋 시각과 배포 시각이 방금이다.',
      },
      {
        symptom: '배포는 됐는데 문구가 그대로다.',
        where: '브라우저 캐시, 배포된 커밋.',
        fix: '강력 새로고침(Ctrl+Shift+R)을 하고 Deployments의 커밋 해시가 최신인지 본다.',
        recheck: '새 문구가 보인다.',
      },
    ],
    recoveryPrompts: [],
    widgets: ['app-url-input', 'images-link', 'final-flags'],
    notes: [
      {
        title: '최종 확인 세 가지의 뜻',
        tone: 'warn',
        body: [
          '‘앱 화면 완성’, ‘공개 배포 완료’, ‘실제 공공 API 조회 확인’은 서로 다른 일이다. 세 가지를 모두 직접 확인해야 연수의 전체 과정을 마친 것이며, 앞의 두 가지만 보고 실제 API 연결까지 되었다고 말하지 않는다. 선택 확장과 개인 맞춤 문구 수정의 완성도를 학업 성취도로 평가하지 않는다.',
        ],
      },
    ],
  },
]

export const TOTAL_MINUTES = STEPS.reduce((a, s) => a + s.minutes, 0)
