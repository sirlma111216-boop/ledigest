/**
 * 미니 체험의 ‘교사가 검토한 대표 소화 모형’ 설명 규칙.
 * 영양소 g 수치와 무관하게 동작한다. 진행 시간은 학습 순서일 뿐 실제 소화 시간이 아니다.
 * 교사는 이 파일의 문장만 고쳐 설명을 바꿀 수 있다.
 */
export type OrganId = 'mouth' | 'esophagus' | 'stomach' | 'small' | 'large' | 'liver' | 'gallbladder' | 'pancreas'

/** image: 이미지 자료 목록(images.json)의 id. 파일이 없으면 화면이 대체 그림을 쓴다. */
export const ORGANS: Record<OrganId, { name: string; kind: 'path' | 'helper'; desc: string; image: string }> = {
  mouth: { name: '입', kind: 'path', desc: '음식을 씹어 잘게 부수고 침과 섞는다. 침샘에서 나온 아밀레이스가 녹말 분해를 시작한다.', image: 'organ-mouth' },
  esophagus: { name: '식도', kind: 'path', desc: '음식물을 위로 이동시킨다. 소화 효소가 분비되지 않는다.', image: 'organ-esophagus' },
  stomach: { name: '위', kind: 'path', desc: '위액과 섞는다. 위액의 펩신이 단백질을 더 작은 조각으로 분해하기 시작한다.', image: 'organ-stomach' },
  small: { name: '소장', kind: 'path', desc: '이자액·담즙·소장의 효소가 작용해 소화가 마무리되고, 대부분의 영양소가 흡수된다.', image: 'organ-small-intestine' },
  large: { name: '대장', kind: 'path', desc: '남은 내용물에서 수분 흡수 등이 일어난다. 수분은 소장에서도 많이 흡수된다.', image: 'organ-large-intestine' },
  liver: { name: '간', kind: 'helper', desc: '담즙을 만든다. 음식물이 간 속을 지나가지는 않는다.', image: 'organ-liver' },
  gallbladder: { name: '쓸개', kind: 'helper', desc: '간에서 만든 담즙을 저장·농축했다가 소장으로 내보낸다. 담즙은 효소가 아니다.', image: 'organ-gallbladder' },
  pancreas: { name: '이자', kind: 'helper', desc: '아밀레이스·트립신·라이페이스 등이 들어 있는 이자액을 만들어 소장으로 내보낸다. 이 효소들은 소장에서 작용한다.', image: 'organ-pancreas' },
}

export type ModelId = 'starch' | 'protein' | 'fat'

export interface ModelStep {
  organ: OrganId
  helpers?: OrganId[]
  title: string
  text: string
  /** 분자 모형 그림의 id (images.json). 없으면 그림을 생략한다. */
  image?: string
}

export const MODELS: Record<ModelId, { name: string; nutrient: string; caveat: string; steps: ModelStep[] }> = {
  starch: {
    name: '녹말 대표 모형',
    nutrient: '탄수화물',
    caveat: '소화 원리를 배우는 녹말 대표 모형입니다. 실제 탄수화물 전체가 녹말이라는 뜻은 아닙니다. 탄수화물에는 당류·식이섬유 등도 포함되며, API 값만으로 녹말량을 알 수 없습니다.',
    steps: [
      { organ: 'mouth', title: '입', text: '침 속 아밀레이스가 녹말의 일부를 더 작은 당으로 분해하기 시작한다. 입에서 모든 녹말이 포도당이 되는 것은 아니다.', image: 'mol-starch-partial' },
      { organ: 'esophagus', title: '식도', text: '음식물이 위로 이동한다. 이 모형에서 식도는 이동 통로다.', image: 'mol-starch-partial' },
      { organ: 'stomach', title: '위', text: '위에서는 녹말을 분해하는 효소가 주로 작용하지 않는다. 음식물은 위액과 섞여 소장으로 이동한다.', image: 'mol-starch-partial' },
      { organ: 'small', helpers: ['pancreas'], title: '소장 — 소화', text: '이자에서 만들어져 소장으로 나온 아밀레이스가 녹말 분해를 이어 가고, 소장의 효소가 작용해 최종적으로 포도당 같은 단당류가 된다.', image: 'mol-glucose' },
      { organ: 'small', title: '소장 — 흡수', text: '포도당 등 작은 물질이 소장 안쪽 벽(융털)에서 흡수된다. 소화(분해)와 흡수(몸 안으로 들어감)는 다른 과정이다.', image: 'villi-absorption' },
      { organ: 'large', title: '대장', text: '남은 내용물에서 수분 흡수 등이 일어난다. 기본 모형은 소장 흡수까지를 중심으로 다룬다.', image: 'organ-large-intestine' },
    ],
  },
  protein: {
    name: '단백질 대표 모형',
    nutrient: '단백질',
    caveat: '여러 효소가 단계적으로 작용하는 대표 과정입니다. 펩신 하나가 모든 단백질을 곧바로 아미노산으로 만들지 않습니다.',
    steps: [
      { organ: 'mouth', title: '입', text: '씹어서 잘게 부순다. 단백질 분해 효소는 입에서 거의 작용하지 않는다.', image: 'mol-protein' },
      { organ: 'esophagus', title: '식도', text: '음식물이 위로 이동한다.', image: 'mol-protein' },
      { organ: 'stomach', title: '위', text: '위액의 펩신이 단백질을 더 작은 조각으로 분해하기 시작한다. 여기서 소화가 끝나지 않는다.', image: 'mol-peptides' },
      { organ: 'small', helpers: ['pancreas'], title: '소장 — 소화', text: '이자에서 만들어져 소장으로 나온 트립신 등과 소장의 효소가 작용해 최종적으로 아미노산이 된다.', image: 'mol-amino-acid' },
      { organ: 'small', title: '소장 — 흡수', text: '아미노산이 소장에서 흡수된다.', image: 'villi-absorption' },
      { organ: 'large', title: '대장', text: '남은 내용물에서 수분 흡수 등이 일어난다.', image: 'organ-large-intestine' },
    ],
  },
  fat: {
    name: '지방 대표 모형',
    nutrient: '지방',
    caveat: '담즙은 효소가 아닙니다. 담즙은 지방을 작은 방울로 나누는 유화를 돕고, 분해는 라이페이스 등이 맡습니다.',
    steps: [
      { organ: 'mouth', title: '입', text: '씹어서 잘게 부순다. 이 모형에서는 입의 지방 소화를 다루지 않는다.', image: 'mol-fat' },
      { organ: 'esophagus', title: '식도', text: '음식물이 위로 이동한다.', image: 'mol-fat' },
      { organ: 'stomach', title: '위', text: '음식물이 위액과 섞여 소장으로 이동한다. 이 모형에서는 위의 지방 소화를 다루지 않는다.', image: 'mol-fat' },
      { organ: 'small', helpers: ['liver', 'gallbladder'], title: '소장 — 담즙의 유화', text: '간에서 만들어지고 쓸개에 저장·농축된 담즙이 소장으로 나와 지방을 작은 방울로 나누는 유화를 돕는다. 담즙은 효소가 아니다.', image: 'bile-emulsification' },
      { organ: 'small', helpers: ['pancreas'], title: '소장 — 라이페이스', text: '이자에서 만들어진 라이페이스가 소장에서 작용해 지방을 지방산과 모노글리세리드 등으로 분해한다.', image: 'mol-fat-products' },
      { organ: 'small', title: '소장 — 흡수', text: '분해 산물이 소장에서 흡수된다. 기본 모형은 소장 흡수까지 다루며 림프·혈액의 상세 경로는 생략한다.', image: 'villi-absorption' },
    ],
  },
}

/** 효소·담즙 연결 활동: ‘작용하는 곳’을 고른다. 만들어지는 곳과 구분해 피드백한다. */
export interface Agent {
  id: string
  name: string
  isEnzyme: boolean
  madeIn: string
  actsIn: OrganId[]
  feedback: string
  image: string
}

export const AGENTS: Agent[] = [
  { id: 'amylase', name: '아밀레이스', isEnzyme: true, madeIn: '침샘, 이자', actsIn: ['mouth', 'small'], feedback: '아밀레이스는 침샘과 이자에서 만들어져 입과 소장에서 녹말 분해에 관여한다.', image: 'enzyme-amylase' },
  { id: 'pepsin', name: '펩신', isEnzyme: true, madeIn: '위', actsIn: ['stomach'], feedback: '펩신은 위에서 단백질을 더 작은 조각으로 분해하기 시작한다. 펩신만으로 아미노산까지 끝나지 않는다.', image: 'enzyme-pepsin' },
  { id: 'trypsin', name: '트립신', isEnzyme: true, madeIn: '이자', actsIn: ['small'], feedback: '트립신은 이자에서 만들어지지만 작용하는 곳은 소장이다.', image: 'enzyme-trypsin' },
  { id: 'lipase', name: '라이페이스', isEnzyme: true, madeIn: '이자', actsIn: ['small'], feedback: '라이페이스는 이자에서 만들어져 소장에서 지방을 지방산과 모노글리세리드 등으로 분해한다.', image: 'enzyme-lipase' },
  { id: 'bile', name: '담즙', isEnzyme: false, madeIn: '간 (쓸개에 저장·농축)', actsIn: ['small'], feedback: '담즙은 효소가 아니다. 간에서 만들어지고 쓸개에 저장되었다가 소장에서 지방의 유화를 돕는다.', image: 'bile-icon' },
]

export const PICKABLE_ORGANS: OrganId[] = ['mouth', 'stomach', 'small', 'large', 'liver', 'gallbladder', 'pancreas']
