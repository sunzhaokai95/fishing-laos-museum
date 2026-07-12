import '@testing-library/jest-dom/vitest'

class TestIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = TestIntersectionObserver

HTMLCanvasElement.prototype.getContext = () => null
