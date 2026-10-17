import { useEffect, useMemo, useState } from 'react'
import { APPENDIX_PROMPTS } from '../content/prompts'
import { OFFICIAL_LINKS } from '../content/reference'
import { fullPrompt, IMAGE_FOLDER, IMAGE_GROUPS, IMAGE_STYLE, IMAGES, imageAbsoluteUrl, imageUrl, negativePrompt, probeImage, type ImageSpec, type Tier } from '../lib/images'
import { CopyBlock } from './CopyBlock'
import { Pic } from './Pic'

const TIERS: Tier[] = ['필수', '권장', '선택']

function useAvailability() {
  const [avail, setAvail] = useState<Record<string, boolean> | null>(null)
  useEffect(() => {
    let alive = true
    Promise.all(IMAGES.map((i) => probeImage(i.id).then((ok) => [i.id, ok] as const))).then((pairs) => {
      if (alive) setAvail(Object.fromEntries(pairs))
    })
    return () => {
      alive = false
    }
  }, [])
  return avail
}

function fileList(list: ImageSpec[]) {
  return list.map((i) => `- ${i.file}: ${i.title} (${i.size})`).join('\n')
}

export function ImagesPage({ print }: { print?: boolean }) {
  const avail = useAvailability()
  const ready = useMemo(() => IMAGES.filter((i) => avail?.[i.id]), [avail])
  const base = useMemo(() => {
    const u = imageAbsoluteUrl(IMAGES[0].id) ?? ''
    return u.slice(0, u.lastIndexOf('/') + 1)
  }, [])
  const [zipState, setZipState] = useState<string>('')
  const [filter, setFilter] = useState<'all' | Tier>('all')

  const listForPrompt = ready.length > 0 ? ready : IMAGES
  const apxA = APPENDIX_PROMPTS.apxA.body.replace('{{FILE_LIST}}', fileList(listForPrompt))
  const apxB = APPENDIX_PROMPTS.apxB.body.replace('{{FILE_LIST}}', fileList(listForPrompt)).replace('{{BASE_URL}}', base || '(안내 사이트 주소)/images/')

  const makeZip = async (onlyTier: Tier | null) => {
    const targets = ready.filter((i) => !onlyTier || i.tier === onlyTier)
    if (targets.length === 0) {
      setZipState('아직 올라온 그림 파일이 없어 묶음을 만들 수 없습니다.')
      return
    }
    setZipState(`묶는 중… 0 / ${targets.length}`)
    try {
      const { default: JSZip } = await import('jszip')
      const zip = new JSZip()
      const folder = zip.folder(IMAGE_FOLDER)!
      let n = 0
      for (const im of targets) {
        const res = await fetch(imageUrl(im.id)!)
        if (!res.ok) continue
        folder.file(im.file, await res.blob())
        n++
        setZipState(`묶는 중… ${n} / ${targets.length}`)
      }
      const readme = [
        '간식의 몸속 여행 — 그림 자료 묶음',
        `만든 날짜: ${new Date().toISOString().slice(0, 10)}`,
        `파일 수: ${n}`,
        '',
        '넣는 위치: 학생용 앱 저장소(snack-body-journey)의 public/images/ 폴더',
        '적용 방법: 연수 안내 사이트의 「이미지 자료」 페이지에 있는 부록 프롬프트 A를 AI Studio에 입력',
        '',
        '이 그림들은 수업용으로 제작한 삽화이며 실제 상품·기관과 관계가 없습니다.',
        '',
        ...targets.map((i) => `${i.file}\t${i.title}\t${i.size}`),
      ].join('\n')
      zip.file('README.txt', readme)
      const blob = await zip.generateAsync({ type: 'blob' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = onlyTier ? `snack-journey-images-${onlyTier}.zip` : 'snack-journey-images.zip'
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(a.href), 5000)
      setZipState(`내려받기 시작: ${n}개 파일`)
    } catch (e) {
      setZipState(`묶음을 만들지 못했습니다: ${(e as Error).message}`)
    }
  }

  const shown = IMAGES.filter((i) => filter === 'all' || i.tier === filter)

  return (
    <article className="page" aria-labelledby="img-title">
      <h2 id="img-title" tabIndex={-1}>
        이미지 자료 — 목록·내려받기·생성 프롬프트
      </h2>
      <p>
        안내 사이트와 참가자의 학생용 앱이 함께 쓰는 그림 {IMAGES.length}장입니다. 그림은 연수 운영자(교사)가 아래 프롬프트로 만들어 이 사이트의 <code>{IMAGE_FOLDER}/</code> 폴더에 올립니다. 참가자는 여기서 묶음을 내려받아 자신의 앱에 넣습니다. 그림이 없어도 안내 사이트와 앱은 기본 그림(SVG)으로 동작합니다.
      </p>
      <p className="status-line" role="status" aria-live="polite">
        {avail === null ? '그림 파일 확인 중…' : `현재 올라온 그림: ${ready.length} / ${IMAGES.length}장 (필수 ${ready.filter((i) => i.tier === '필수').length}/${IMAGES.filter((i) => i.tier === '필수').length})`}
      </p>

      {/* 참가자용 */}
      <section className="sec">
        <h3>참가자: 내려받아 내 앱에 넣기</h3>
        {!print && (
          <div className="zip-row no-print">
            <button type="button" className="btn btn-primary" onClick={() => makeZip(null)} disabled={avail === null || ready.length === 0}>
              올라온 그림 전체 묶음(ZIP) 내려받기
            </button>
            <button type="button" className="btn" onClick={() => makeZip('필수')} disabled={avail === null || ready.filter((i) => i.tier === '필수').length === 0}>
              필수 그림만 묶음 내려받기
            </button>
            <span className="help" role="status" aria-live="polite">
              {zipState}
            </span>
          </div>
        )}
        <p className="help">묶음은 이 브라우저 안에서 만들어집니다. 어디에도 전송되지 않습니다. 개별 파일은 아래 목록의 「파일 내려받기」로도 받을 수 있습니다.</p>

        <h4>넣는 방법 1 (기본): GitHub 저장소에 올리고 AI Studio에서 가져오기</h4>
        <p className="help">
          AI Studio Build 공식 문서에는 그림 파일을 직접 올리는 기능이 없고, GitHub에서 가져오기만 있습니다. 그래서 그림은 GitHub를 거칩니다. 10단계(GitHub 저장) 뒤에 진행합니다.{' '}
          <a href={OFFICIAL_LINKS.aiStudioBuild.url} target="_blank" rel="noopener noreferrer">
            AI Studio Build와 GitHub 연결 문서
          </a>
        </p>
        <ol className="actions">
          <li>위에서 묶음(ZIP)을 내려받고 압축을 푼다. images 폴더 안에 PNG 파일들이 있다.</li>
          <li>GitHub의 내 저장소(snack-body-journey)에서 public 폴더를 연다. public 폴더가 없으면 아래 체크를 먼저 본다.</li>
          <li>Add file → Upload files를 누르고, 압축을 푼 images 폴더째 끌어다 놓는다. 경로가 public/images/파일이름 이 되어야 한다.</li>
          <li>Commit changes를 누른다. 커밋 메시지는 ‘그림 자료 추가’처럼 짧게 적는다.</li>
          <li>AI Studio로 돌아와 Settings → GitHub에서 GitHub의 변경을 가져오는(Pull) 작업을 한다. 공식 문서는 ‘AI Studio 밖에서 만든 변경을 다시 가져올 수 있다’고 안내한다. 충돌 대화상자가 뜨면 그림 파일은 GitHub 쪽을 선택한다.</li>
          <li>아래 부록 프롬프트 A를 복사해 AI Studio에 입력한다.</li>
          <li>미리보기에서 그림이 보이는지 확인한다. 안 보이면 그림 파일이 public/images 에 있는지, 파일 이름이 목록과 같은지 본다. 대체 아이콘이 나오는 것은 정상 동작이다.</li>
          <li>GitHub에 Push/Sync하고 Cloudflare의 새 배포에서 그림을 확인한다(14단계와 같은 흐름).</li>
        </ol>
        <p className="help">public 폴더가 없을 때: 7단계의 프롬프트 06이 public/_routes.json을 만들었으므로 보통 있습니다. 없다면 AI Studio에 ‘public 폴더를 만들고 _routes.json을 거기 두어 줘’라고 먼저 요청합니다.</p>

        <h4>넣는 방법 2 (대안): 이 안내 사이트의 그림 주소를 직접 쓰기</h4>
        <p className="help">
          저장소에 파일을 넣기 어렵거나 10단계 전에 미리보기에서 그림을 보고 싶을 때 씁니다. 이 안내 사이트가 공개 주소에 배포되어 있어야 하고, 사이트가 내려가면 앱에서 그림이 대체 아이콘으로 바뀝니다. 현재 그림 기본 주소: <code>{base || '(배포 후 표시)'}</code>
        </p>

        <CopyBlock block={{ kind: 'prompt', title: APPENDIX_PROMPTS.apxA.title, body: apxA }} print={print} copyLabel="부록 프롬프트 A 복사" />
        <CopyBlock block={{ kind: 'prompt', title: APPENDIX_PROMPTS.apxB.title, body: apxB }} print={print} copyLabel="부록 프롬프트 B 복사" />
        <p className="help">
          {ready.length > 0 ? `부록 프롬프트의 파일 목록은 현재 올라온 ${ready.length}장만 넣었습니다.` : '아직 올라온 그림이 없어 부록 프롬프트에는 전체 목록을 넣었습니다. 없는 파일은 앱이 대체 그림으로 처리합니다.'}
        </p>
      </section>

      {/* 제작자용 */}
      <section className="sec">
        <h3>제작자(강사): 그림 만드는 방법</h3>
        <ol className="actions">
          <li>아래 「공통 스타일 문단」을 복사해 둔다. 그림마다 ‘공통 스타일 문단 + 개별 프롬프트’ 순서로 이미지 생성기에 넣는다. 각 그림의 「프롬프트 전체 복사」 버튼은 둘을 합쳐서 복사한다.</li>
          <li>부정 프롬프트 칸이 있는 생성기에서는 「부정 프롬프트」도 넣는다.</li>
          <li>목록의 크기·비율로 만든다. 더 크게 만들어 줄이는 것은 괜찮지만 작은 것을 키우면 흐려진다.</li>
          <li>글자·숫자·라벨이 하나라도 들어가면 다시 만든다. 글자는 앱이 한국어로 따로 얹는다.</li>
          <li>투명 배경이어야 하는 그림은 투명 PNG로 저장한다. 생성기가 투명을 지원하지 않으면 순백 배경으로 만든 뒤 배경 제거 도구로 지운다.</li>
          <li>해부 그림은 각 카드의 「과학 확인 항목」을 하나씩 대조한다. 보기 좋아도 틀린 그림은 쓰지 않는다.</li>
          <li>
            파일 이름을 목록과 똑같이 저장해 이 사이트 프로젝트의 <code>public/{IMAGE_FOLDER}/</code>에 넣고 다시 빌드·배포한다. 같은 내용의 문서 파일 <a href={`${import.meta.env.BASE_URL}IMAGE_PROMPTS.md`} download>
              IMAGE_PROMPTS.md
            </a>
            도 있다.
          </li>
        </ol>
        <CopyBlock block={{ kind: 'text', title: IMAGE_STYLE.title, body: IMAGE_STYLE.anchor }} print={print} copyLabel="스타일 문단 복사" />
        <CopyBlock block={{ kind: 'text', title: '부정 프롬프트', body: negativePrompt() }} print={print} copyLabel="부정 프롬프트 복사" />
        <details className="fold-card" open={print}>
          <summary>지킬 규칙 {IMAGE_STYLE.rules.length}가지</summary>
          <ul>
            {IMAGE_STYLE.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </details>
      </section>

      {/* 목록 */}
      <section className="sec">
        <h3>그림 목록 ({IMAGES.length}장)</h3>
        {!print && (
          <div className="model-tabs no-print" role="tablist" aria-label="등급으로 거르기">
            {(['all', ...TIERS] as const).map((t) => (
              <button key={t} type="button" role="tab" aria-selected={filter === t} className={`tab${filter === t ? ' is-on' : ''}`} onClick={() => setFilter(t)}>
                {t === 'all' ? `전체 ${IMAGES.length}` : `${t} ${IMAGES.filter((i) => i.tier === t).length}`}
              </button>
            ))}
          </div>
        )}
        <table className="settings-table img-summary">
          <caption>한눈에 보기</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">파일 이름</th>
              <th scope="col">제목</th>
              <th scope="col">등급</th>
              <th scope="col">쓰는 곳</th>
              <th scope="col">크기</th>
              <th scope="col">준비</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((im) => (
              <tr key={im.id}>
                <td>{IMAGES.indexOf(im) + 1}</td>
                <td>
                  <code>{im.file}</code>
                </td>
                <td>{im.title}</td>
                <td>{im.tier}</td>
                <td>{im.usedIn.map((u) => (u === 'guide' ? '안내' : '앱')).join('·')}</td>
                <td>{im.size}</td>
                <td>{avail === null ? '…' : avail[im.id] ? '있음' : '없음'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {IMAGE_GROUPS.map((g) => {
          const list = shown.filter((i) => i.group === g.id)
          if (list.length === 0) return null
          return (
            <div key={g.id} className="img-group">
              <h4>{g.title}</h4>
              <p className="help">{g.note}</p>
              <div className="img-cards">
                {list.map((im) => (
                  <ImageCard key={im.id} im={im} ok={avail?.[im.id] ?? null} print={print} />
                ))}
              </div>
            </div>
          )
        })}
      </section>
      <p className="help">생성한 그림의 이용 조건은 사용한 생성 도구의 약관을 따릅니다. 연수 자료로 배포할 때는 「이 그림은 수업용으로 제작한 삽화이며 실제 상품·기관과 관계없다」는 문장을 함께 둡니다.</p>
    </article>
  )
}

function ImageCard({ im, ok, print }: { im: ImageSpec; ok: boolean | null; print?: boolean }) {
  const [open, setOpen] = useState(false)
  const url = imageUrl(im.id)!
  const abs = imageAbsoluteUrl(im.id)!
  return (
    <article className={`img-card tier-${im.tier}`} aria-labelledby={`img-${im.id}`}>
      <div className={`img-preview ${im.background.startsWith('투명') ? 'checker' : ''}`}>
        <Pic id={im.id} alt={`${im.title} 미리보기`} fallback={<span className="img-missing">{ok === null ? '확인 중' : '아직 없음'}</span>} />
      </div>
      <div className="img-meta">
        <p className="img-kicker">
          <span className={`badge badge-tier-${im.tier}`}>{im.tier}</span> <code>{im.file}</code>
        </p>
        <h5 id={`img-${im.id}`}>{im.title}</h5>
        <p className="help">
          {im.size} · {im.aspect} · 배경 {im.background} · {im.usedIn.map((u) => (u === 'guide' ? '연수 안내' : '학생용 앱')).join('·')}
        </p>
        <p>{im.desc}</p>
        {im.science.length > 0 && (
          <div className="science-checks">
            <strong>과학 확인 항목</strong>
            <ul>
              {im.science.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {!print && (
          <div className="img-actions no-print">
            {ok && (
              <a className="btn btn-small" href={url} download={im.file}>
                파일 내려받기
              </a>
            )}
            <button type="button" className="btn btn-small" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? '프롬프트 접기' : '생성 프롬프트 보기'}
            </button>
          </div>
        )}
        {ok && <p className="help url-line">절대 주소: {abs}</p>}
        {(open || print) && <CopyBlock block={{ kind: 'text', title: `생성 프롬프트: ${im.title}`, body: fullPrompt(im) }} print={print} copyLabel="프롬프트 전체 복사" />}
      </div>
    </article>
  )
}
