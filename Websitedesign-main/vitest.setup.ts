import '@testing-library/jest-dom';
// jsdom doesn't implement matchMedia; provide a minimal polyfill for libraries that rely on it
if (typeof window !== 'undefined' && !window.matchMedia) {
  // @ts-ignore
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
// Minimal IntersectionObserver polyfill for libraries that check its presence
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  // @ts-ignore
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}
// Align jsdom's AbortController/AbortSignal with Node/undici to satisfy Request
if (typeof window !== 'undefined') {
  // @ts-ignore
  if (globalThis.AbortController && window.AbortController !== globalThis.AbortController) {
    // @ts-ignore
    window.AbortController = globalThis.AbortController;
  }
  // @ts-ignore
  if (globalThis.AbortSignal && window.AbortSignal !== globalThis.AbortSignal) {
    // @ts-ignore
    window.AbortSignal = globalThis.AbortSignal;
  }
}
// Provide a tolerant Request polyfill to avoid undici/AbortSignal mismatches
if (typeof globalThis !== 'undefined') {
  // @ts-ignore
  globalThis.scrollTo = () => {};
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.scrollTo = () => {};
  }
  // @ts-ignore
  class RequestPolyfill {
    url: any;
    signal: any;
    headers: any;
    method: any;
    body: any;
    constructor(input: any, init: any = {}) {
      this.url = input;
      this.signal = init.signal;
      this.headers = init.headers ?? new Map();
      this.method = init.method ?? 'GET';
      this.body = init.body ?? null;
    }
  }
  // @ts-ignore
  globalThis.Request = RequestPolyfill as any;
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.Request = globalThis.Request;
  }
}
