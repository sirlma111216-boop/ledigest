/**
 * 이미지 자료 목록(src/content/images.json)을 읽는 도우미.
 * 실제 파일은 public/images/<file>에 둔다. 없으면 각 화면이 기본 그림(SVG)으로 대체한다.
 */
import manifest from '../content/images.json'

export type Tier = '필수' | '권장' | '선택'
export interface ImageSpec {
  id: string
  file: string
  group: string
  title: string
  tier: Tier
  usedIn: ('guide' | 'app')[]
  size: string
  aspect: string
  background: string
  desc: string
  prompt: string
  science: string[]
}
export interface ImageGroup {
  id: string
  title: string
  note: string
}

export const IMAGE_STYLE = manifest.style
export const IMAGE_GROUPS: ImageGroup[] = manifest.groups
export const IMAGES: ImageSpec[] = manifest.images as ImageSpec[]
export const IMAGE_FOLDER = manifest.folder

const byId = new Map(IMAGES.map((i) => [i.id, i]))

export function imageSpec(id: string): ImageSpec | undefined {
  return byId.get(id)
}

/** 사이트 기준 상대 주소 (base './' 설정과 함께 동작) */
export function imageUrl(id: string): string | null {
  const s = byId.get(id)
  if (!s) return null
  return `${import.meta.env.BASE_URL}${IMAGE_FOLDER}/${s.file}`
}

/** 배포된 사이트의 절대 주소. 참가자가 앱에서 직접 참조할 때 쓴다. */
export function imageAbsoluteUrl(id: string): string | null {
  const rel = imageUrl(id)
  if (!rel) return null
  try {
    return new URL(rel, window.location.href).href
  } catch {
    return rel
  }
}

/** 생성기에 넣을 전체 프롬프트: 스타일 문단 + 개별 설명 */
export function fullPrompt(s: ImageSpec): string {
  return `${IMAGE_STYLE.anchor}\n\n${s.prompt}\n\nOutput: ${s.size} px, ${s.aspect}, ${s.background === '투명' ? 'transparent PNG' : s.background}.`
}

export function negativePrompt(): string {
  return IMAGE_STYLE.negative
}

/* 이미지 존재 여부를 한 번만 확인해 두는 캐시 */
const probeCache = new Map<string, Promise<boolean>>()
export function probeImage(id: string): Promise<boolean> {
  const url = imageUrl(id)
  if (!url) return Promise.resolve(false)
  let p = probeCache.get(id)
  if (!p) {
    p = new Promise<boolean>((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
    probeCache.set(id, p)
  }
  return p
}
