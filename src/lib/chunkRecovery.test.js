import { describe, expect, it, vi } from 'vitest'
import { installChunkRecovery } from './chunkRecovery.js'

describe('lazy chunk recovery', () => {
  it('reloads the current page when a deployed chunk is no longer available', () => {
    const target = new EventTarget()
    const reload = vi.fn()
    const remove = installChunkRecovery(target, reload)
    const event = new Event('vite:preloadError', { cancelable: true })

    target.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
    expect(reload).toHaveBeenCalledOnce()
    remove()
  })
})
