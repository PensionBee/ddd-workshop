export const mockDisconnect = vi.fn();
export const mockObserve = vi.fn();
export const mockUnobserve = vi.fn();

export class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  constructor() {
    this.root = null;
    this.rootMargin = "";
    this.thresholds = [];
  }
  disconnect() {
    mockDisconnect();
  }
  observe() {
    mockObserve();
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {
    mockUnobserve();
  }
}
