# 이미지 자료 목록과 생성 프롬프트

「내가 먹은 간식의 몸속 여행」 연수 안내 사이트와 참가자 학생용 앱이 함께 쓰는 그림 46장.
필수 15 · 권장 25 · 선택 6.

이 문서는 `src/content/images.json` 에서 자동으로 만든다. 내용을 고칠 때는 JSON 을 고치고 `npm run images:doc` 를 다시 실행한다.
만든 그림 파일은 `public/images/` 에 목록의 파일 이름 그대로 넣는다. 파일이 없으면 사이트와 앱은 기본 그림(SVG)으로 대체한다.

## 만드는 순서

1. 아래 「공통 스타일 문단」을 복사해 두고, 그림마다 `공통 스타일 문단 + 개별 프롬프트` 순서로 생성기에 넣는다. 부정 프롬프트 칸이 있으면 「부정 프롬프트」를 넣는다.
2. 목록의 크기·비율로 생성한다. 더 크게 만들어 줄이는 것은 괜찮다.
3. 글자·숫자·라벨이 하나라도 들어가면 다시 만든다. 글자는 앱이 한국어로 따로 얹는다.
4. 배경이 투명이어야 하는 그림은 투명 PNG로 저장한다. 생성기가 투명을 지원하지 않으면 순백 배경으로 만든 뒤 배경 제거 도구로 지운다.
5. 해부 그림은 「과학 확인 항목」을 하나씩 대조한다.
6. 파일 이름을 목록과 똑같이 저장해 `public/images/` 에 넣는다.

## 공통 스타일 문단 (모든 프롬프트 앞에 붙인다)

```
Flat vector-style educational illustration for a Korean middle-school science app. Clean geometric shapes with smooth, even outlines in dark navy (#1B2A4A). Limited palette only: cream (#FBF6EC), teal (#0F8B8D), orange (#E07A1F), soft peach (#F4D7C4), light blue-gray (#E7ECF4), white. Matte, even lighting; at most very subtle flat shading; no drop shadows, no 3D render, no photorealism, no paper texture. Subject centered with generous empty margins (about 10% on every side). Isolated on a fully transparent background (PNG with alpha). Absolutely no text, letters, numbers, labels, arrows with words, watermarks, signatures or logos anywhere in the image.
```

## 부정 프롬프트 (지원하는 생성기에서)

```
text, letters, numbers, typography, labels, caption, watermark, signature, logo, brand name, packaging text, photo, photorealistic, 3D render, clay, glossy, strong gradient, drop shadow, background scene, frame, border, blurry, low resolution, extra limbs, extra organs, duplicated organs, anatomical text labels, cartoon face on organs, gore, blood
```

## 지킬 규칙

- 글자·숫자·라벨은 절대 넣지 않는다. 글자는 앱이 한국어로 따로 얹는다. 생성기가 글자를 넣으면 다시 생성한다.
- 배경은 투명 PNG로 받는다. 생성기가 투명을 지원하지 않으면 순백(#FFFFFF) 배경으로 만든 뒤 배경 제거 도구로 지운다.
- 파일 이름은 목록의 이름과 대소문자까지 똑같이 저장한다. 앱 코드가 이 이름으로 찾는다.
- 크기는 목록의 픽셀 수 이상으로 만든다. 큰 것을 줄이는 것은 쉽지만 작은 것을 키우면 흐려진다.
- 해부 그림은 제작 후 ‘과학 확인 항목’을 하나씩 대조한다. 보기 좋아도 틀린 그림은 쓰지 않는다.
- 실제 상품·브랜드·캐릭터가 떠오르는 모양은 피한다. 중립적인 음식 유형 아이콘이어야 한다.
- 한 묶음 안에서 선 굵기·색·여백이 같아 보이도록 같은 스타일 문단을 모든 프롬프트 앞에 붙인다.

## 한눈에 보는 목록

| # | 파일 이름 | 제목 | 등급 | 쓰는 곳 | 크기 | 배경 | 준비 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `hero-snack-journey.png` | 키비주얼: 간식의 몸속 여행 | 필수 | 안내·앱 | 2048×1152 | cream (#FBF6EC) 단색 | 없음 |
| 2 | `app-icon.png` | 앱 아이콘 | 필수 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 3 | `food-snack.png` | 음식 유형: 과자·간식 | 필수 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 4 | `food-drink.png` | 음식 유형: 음료 | 필수 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 5 | `food-unknown.png` | 음식 유형: 분류 안 됨 | 필수 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 6 | `food-rice.png` | 음식 유형: 밥·김밥류 | 권장 | 앱 | 1024×1024 | 투명 | 없음 |
| 7 | `food-bread.png` | 음식 유형: 빵·곡류 | 권장 | 앱 | 1024×1024 | 투명 | 없음 |
| 8 | `food-dairy.png` | 음식 유형: 우유·유제품 | 권장 | 앱 | 1024×1024 | 투명 | 없음 |
| 9 | `food-fruit.png` | 음식 유형: 과일 | 권장 | 앱 | 1024×1024 | 투명 | 없음 |
| 10 | `food-protein.png` | 음식 유형: 고기·달걀·콩류 | 권장 | 앱 | 1024×1024 | 투명 | 없음 |
| 11 | `food-noodle.png` | 음식 유형: 면류 | 선택 | 앱 | 1024×1024 | 투명 | 없음 |
| 12 | `food-vegetable.png` | 음식 유형: 채소 | 선택 | 앱 | 1024×1024 | 투명 | 없음 |
| 13 | `demo-food-a.png` | 연습용 간식 A 카드 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 14 | `demo-food-b.png` | 연습용 간식 B 카드 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 15 | `demo-food-c.png` | 연습용 음료 C 카드 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 16 | `demo-food-d.png` | 연습용 결측 자료 D 카드 | 선택 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 17 | `demo-food-e.png` | 연습용 기준량 미상 E 카드 | 선택 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 18 | `digestive-system-full.png` | 소화계 전체 모식도 (라벨 없음) | 필수 | 안내·앱 | 1600×2200 | 투명 | 없음 |
| 19 | `organ-mouth.png` | 기관 확대: 입 (침샘 포함) | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 20 | `organ-esophagus.png` | 기관 확대: 식도 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 21 | `organ-stomach.png` | 기관 확대: 위 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 22 | `organ-small-intestine.png` | 기관 확대: 소장 (융털 포함) | 필수 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 23 | `organ-large-intestine.png` | 기관 확대: 대장 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 24 | `organ-liver.png` | 기관 확대: 간 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 25 | `organ-gallbladder.png` | 기관 확대: 쓸개 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 26 | `organ-pancreas.png` | 기관 확대: 이자 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 27 | `villi-absorption.png` | 소장 흡수 장면 (융털 단면) | 필수 | 안내·앱 | 1600×1000 | 투명 | 없음 |
| 28 | `mol-starch.png` | 분자 모형: 녹말 (포도당 사슬) | 필수 | 안내·앱 | 1600×800 | 투명 | 없음 |
| 29 | `mol-glucose.png` | 분자 모형: 포도당 (단당류 하나) | 필수 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 30 | `mol-starch-partial.png` | 분자 모형: 녹말이 일부 끊어진 상태 (입·소장 중간) | 권장 | 안내·앱 | 1600×800 | 투명 | 없음 |
| 31 | `mol-protein.png` | 분자 모형: 단백질 (아미노산 사슬) | 필수 | 안내·앱 | 1600×800 | 투명 | 없음 |
| 32 | `mol-peptides.png` | 분자 모형: 단백질이 토막 난 상태 (위, 펩신 이후) | 권장 | 안내·앱 | 1600×800 | 투명 | 없음 |
| 33 | `mol-amino-acid.png` | 분자 모형: 아미노산 낱개 | 필수 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 34 | `mol-fat.png` | 분자 모형: 지방 (글리세롤 + 지방산 셋) | 필수 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 35 | `mol-fat-products.png` | 분자 모형: 지방산과 모노글리세리드 등 (라이페이스 이후) | 필수 | 안내·앱 | 1600×800 | 투명 | 없음 |
| 36 | `bile-emulsification.png` | 담즙의 유화 (큰 방울 → 작은 방울들) | 필수 | 안내·앱 | 1600×800 | 투명 | 없음 |
| 37 | `enzyme-amylase.png` | 효소 아이콘: 아밀레이스 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 38 | `enzyme-pepsin.png` | 효소 아이콘: 펩신 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 39 | `enzyme-trypsin.png` | 효소 아이콘: 트립신 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 40 | `enzyme-lipase.png` | 효소 아이콘: 라이페이스 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 41 | `bile-icon.png` | 담즙 아이콘 (효소 아님) | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 42 | `state-empty-plate.png` | 상태: 빈 접시 | 권장 | 안내·앱 | 1024×1024 | 투명 | 없음 |
| 43 | `state-no-results.png` | 상태: 검색 결과 0건 | 권장 | 앱 | 1024×1024 | 투명 | 없음 |
| 44 | `state-connection-error.png` | 상태: 연결 실패 | 권장 | 앱 | 1024×1024 | 투명 | 없음 |
| 45 | `state-key-missing.png` | 상태: 인증키 미설정 | 선택 | 앱 | 1024×1024 | 투명 | 없음 |
| 46 | `worksheet-header.png` | A4 활동지 머리띠 | 선택 | 앱 | 2480×420 | 흰색 단색 | 없음 |

## A. 키비주얼·아이콘

안내 사이트와 학생용 앱이 함께 쓰는 대표 그림.

### 키비주얼: 간식의 몸속 여행

- 파일 이름: `hero-snack-journey.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 2048×1152 (16:9) · 배경: cream (#FBF6EC) 단색
- 설명: 제목 아래 배너. 왼쪽에 접시 위의 간식 몇 가지, 오른쪽에 사람 상반신 실루엣과 그 안에 빛나는 소화관 경로.
- 과학 확인 항목:
  - [ ] 소화관이 하나의 연속된 관으로 보인다.
  - [ ] 음식 경로 점선이 입으로 향한다. 간이나 다른 기관으로 향하지 않는다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Wide banner illustration. On the left, a round plate holding three simple neutral snacks: a plain biscuit, a small carton of milk without any print, and a round rice ball. On the right, a soft translucent silhouette of a child's upper body from the front, and inside it a simplified glowing digestive tract drawn as one continuous teal tube: mouth, esophagus, stomach, coiled small intestine, large intestine around the outside. A dotted orange path flows from the plate toward the mouth to suggest a journey. Liver, gallbladder and pancreas are not shown in this banner. Calm, friendly, educational mood. Solid cream background (#FBF6EC), not transparent. No text.
```

### 앱 아이콘

- 파일 이름: `app-icon.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 둥근 사각형 안에 간식 한 조각과 위·소장을 닮은 곡선 관 모양.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
App icon. A rounded square tile in cream (#FBF6EC) with a navy outline. Inside, a single plain biscuit at the top-left and a simple teal curved tube below it shaped like a stomach flowing into a short coil, suggesting the digestive journey. One small orange dot on the tube as an accent. Bold, simple, readable at 48 pixels. No text.
```

## B. 음식 유형 아이콘

실제 API는 식품 사진을 주지 않으므로 음식 유형별 중립 아이콘을 쓴다. 검색 결과 카드·접시 항목에 들어간다.

### 음식 유형: 과자·간식

- 파일 이름: `food-snack.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 포장 글자가 없는 중립적인 과자 봉지와 과자 두 조각.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of a generic snack: a small pillow-shaped snack bag in soft peach with a plain teal band and no print, next to two round plain biscuits. Neutral, not resembling any real brand. No text.
```

### 음식 유형: 음료

- 파일 이름: `food-drink.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 눈금이나 글자가 없는 투명한 컵에 담긴 음료와 빨대.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of a generic drink: a simple tall glass with a light blue-gray outline containing an orange-tinted liquid, with a teal straw. No markings on the glass. No text.
```

### 음식 유형: 분류 안 됨

- 파일 이름: `food-unknown.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 유형을 알 수 없는 음식을 뜻하는 중립 접시 아이콘. 물음표 글자 대신 빈 접시와 덮개.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of an unknown food item: a plain round plate seen slightly from above with a simple dome cloche lid in light blue-gray covering it, so the food inside is not visible. Neutral and calm. No question mark, no text.
```

### 음식 유형: 밥·김밥류

- 파일 이름: `food-rice.png`
- 등급: 권장 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 흰 밥 한 공기와 김밥 두 조각.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of rice foods: a small bowl of white rice next to two slices of gimbap shown as circles with a dark seaweed ring, white rice and a few colored dots of filling (orange, teal, peach). Simple and neutral. No text.
```

### 음식 유형: 빵·곡류

- 파일 이름: `food-bread.png`
- 등급: 권장 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 식빵 한 조각과 둥근 빵.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of bread: one slice of toast with a rounded top and a small round bun beside it, in soft peach and warm cream tones with navy outlines. No text.
```

### 음식 유형: 우유·유제품

- 파일 이름: `food-dairy.png`
- 등급: 권장 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 글자 없는 우유팩과 치즈 조각.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of dairy: a plain white milk carton with a teal top and no print, next to a small wedge of cheese in light orange with two round holes. No text.
```

### 음식 유형: 과일

- 파일 이름: `food-fruit.png`
- 등급: 권장 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 사과 하나와 바나나 하나.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of fruit: one round orange-red apple with a small leaf and one yellow-orange banana beside it. Simple shapes, navy outlines. No text.
```

### 음식 유형: 고기·달걀·콩류

- 파일 이름: `food-protein.png`
- 등급: 권장 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 삶은 달걀 반쪽과 두부 한 모.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of protein-rich foods: a boiled egg cut in half showing a round orange yolk, next to a white cube of tofu. Soft, clean shapes. No text.
```

### 음식 유형: 면류

- 파일 이름: `food-noodle.png`
- 등급: 선택 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 국물 그릇에 담긴 면과 젓가락.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of noodles: a round bowl with wavy cream noodles rising slightly above the rim and a pair of simple chopsticks resting across. No text.
```

### 음식 유형: 채소

- 파일 이름: `food-vegetable.png`
- 등급: 선택 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 당근과 브로콜리.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of vegetables: one orange carrot with a small green top and one teal-green broccoli floret. Flat, friendly shapes. No text.
```

## C. 연습용 가상 음식 카드

연습용 간식 A~E 카드용. 실제 상품이 아닌 가상 자료임을 그림에서도 드러낸다(포장 글자 없음).

### 연습용 간식 A 카드

- 파일 이름: `demo-food-a.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 탄수화물이 많은 가상 간식. 곡물 바 모양에 포장 글자 없음, 모서리에 작은 ‘연습용’ 느낌의 점선 태그(글자 없음).

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Illustration of a fictional practice snack for a classroom: a plain cereal bar with visible oat flakes in cream and peach, partly wrapped in a simple orange wrapper with no print, and a small blank dotted-outline tag attached by a short string to suggest a sample item. No real brand resemblance. No text.
```

### 연습용 간식 B 카드

- 파일 이름: `demo-food-b.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 단백질이 많은 가상 간식. 치즈 큐브와 삶은 달걀 조각이 담긴 작은 용기.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Illustration of a fictional practice snack: a small open container holding two light-orange cheese cubes and two slices of boiled egg with round yolks, with a blank dotted-outline tag attached to suggest a sample item. No print, no text.
```

### 연습용 음료 C 카드

- 파일 이름: `demo-food-c.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: mL 기준 가상 음료. 눈금 없는 유리잔에 담긴 연한 음료와 점선 태그.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Illustration of a fictional practice beverage: a simple glass with no markings containing a pale orange drink, a teal straw, and a blank dotted-outline tag hanging from the rim to suggest a sample item. No text.
```

### 연습용 결측 자료 D 카드

- 파일 이름: `demo-food-d.png`
- 등급: 선택 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 자료 일부가 비어 있음을 뜻하는 그림. 글자 없는 영양 정보표 모양에서 몇 줄이 비어 있다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Illustration representing missing data: a small white card shaped like a nutrition panel, drawn only with horizontal blank bars instead of text. Two of the bars are filled solid teal, the other three are empty dotted outlines, clearly showing gaps. A plain plate with a single biscuit sits behind the card. No text, no numbers, no question marks.
```

### 연습용 기준량 미상 E 카드

- 파일 이름: `demo-food-e.png`
- 등급: 선택 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 기준량을 읽을 수 없음을 뜻하는 그림. 눈금이 지워진 계량컵.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Illustration representing an unknown serving basis: a simple measuring cup whose measurement marks are missing (smooth blank side), containing a small amount of cream-colored granola. A faint dotted outline where the marks would be hints that they are absent. No text, no numbers.
```

## D. 소화계

전체 모식도 1장과 기관별 확대 그림. 통과 경로(입·식도·위·소장·대장)와 돕는 기관(간·쓸개·이자)의 구분이 핵심.

### 소화계 전체 모식도 (라벨 없음)

- 파일 이름: `digestive-system-full.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1600×2200 (8:11 세로) · 배경: 투명
- 설명: 정면에서 본 사람 상반신 윤곽과 소화계. 입·식도·위·소장·대장은 연결된 실제 경로, 간·쓸개·이자는 경로 밖 보조 기관. 앱이 한국어 라벨을 얹으므로 그림에는 글자 없음.
- 과학 확인 항목:
  - [ ] 입→식도→위→소장→대장이 끊기지 않고 이어진다.
  - [ ] 간·쓸개·이자는 관 밖에 있고, 음식 관이 그 속을 지나가지 않는다.
  - [ ] 위는 그림에서 보는 사람 기준 오른쪽(몸의 왼쪽)에, 간은 왼쪽(몸의 오른쪽)에 있다.
  - [ ] 쓸개관·이자관이 소장 첫 부분(십이지장)으로 이어진다.
  - [ ] 대장이 소장을 바깥에서 둘러싼다.
  - [ ] 기관 수가 맞고 중복된 기관이 없다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Front-view educational diagram of the human digestive system inside a soft, simplified torso outline (head to hips) drawn in very light peach. The food pathway is one continuous connected tube in warm peach with navy outline: mouth with a small tongue, a straight esophagus going down slightly left of center, a J-shaped stomach on the viewer's right side of the image (body's left), a tightly coiled small intestine filling the lower middle, and the large intestine forming an upside-down U frame around the small intestine ending at the rectum. The accessory organs are drawn in light blue-gray so they look different from the pathway: a large wedge-shaped liver on the viewer's left side (body's right) above the intestines and overlapping the top of the stomach area, a small pear-shaped gallbladder tucked under the liver, and a long tapering pancreas lying horizontally behind the stomach's lower edge. Thin teal ducts connect gallbladder and pancreas to the first part of the small intestine. Proportions roughly like a textbook figure, clean and uncluttered. Transparent background. No text or labels.
```

### 기관 확대: 소장 (융털 포함)

- 파일 이름: `organ-small-intestine.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 소장 한 토막과 안쪽 벽의 융털을 확대한 원형 삽화.
- 과학 확인 항목:
  - [ ] 융털이 벽 안쪽(관 속)으로 돋아 있다.
  - [ ] 융털 안에 가는 혈관 선이 보인다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
A short coiled segment of small intestine in peach with navy outline, and next to it a large circular magnified inset showing the inner wall lined with many finger-like villi in soft peach, each with a thin teal vessel inside. Connect the inset to the tube with a thin outline. Clean, diagrammatic. No text.
```

### 소장 흡수 장면 (융털 단면)

- 파일 이름: `villi-absorption.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1600×1000 (16:10) · 배경: 투명
- 설명: 소장 벽 융털 단면. 작은 영양소 입자들이 융털 표면을 통과해 안쪽 혈관으로 들어가는 장면. 소화(분해)와 흡수(들어감)가 다름을 보여 준다.
- 과학 확인 항목:
  - [ ] 입자가 융털 표면을 통과해 안쪽 혈관으로 들어간다.
  - [ ] 큰 사슬 분자(녹말·단백질 통째)는 들어가지 않는다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Cross-section of the small intestine wall showing four to five finger-like villi in soft peach with navy outlines, each containing a thin teal capillary and a slightly thicker light-blue central vessel. Above the villi, in the intestinal space, many tiny simple particles: small orange circles (single sugar units) and small teal ovals (amino acid units). Several of these particles are shown halfway through the villus surface and a few are already inside the capillaries, suggesting absorption. Keep particles very small compared to villi. No arrows, no text.
```

### 기관 확대: 입 (침샘 포함)

- 파일 이름: `organ-mouth.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 옆에서 본 입 안 단면. 혀, 치아, 침샘 세 쌍 위치, 침 방울.
- 과학 확인 항목:
  - [ ] 침샘이 입 밖 조직에 있고 관으로 입 안과 이어진다.
  - [ ] 효소 모양이나 글자는 없다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Side-view cross-section of a human mouth for a science diagram: simple teeth along upper and lower jaws, a tongue in peach, and three small rounded salivary glands in light blue-gray placed near the ear region, under the tongue and under the jaw, each with a thin duct ending in a tiny teal droplet inside the mouth. Clean and minimal. No text.
```

### 기관 확대: 식도

- 파일 이름: `organ-esophagus.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 세로로 긴 근육 관. 덩어리 하나가 내려가며 관이 물결치듯 조이는 모습(연동 운동).
- 과학 확인 항목:
  - [ ] 소화 효소나 샘은 그리지 않는다(식도는 이동 통로).
  - [ ] 조임이 덩어리 위쪽에 있다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Vertical section of the esophagus as a long muscular tube in peach with navy outline. A single rounded food bolus in cream is partway down; above it the tube is gently squeezed inward and below it slightly relaxed, showing a wave-like contraction. Muscle layer indicated by subtle horizontal bands. No arrows, no text.
```

### 기관 확대: 위

- 파일 이름: `organ-stomach.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: J자 모양 위의 단면. 안쪽 주름과 위액 방울, 음식 덩어리.
- 과학 확인 항목:
  - [ ] 입구(위쪽)와 출구(아래 오른쪽)가 다르다.
  - [ ] 위벽 주름이 보인다.
  - [ ] 음식이 에너지로 바뀌는 듯한 연출(번개·불꽃)은 없다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Cross-section of a J-shaped human stomach in peach with navy outline, entrance from the esophagus at the top and exit toward the small intestine at the lower right. The inner wall shows soft folds (rugae) as wavy lines. Inside, a few small cream food pieces float in a pale teal fluid, with a few tiny droplets near the wall suggesting gastric juice. No text.
```

### 기관 확대: 대장

- 파일 이름: `organ-large-intestine.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 거꾸로 된 U자 모양 대장. 벽을 통해 작은 물방울들이 밖으로 빠져나가는 모습(수분 흡수).
- 과학 확인 항목:
  - [ ] 물방울이 관 안에서 밖으로 나간다.
  - [ ] 소장과 헷갈리지 않게 관이 넓고 주름이 굵다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
The large intestine drawn as an upside-down U-shaped wide tube with gentle segmented bulges, in peach with navy outline, ending at the lower center. Along one side, a few tiny light-blue water droplets pass from inside the tube through the wall to the outside, suggesting water absorption. No text.
```

### 기관 확대: 간

- 파일 이름: `organ-liver.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 쐐기 모양 간. 아래에서 담즙 방울이 관을 타고 나오는 모습.
- 과학 확인 항목:
  - [ ] 담즙이 간에서 나온다(만드는 곳).
  - [ ] 음식 덩어리는 간 속에 없다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
A large wedge-shaped human liver in light blue-gray with navy outline, two lobes with the right lobe bigger, smooth surface. From its underside a thin teal duct leads downward carrying two small teal droplets, suggesting bile being produced and sent out. No text.
```

### 기관 확대: 쓸개

- 파일 이름: `organ-gallbladder.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 작은 서양배 모양 주머니. 안에 진한 담즙이 고여 있고, 관이 아래로 이어진다.
- 과학 확인 항목:
  - [ ] 담즙이 고여 있는 모습(저장·농축).
  - [ ] 효소를 떠올리게 하는 가위 모양은 없다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
A small pear-shaped gallbladder in light blue-gray with navy outline, filled with darker teal fluid to show stored and concentrated bile, with a thin duct leaving from its narrow end and merging into another thin duct that continues downward. No text.
```

### 기관 확대: 이자

- 파일 이름: `organ-pancreas.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 가로로 긴 이자. 머리 쪽에서 관이 나와 소장으로 이어지고 관 속에 작은 입자들이 흐른다.
- 과학 확인 항목:
  - [ ] 관이 소장으로 이어진다(만드는 곳과 작용하는 곳이 다름).
  - [ ] 이자 속으로 음식이 지나가지 않는다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
A long, slightly tapered pancreas lying horizontally in light blue-gray with a soft lobulated texture and navy outline. A thin teal duct runs along its length and exits from the thicker end into a short section of small intestine drawn in peach on the left. Inside the duct, several tiny orange dots flow toward the intestine, suggesting pancreatic juice with enzymes being sent to the small intestine. No text.
```

## E. 영양소·분자 모형

대표 소화 모형의 단계 카드에 들어간다. 구슬 사슬처럼 단순화한 모형이며 화학 구조식이 아니다.

### 분자 모형: 녹말 (포도당 사슬)

- 파일 이름: `mol-starch.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1600×800 (2:1) · 배경: 투명
- 설명: 같은 색 구슬이 길게 이어진 사슬. 녹말이 포도당 여러 개가 연결된 큰 분자임을 보여 준다.
- 과학 확인 항목:
  - [ ] 구슬 색과 크기가 모두 같다(같은 단위 반복).
  - [ ] 사슬이 끊어져 있지 않다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Simple bead-chain model of starch: twelve identical orange circles connected in a gently curving chain by short navy links, all the same size and color to show repeating sugar units. The chain is long and clearly one connected molecule. No text.
```

### 분자 모형: 포도당 (단당류 하나)

- 파일 이름: `mol-glucose.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 녹말 사슬과 같은 색·크기의 구슬 하나. 이미 작은 분자라 더 분해하지 않아도 흡수될 수 있음을 뜻한다.
- 과학 확인 항목:
  - [ ] 녹말 그림의 구슬과 같은 색·모양이어야 한다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
A single orange circle bead with a navy outline, exactly the same style and color as the beads in the starch chain, centered and alone. No text.
```

### 분자 모형: 단백질 (아미노산 사슬)

- 파일 이름: `mol-protein.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1600×800 (2:1) · 배경: 투명
- 설명: 서로 다른 모양·색의 구슬이 이어져 접힌 사슬. 단백질은 여러 종류의 아미노산이 연결된 큰 분자.
- 과학 확인 항목:
  - [ ] 구슬이 여러 종류다(녹말과 구분).
  - [ ] 사슬이 이어져 있다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Bead-chain model of a protein: about fourteen beads of three different shapes (circle, rounded square, rounded triangle) in teal, light blue-gray and peach, connected by navy links into a chain that folds back on itself once, forming a compact zigzag. Clearly different units in one connected molecule. No text.
```

### 분자 모형: 아미노산 낱개

- 파일 이름: `mol-amino-acid.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 단백질 사슬에서 쓴 세 가지 모양의 구슬이 낱개로 흩어져 있는 모습. 최종 소화 산물.
- 과학 확인 항목:
  - [ ] 연결선이 없다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Three separate single beads, not connected: one teal circle, one light blue-gray rounded square, one peach rounded triangle, spaced apart, in the same style as the protein chain beads. No links between them. No text.
```

### 분자 모형: 지방 (글리세롤 + 지방산 셋)

- 파일 이름: `mol-fat.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 짧은 세로 막대(글리세롤)에 긴 꼬리 세 개(지방산)가 붙은 모형. 큰 지방 방울 하나와 함께.
- 과학 확인 항목:
  - [ ] 꼬리가 세 개다.
  - [ ] 구조식 글자(C, H, O)는 없다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Simplified model of a fat molecule: a short vertical navy-outlined bar in light blue-gray (glycerol) with three long wavy orange tails attached to its right side, one at the top, middle and bottom, all tails the same length. Behind it, a large soft orange translucent circle suggesting a fat droplet. No text.
```

### 분자 모형: 지방산과 모노글리세리드 등 (라이페이스 이후)

- 파일 이름: `mol-fat-products.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1600×800 (2:1) · 배경: 투명
- 설명: 지방 모형이 분해된 산물: 꼬리 하나만 남은 막대(모노글리세리드) 하나와 떨어져 나온 꼬리(지방산) 두 개.
- 과학 확인 항목:
  - [ ] 막대에 꼬리 하나, 자유 꼬리 둘(합이 셋).
  - [ ] 분해 산물이 ‘포도당’이나 ‘아미노산’ 모양과 헷갈리지 않는다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Breakdown products of a fat molecule in the same style: on the left, the short light blue-gray glycerol bar with only one wavy orange tail still attached; on the right, two separate wavy orange tails floating free with small gaps. Nothing else. No text.
```

### 담즙의 유화 (큰 방울 → 작은 방울들)

- 파일 이름: `bile-emulsification.png`
- 등급: 필수 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1600×800 (2:1) · 배경: 투명
- 설명: 왼쪽 큰 지방 방울 하나, 가운데 담즙 방울들, 오른쪽 작은 지방 방울 여러 개. 담즙이 지방을 잘게 나누어(유화) 효소가 작용할 표면을 넓힘을 보여 준다. 분해(꼬리 떨어짐)는 아직 아님.
- 과학 확인 항목:
  - [ ] 오른쪽 방울들이 여전히 ‘방울’이다(분해가 아니라 유화).
  - [ ] 담즙은 방울(효소 가위 모양 아님).

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Three-part scene left to right without arrows: on the left one large soft orange circle (a big fat droplet); in the middle a scattering of small teal teardrop shapes (bile); on the right the same amount of orange now as about ten much smaller orange circles spread apart (fine droplets). The orange droplets remain whole circles, not broken into tails. No text.
```

### 분자 모형: 녹말이 일부 끊어진 상태 (입·소장 중간)

- 파일 이름: `mol-starch-partial.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1600×800 (2:1) · 배경: 투명
- 설명: 긴 사슬이 두세 토막으로 끊긴 모습. 아밀레이스가 녹말을 더 작은 당으로 분해하기 시작했음을 뜻한다. 포도당 하나로 전부 되지 않았음이 보여야 한다.
- 과학 확인 항목:
  - [ ] 토막이 남아 있고 모두 낱개가 되지는 않았다(입에서 완전 분해 금지 규칙).

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Bead-chain model of starch being broken down: the same orange beads with navy links, now as three separate pieces of different lengths (five beads, four beads, two beads) with small gaps between pieces. No single isolated bead. No text.
```

### 분자 모형: 단백질이 토막 난 상태 (위, 펩신 이후)

- 파일 이름: `mol-peptides.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1600×800 (2:1) · 배경: 투명
- 설명: 단백질 사슬이 몇 토막으로 끊긴 모습. 펩신이 단백질을 더 작은 조각으로 만들기 시작했지만 아직 아미노산 낱개가 아님.
- 과학 확인 항목:
  - [ ] 낱개 구슬이 없어야 한다(펩신만으로 아미노산 완성 금지 규칙).

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Bead-chain model of a protein partly broken down: the same mixed-shape beads (teal, light blue-gray, peach) in four separate short chains of three to five beads each, with gaps between them. No single isolated bead. No text.
```

## F. 효소·담즙 아이콘

효소 4종은 같은 모양 계열, 담즙은 다른 계열(방울)로 그려 ‘담즙은 효소가 아니다’를 시각으로 구분한다.

### 효소 아이콘: 아밀레이스

- 파일 이름: `enzyme-amylase.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 효소 공통 모양(둥근 몸통에 홈이 파인 열쇠 구멍 같은 자리)에 주황 포도당 구슬이 들어맞는 모양.
- 과학 확인 항목:
  - [ ] 홈에 들어간 것이 주황 구슬 사슬(녹말)이다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Enzyme icon: a rounded blob-shaped body in light blue-gray with a navy outline and a notch (active site) cut into one side. Fitting into the notch is a short piece of orange bead chain (two orange circles linked), showing this enzyme works on starch. Friendly, simple, no face. No text.
```

### 효소 아이콘: 펩신

- 파일 이름: `enzyme-pepsin.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 같은 효소 몸통에 여러 모양 구슬(단백질 조각)이 들어맞는 모양. 몸통 색은 연한 복숭아색으로 위와 연결.
- 과학 확인 항목:
  - [ ] 홈에 들어간 것이 여러 모양 구슬(단백질)이다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Enzyme icon in the same blob style: a rounded body in soft peach with a navy outline and a notch on one side. Fitting into the notch is a short mixed bead chain (one teal circle, one light blue-gray rounded square, one peach triangle linked), showing this enzyme works on protein. No face, no text.
```

### 효소 아이콘: 트립신

- 파일 이름: `enzyme-trypsin.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 펩신과 같은 단백질용이지만 몸통 색이 청록(이자에서 만들어져 소장에서 작용)이라 구분된다.
- 과학 확인 항목:
  - [ ] 펩신과 같은 기질(여러 모양 구슬), 다른 몸통 색.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Enzyme icon in the same blob style: a rounded body in teal with a navy outline and a notch on one side. Fitting into the notch is a short mixed bead chain (teal circle, light blue-gray rounded square, peach triangle linked), showing this enzyme also works on protein, but the body color is teal to distinguish it from the peach one. No face, no text.
```

### 효소 아이콘: 라이페이스

- 파일 이름: `enzyme-lipase.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 효소 몸통에 지방 모형(막대+꼬리)이 들어맞는 모양.
- 과학 확인 항목:
  - [ ] 홈에 들어간 것이 지방 모형이다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Enzyme icon in the same blob style: a rounded body in teal with a navy outline and a notch on one side. Fitting into the notch is a tiny fat molecule model (a short light blue-gray bar with three wavy orange tails), showing this enzyme works on fat. No face, no text.
```

### 담즙 아이콘 (효소 아님)

- 파일 이름: `bile-icon.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 효소 몸통 모양이 아니라 청록 물방울 세 개. 담즙이 효소와 다른 종류임을 시각으로 보여 준다.
- 과학 확인 항목:
  - [ ] 효소 아이콘의 몸통·홈 모양이 없다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Icon of bile: three teal teardrop shapes of slightly different sizes grouped together with navy outlines, no blob body and no notch, so it looks clearly different from the enzyme icons. No text.
```

## G. 상태·빈 화면

빈 접시, 0건, 연결 실패, 키 미설정 화면. 글자 없이 상황만 보여 주고 문장은 앱이 쓴다.

### 상태: 빈 접시

- 파일 이름: `state-empty-plate.png`
- 등급: 권장 · 쓰는 곳: 연수 안내, 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 아무것도 담기지 않은 접시와 옆에 놓인 포크.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
An empty round plate seen slightly from above, cream with a thin teal rim and navy outline, with a simple fork resting beside it. Calm and inviting. No text.
```

### 상태: 검색 결과 0건

- 파일 이름: `state-no-results.png`
- 등급: 권장 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 돋보기가 빈 그릇을 비추는 모습. 오류가 아니라 ‘없음’의 느낌.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
A simple magnifying glass with a teal rim held over an empty bowl, with a few faint dotted circles inside the lens to suggest searching found nothing. Neutral, not alarming. No text, no X marks.
```

### 상태: 연결 실패

- 파일 이름: `state-connection-error.png`
- 등급: 권장 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 끊어진 케이블 두 끝과 작은 구름(서버). 빨간 경고 대신 주황 포인트.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
Two ends of a simple cable that do not meet, with a small gap between the plugs, below a small light blue-gray cloud shape. A single small orange dot near the gap as an accent. Calm tone, no red, no exclamation marks, no text.
```

### 상태: 인증키 미설정

- 파일 이름: `state-key-missing.png`
- 등급: 선택 · 쓰는 곳: 학생용 앱
- 크기·비율: 1024×1024 (1:1) · 배경: 투명
- 설명: 열린 자물쇠와 비어 있는 열쇠 자리(점선 윤곽). 서버 설정이 아직 없음을 뜻한다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
A simple padlock in light blue-gray with its shackle open, and beside it a dotted-outline silhouette of a key where a key is missing. A small cloud shape behind the padlock. No text.
```

## H. 활동지 인쇄

A4 활동지 머리띠 그림.

### A4 활동지 머리띠

- 파일 이름: `worksheet-header.png`
- 등급: 선택 · 쓰는 곳: 학생용 앱
- 크기·비율: 2480×420 (약 6:1 가로띠) · 배경: 흰색 단색
- 설명: 활동지 맨 위에 넣는 가로 띠 그림. 왼쪽 간식 접시, 가운데 점선 경로, 오른쪽 작은 소화관. 흑백 인쇄에서도 읽히게 선이 분명해야 한다.

개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

```
A very wide horizontal header strip for a printed worksheet: on the far left a small plate with a biscuit and a milk carton without print, a dotted path running across the middle, and on the far right a small simplified digestive tract tube. Mostly white background with navy outlines and light teal and peach fills, designed to stay readable when printed in grayscale. Lots of empty space in the middle for a title to be added later by the app. No text.
```

## 라이선스 메모

생성한 그림의 이용 조건은 사용한 생성 도구의 약관을 따른다. 연수 자료로 배포할 때는 「이 그림은 수업용으로 제작한 삽화이며 실제 상품·기관과 관계없다」는 문장을 함께 둔다.
