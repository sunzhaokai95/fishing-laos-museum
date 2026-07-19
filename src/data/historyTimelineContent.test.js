import { describe, expect, it } from 'vitest'
import timeline from '../../public/content/data/history-timeline.json'

const INTERNAL_WORDING = /资料\.docx|书中结合|正式节点|网页首发|首发时间轴|首发前|当前本地资料|1\.0 时间轴|待馆藏资料|待原考古资料|具体节点待补|词语早期使用待研究/

describe('public history timeline copy', () => {
  it('does not expose research workflow language to visitors', () => {
    const publicCopy = timeline.map(({ period, summary, detail }) => `${period} ${summary} ${detail}`).join('\n')

    expect(publicCopy).not.toMatch(INTERNAL_WORDING)
  })
})
