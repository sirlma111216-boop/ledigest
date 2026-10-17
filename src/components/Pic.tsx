import { useEffect, useState } from 'react'
import { imageSpec, imageUrl, probeImage } from '../lib/images'

interface Props {
  id: string
  alt?: string
  className?: string
  /** 이미지 파일이 없을 때 대신 그릴 것 (기존 SVG 등). 없으면 아무것도 그리지 않는다. */
  fallback?: React.ReactNode
  /** true이면 alt를 비워 장식용으로 처리 */
  decorative?: boolean
}

/**
 * public/images 의 제공 이미지를 쓰고, 파일이 없으면 fallback 을 그린다.
 * 존재 여부는 probeImage 로 한 번만 확인해 깜빡임을 줄인다.
 */
export function Pic({ id, alt, className, fallback = null, decorative }: Props) {
  const [state, setState] = useState<'probing' | 'ok' | 'missing'>('probing')
  useEffect(() => {
    let alive = true
    probeImage(id).then((ok) => alive && setState(ok ? 'ok' : 'missing'))
    return () => {
      alive = false
    }
  }, [id])
  const spec = imageSpec(id)
  const url = imageUrl(id)
  if (!spec || !url || state === 'missing') return <>{fallback}</>
  if (state === 'probing') return <span className={className} aria-hidden="true" />
  return <img src={url} alt={decorative ? '' : (alt ?? spec.title)} className={className} loading="lazy" decoding="async" />
}
