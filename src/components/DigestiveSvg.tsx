import type { OrganId } from '../content/digestion'
import { ORGANS } from '../content/digestion'

interface Props {
  active?: OrganId | null
  helpers?: OrganId[]
  onPick?: (id: OrganId) => void
  picked?: OrganId | null
}

/**
 * 소화계 모식도. 통과 경로(입→식도→위→소장→대장)는 실선 관,
 * 간·이자·쓸개는 점선 테두리의 ‘소화를 돕는 기관’으로 경로 밖에 그린다.
 * 모든 기관은 버튼 역할을 하며 키보드(Tab, Enter/Space)로 선택할 수 있다.
 */
export function DigestiveSvg({ active, helpers = [], onPick, picked }: Props) {
  const cls = (id: OrganId) =>
    ['organ', ORGANS[id].kind === 'helper' ? 'helper' : 'path', active === id ? 'is-active' : '', helpers.includes(id) ? 'is-helper-active' : '', picked === id ? 'is-picked' : '']
      .filter(Boolean)
      .join(' ')

  const props = (id: OrganId) =>
    onPick
      ? {
          role: 'button' as const,
          tabIndex: 0,
          'aria-label': `${ORGANS[id].name}${ORGANS[id].kind === 'helper' ? ' (소화를 돕는 기관)' : ''}`,
          'aria-pressed': picked === id,
          onClick: () => onPick(id),
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onPick(id)
            }
          },
        }
      : { 'aria-hidden': true as const }

  return (
    <svg className="digestive-svg" viewBox="0 0 320 420" role="group" aria-label="소화계 모식도: 입, 식도, 위, 소장, 대장의 통과 경로와 간, 쓸개, 이자">
      {/* 몸 윤곽 */}
      <path d="M160 8c-30 0-50 22-50 50 0 20 10 34 22 42v16c-60 10-96 50-100 110l-4 180h264l-4-180c-4-60-40-100-100-110v-16c12-8 22-22 22-42 0-28-20-50-50-50z" fill="var(--body)" stroke="var(--line-soft)" strokeWidth="2" />

      {/* 대장 (뒤쪽에 먼저) */}
      <g className={cls('large')} {...props('large')}>
        <path d="M92 380V262c0-16 10-24 26-24h84c16 0 26 8 26 24v118" fill="none" strokeWidth="20" strokeLinecap="round" />
        <text x="236" y="350" className="organ-label">대장</text>
      </g>

      {/* 소장 */}
      <g className={cls('small')} {...props('small')}>
        <path d="M150 238c-30 4-36 22-14 30s52 0 52 16-40 14-52 20-14 22 6 26 46-2 50 12-24 18-42 20" fill="none" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <text x="160" y="400" textAnchor="middle" className="organ-label">소장</text>
      </g>

      {/* 식도 */}
      <g className={cls('esophagus')} {...props('esophagus')}>
        <path d="M160 92v86" fill="none" strokeWidth="10" strokeLinecap="round" />
        <text x="170" y="140" className="organ-label">식도</text>
      </g>

      {/* 위 */}
      <g className={cls('stomach')} {...props('stomach')}>
        <path d="M160 176c4 0 14-2 24 4 22 12 30 40 12 56-16 14-38 10-48 4-6-4-6-10 0-12 12-4 22-10 22-24 0-10-10-14-10-28z" strokeWidth="3" />
        <text x="214" y="214" className="organ-label">위</text>
      </g>

      {/* 간 (경로 밖) */}
      <g className={cls('liver')} {...props('liver')}>
        <path d="M70 178c20-14 64-16 82-6 6 4 4 14-2 20-14 12-46 24-70 22-18-2-24-26-10-36z" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="78" y="198" className="organ-label">간</text>
      </g>

      {/* 쓸개 */}
      <g className={cls('gallbladder')} {...props('gallbladder')}>
        <ellipse cx="122" cy="222" rx="11" ry="8" strokeWidth="2.5" strokeDasharray="4 3" />
        <text x="58" y="232" className="organ-label">쓸개</text>
      </g>

      {/* 이자 */}
      <g className={cls('pancreas')} {...props('pancreas')}>
        <path d="M150 248c20-6 46-8 64-2 6 2 4 10-2 10-20 2-40 2-60 4-6 0-8-10-2-12z" strokeWidth="2.5" strokeDasharray="5 3" />
        <text x="226" y="258" className="organ-label">이자</text>
      </g>

      {/* 입 */}
      <g className={cls('mouth')} {...props('mouth')}>
        <path d="M144 70q16 12 32 0" fill="none" strokeWidth="6" strokeLinecap="round" />
        <text x="186" y="74" className="organ-label">입</text>
      </g>
    </svg>
  )
}
