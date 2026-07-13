export function installChunkRecovery(
  target = window,
  reload = () => window.location.reload(),
) {
  const recover = (event) => {
    event.preventDefault()
    reload()
  }
  target.addEventListener('vite:preloadError', recover)
  return () => target.removeEventListener('vite:preloadError', recover)
}
