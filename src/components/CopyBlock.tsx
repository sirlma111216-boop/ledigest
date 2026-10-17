import { useRef, useState } from 'react'
import type { CopyBlock as CopyBlockT } from '../content/types'
import { copyText, selectAllIn } from '../lib/clipboard'

interface Props {
  block: CopyBlockT
  print?: boolean
  /** 복사 시 본문 뒤에 붙일 추가 텍스트(예: 오류 메모) */
  extra?: string
  copyLabel?: string
}

const KIND_LABEL: Record<CopyBlockT['kind'], string> = {
  prompt: 'AI Studio에 붙여 넣을 프롬프트',
  settings: '계정·빌드 설정값',
  text: '복사용 문구',
}

export function CopyBlock({ block, print, extra, copyLabel }: Props) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'fail'>('idle')
  const preRef = useRef<HTMLPreElement>(null)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const fullText = extra ? `${block.body}\n\n${extra}` : block.body

  const onCopy = async () => {
    const ok = await copyText(fullText)
    setStatus(ok ? 'ok' : 'fail')
    if (!ok) setTimeout(() => selectAllIn(taRef.current), 0)
  }

  const label = copyLabel ?? (block.kind === 'prompt' ? '프롬프트 전체 복사' : block.kind === 'settings' ? '설정값 전체 복사' : '전체 복사')

  return (
    <div className={`copy-block kind-${block.kind}`}>
      <div className="copy-head">
        <div>
          <span className="kind-tag">{KIND_LABEL[block.kind]}</span>
          <h4>{block.title}</h4>
        </div>
        {!print && (
          <div className="copy-actions no-print">
            <button type="button" className="btn btn-primary" onClick={onCopy}>
              {label}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => selectAllIn(preRef.current)}>
              전체 선택
            </button>
          </div>
        )}
      </div>

      {block.rows && (
        <table className="settings-table">
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">값</th>
              <th scope="col">메모</th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((r) => (
              <tr key={r.key}>
                <th scope="row">{r.key}</th>
                <td>
                  <code>{r.value}</code>
                </td>
                <td>{r.note ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <pre ref={preRef} className={print ? 'copy-body print-full' : 'copy-body'} tabIndex={0} aria-label={`${block.title} 전문`}>
        {block.body}
      </pre>

      {!print && (
        <p className="copy-status no-print" role="status" aria-live="polite">
          {status === 'ok' && `복사됨: ${fullText.length.toLocaleString()}자 전체가 클립보드에 들어갔습니다.`}
          {status === 'fail' && '자동 복사가 막혔습니다. 아래 상자의 글이 모두 선택되어 있으니 Ctrl+C(맥은 ⌘+C)로 복사하세요.'}
        </p>
      )}
      {!print && status === 'fail' && (
        <textarea ref={taRef} className="manual-copy no-print" readOnly value={fullText} aria-label="수동 복사용 전문" rows={8} />
      )}
    </div>
  )
}
