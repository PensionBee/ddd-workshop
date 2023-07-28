export const mockDisconnect = jest.fn();
export const mockObserve = jest.fn();
export const mockUnobserve = jest.fn();

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
