import { mount } from "enzyme";
import React, { FC, ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { ErrorBoundary } from "../ErrorBoundary";
import { createMockPromise, MockPromise } from "../test/mockPromise";
import { ApiError } from "./ApiError";
import { FetchSettings, useApi } from "./useApi";

type FetchResponse = {
  ok: boolean;
  status?: number;
  json: () => Promise<object>;
};

let mockFetchPromise: MockPromise<FetchResponse>;
let mockFetch: jest.Mock<MockPromise<FetchResponse>>;

beforeEach(() => {
  mockFetchPromise = createMockPromise<FetchResponse>();
  mockFetch = jest.fn(() => mockFetchPromise);
  global.fetch = mockFetch;
});

window.addEventListener("error", (event) => event.preventDefault());

const TestComponent: FC<FetchSettings> = (props): ReactElement => {
  const [data, load, loading, error] = useApi<{ test: string }>(props);
  const loadButton = (
    <button type="button" id="load" onClick={load}>
      Load
    </button>
  );

  if (error instanceof ApiError) {
    return <span id="error">{`${error.message} (${error.status})`}</span>;
  } else if (error) {
    return <span id="error">{error.message}</span>;
  }

  if (loading) {
    return (
      <>
        {loadButton}
        <span id="loading">{"Loading..."}</span>
      </>
    );
  }

  if (data) {
    return (
      <>
        {loadButton}
        <span id="data">{data.test}</span>
      </>
    );
  }

  return loadButton;
};

const getProps = (): FetchSettings => ({
  url: "http://test.url",
  method: "GET",
});

describe("useApi", () => {
  test("returns empty state initially", () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    expect(wrapper.find("#data").exists()).toBe(false);
    expect(wrapper.find("#loading").exists()).toBe(false);
    expect(wrapper.find("#error").exists()).toBe(false);
  });

  test("returns loading state on loading", () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    wrapper.update();
    expect(wrapper.find("#data").exists()).toBe(false);
    expect(wrapper.find("#loading").exists()).toBe(true);
    expect(wrapper.find("#error").exists()).toBe(false);
  });

  test("fetches data from the server", async () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    const request = mockFetch.mock.calls[0][0] as Request;
    expect(request.url).toEqual("http://test.url");
    expect(request.method).toEqual("GET");
    expect(Array.from(request.headers.entries())).toEqual([
      ["content-type", "application/json"],
    ]);
    expect(await request.text()).toEqual("");
    await act(async () => {
      await mockFetchPromise.resolve({
        ok: true,
        json: () => Promise.resolve({ test: "testResult" }),
      });
    });
    wrapper.update();
    expect(wrapper.find("#loading").exists()).toBe(false);
    expect(wrapper.find("#error").exists()).toBe(false);
    expect(wrapper.find("#data").text()).toBe("testResult");
  });

  test("posts data to the server", async () => {
    const wrapper = mount(
      <TestComponent {...getProps()} method="POST" body={{ test: "body" }} />
    );
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    const request = mockFetch.mock.calls[0][0] as Request;
    expect(request.url).toEqual("http://test.url");
    expect(request.method).toEqual("POST");
    expect(Array.from(request.headers.entries())).toEqual([
      ["content-type", "application/json"],
    ]);
    expect(await request.json()).toEqual({ test: "body" });
    await act(async () => {
      await mockFetchPromise.resolve({
        ok: true,
        json: () => Promise.resolve(undefined),
      });
    });
    wrapper.update();
    expect(wrapper.find("#loading").exists()).toBe(false);
    expect(wrapper.find("#error").exists()).toBe(false);
    expect(wrapper.find("#data").exists()).toBe(false);
  });

  describe("with no error propagation to boundary", () => {
    test("returns error state on not ok response", async () => {
      const wrapper = mount(
        <ErrorBoundary>
          <TestComponent {...getProps()} noErrorPropagationBoundary />
        </ErrorBoundary>
      );
      act(() => {
        wrapper.find("#load").simulate("click");
      });
      await act(async () => {
        await mockFetchPromise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ error: "serverError" }),
        });
      });
      wrapper.update();
      expect(wrapper.find("#loading").exists()).toBe(false);
      expect(wrapper.find("#error").text()).toEqual("serverError (500)");
      expect(wrapper.find("#data").exists()).toBe(false);
    });

    test("returns error state on network failure", async () => {
      const wrapper = mount(
        <ErrorBoundary>
          <TestComponent {...getProps()} noErrorPropagationBoundary />
        </ErrorBoundary>
      );
      act(() => {
        wrapper.find("#load").simulate("click");
      });
      await act(async () => {
        await mockFetchPromise.reject(new Error("networkError"));
      });

      wrapper.update();
      expect(wrapper.find("#loading").exists()).toBe(false);
      expect(wrapper.find("#error").text()).toEqual("networkError");
      expect(wrapper.find("#data").exists()).toBe(false);
    });
  });

  describe("with error propagation to boundary", () => {
    test("returns error state on not ok response", async () => {
      const wrapper = mount(
        <ErrorBoundary>
          <TestComponent {...getProps()} />
        </ErrorBoundary>
      );
      act(() => {
        wrapper.find("#load").simulate("click");
      });
      await act(async () => {
        await mockFetchPromise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ error: "serverError" }),
        });
      });
      wrapper.update();
      expect(wrapper.find("#loading").exists()).toBe(false);
      expect(wrapper.find("#error").text()).toEqual(
        "Caught by error boundary: serverError (500)"
      );
      expect(wrapper.find("#data").exists()).toBe(false);
    });

    test("returns error state on network failure", async () => {
      const wrapper = mount(
        <ErrorBoundary>
          <TestComponent {...getProps()} />
        </ErrorBoundary>
      );
      act(() => {
        wrapper.find("#load").simulate("click");
      });
      await act(async () => {
        await mockFetchPromise.reject(new Error("networkError"));
      });

      wrapper.update();
      expect(wrapper.find("#loading").exists()).toBe(false);
      expect(wrapper.find("#error").text()).toEqual(
        "Caught by error boundary: networkError"
      );
      expect(wrapper.find("#data").exists()).toBe(false);
    });
  });

  test("cancells request on unmount", async () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    const request = mockFetch.mock.calls[0][0] as Request;
    expect(request.signal.aborted).toBe(false);
    wrapper.unmount();
    expect(request.signal.aborted).toBe(true);
  });

  test("cancells request on next load", async () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    const request = mockFetch.mock.calls[0][0] as Request;
    expect(request.signal.aborted).toBe(false);
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    expect(request.signal.aborted).toBe(true);
  });

  test("sets no error state on request abort", async () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    await act(async () => {
      const abortError = new Error();
      abortError.name = "AbortError";
      await mockFetchPromise.reject(abortError);
    });

    wrapper.update();
    expect(wrapper.find("#loading").exists()).toBe(true);
    expect(wrapper.find("#error").exists()).toBe(false);
    expect(wrapper.find("#data").exists()).toBe(false);
  });
});
