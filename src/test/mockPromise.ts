export type MockPromise<T> = Promise<T> & {
  resolve: (value: T) => Promise<void>;
  reject: (error: Error) => Promise<void>;
};

export function createMockPromise<T>(): MockPromise<T> {
  let resolveMockPromise: (value: T) => void = () => {};
  let rejectMockPromise: (error: Error) => void = () => {};

  const mockPromise = new Promise((resolve, reject) => {
    resolveMockPromise = resolve;
    rejectMockPromise = reject;
  }) as MockPromise<T>;

  mockPromise.resolve = async (value: T) => {
    resolveMockPromise(value);
    await mockPromise;
  };
  mockPromise.reject = async (error: Error) => {
    rejectMockPromise(error);
    try {
      await mockPromise;
    } catch {}
  };

  return mockPromise;
}
