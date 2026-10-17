// src/content/images.json 에서 IMAGE_PROMPTS.md 를 만든다.  실행: npm run images:doc
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const m = JSON.parse(readFileSync(join(root, 'src/content/images.json'), 'utf8'))
const imgDir = join(root, 'public', m.folder)

const tierOrder = { 필수: 0, 권장: 1, 선택: 2 }
const count = (t) => m.images.filter((i) => i.tier === t).length
const exists = (f) => existsSync(join(imgDir, f))

let out = `# 이미지 자료 목록과 생성 프롬프트

「내가 먹은 간식의 몸속 여행」 연수 안내 사이트와 참가자 학생용 앱이 함께 쓰는 그림 ${m.images.length}장.
필수 ${count('필수')} · 권장 ${count('권장')} · 선택 ${count('선택')}.

이 문서는 \`src/content/images.json\` 에서 자동으로 만든다. 내용을 고칠 때는 JSON 을 고치고 \`npm run images:doc\` 를 다시 실행한다.
만든 그림 파일은 \`public/${m.folder}/\` 에 목록의 파일 이름 그대로 넣는다. 파일이 없으면 사이트와 앱은 기본 그림(SVG)으로 대체한다.

## 만드는 순서

1. 아래 「공통 스타일 문단」을 복사해 두고, 그림마다 \`공통 스타일 문단 + 개별 프롬프트\` 순서로 생성기에 넣는다. 부정 프롬프트 칸이 있으면 「부정 프롬프트」를 넣는다.
2. 목록의 크기·비율로 생성한다. 더 크게 만들어 줄이는 것은 괜찮다.
3. 글자·숫자·라벨이 하나라도 들어가면 다시 만든다. 글자는 앱이 한국어로 따로 얹는다.
4. 배경이 투명이어야 하는 그림은 투명 PNG로 저장한다. 생성기가 투명을 지원하지 않으면 순백 배경으로 만든 뒤 배경 제거 도구로 지운다.
5. 해부 그림은 「과학 확인 항목」을 하나씩 대조한다.
6. 파일 이름을 목록과 똑같이 저장해 \`public/${m.folder}/\` 에 넣는다.

## 공통 스타일 문단 (모든 프롬프트 앞에 붙인다)

\`\`\`
${m.style.anchor}
\`\`\`

## 부정 프롬프트 (지원하는 생성기에서)

\`\`\`
${m.style.negative}
\`\`\`

## 지킬 규칙

${m.style.rules.map((r) => `- ${r}`).join('\n')}

## 한눈에 보는 목록

| # | 파일 이름 | 제목 | 등급 | 쓰는 곳 | 크기 | 배경 | 준비 |
| --- | --- | --- | --- | --- | --- | --- | --- |
`
m.images.forEach((im, i) => {
  out += `| ${i + 1} | \`${im.file}\` | ${im.title} | ${im.tier} | ${im.usedIn.map((u) => (u === 'guide' ? '안내' : '앱')).join('·')} | ${im.size} | ${im.background} | ${exists(im.file) ? '있음' : '없음'} |\n`
})

for (const g of m.groups) {
  const list = m.images.filter((i) => i.group === g.id).sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier])
  if (!list.length) continue
  out += `\n## ${g.title}\n\n${g.note}\n`
  for (const im of list) {
    out += `
### ${im.title}

- 파일 이름: \`${im.file}\`
- 등급: ${im.tier} · 쓰는 곳: ${im.usedIn.map((u) => (u === 'guide' ? '연수 안내' : '학생용 앱')).join(', ')}
- 크기·비율: ${im.size} (${im.aspect}) · 배경: ${im.background}
- 설명: ${im.desc}
${im.science.length ? `- 과학 확인 항목:\n${im.science.map((s) => `  - [ ] ${s}`).join('\n')}\n` : ''}
개별 프롬프트 (공통 스타일 문단 뒤에 붙인다):

\`\`\`
${im.prompt}
\`\`\`
`
  }
}

out += `
## 라이선스 메모

생성한 그림의 이용 조건은 사용한 생성 도구의 약관을 따른다. 연수 자료로 배포할 때는 「이 그림은 수업용으로 제작한 삽화이며 실제 상품·기관과 관계없다」는 문장을 함께 둔다.
`

writeFileSync(join(root, 'IMAGE_PROMPTS.md'), out, 'utf8')
// 사이트에서도 내려받을 수 있게 public 에 복사본을 둔다.
writeFileSync(join(root, 'public', 'IMAGE_PROMPTS.md'), out, 'utf8')
console.log(`IMAGE_PROMPTS.md 작성: ${m.images.length}장, 준비됨 ${m.images.filter((i) => exists(i.file)).length}장`)
