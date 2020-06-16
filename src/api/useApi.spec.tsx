import { mount } from "enzyme";
import React, { FC, ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { createMockPromise, MockPromise } from "../test/mockPromise";
import { FetchSettings, useApi } from "./useApi";

type FetchResponse = {
  json: () => Promise<object>;
};

let mockFetchPromise: MockPromise<FetchResponse>;
let mockFetch: jest.Mock<MockPromise<FetchResponse>>;
const resultCallback = jest.fn();

beforeEach(() => {
  mockFetchPromise = createMockPromise<FetchResponse>();
  mockFetch = jest.fn(() => mockFetchPromise);
  global.fetch = mockFetch;
});

const TestComponent: FC<FetchSettings> = (props): ReactElement => {
  const [data, load, loading, error] = useApi<
    { test: string },
    { error: string }
  >(props);
  const loadButton = (
    <button type="button" id="load" onClick={load}>
      Load
    </button>
  );

  if (error) {
    return <span id="error">{error.error}</span>;
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
  test("returns no data initially", () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    expect(wrapper.find("#data").exists()).toBe(false);
  });

  test("returns no loading state initially", () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    expect(wrapper.find("#loading").exists()).toBe(false);
  });

  test("returns no error state initially", () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    expect(wrapper.find("#error").exists()).toBe(false);
  });

  test("returns loading state on loading", () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    wrapper.update();
    expect(wrapper.find("#loading").exists()).toBe(true);
  });

  test("fetches data from the server", async () => {
    const wrapper = mount(<TestComponent {...getProps()} />);
    act(() => {
      wrapper.find("#load").simulate("click");
    });
    expect(mockFetch).toBeCalledWith("http://test.url", {
      body: undefined,
      headers: [["Content-Type", "application/json"]],
      method: "GET",
    });
    await act(async () => {
      await mockFetchPromise.resolve({
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
    expect(mockFetch).toBeCalledWith("http://test.url", {
      body: JSON.stringify({ test: "body" }),
      headers: [["Content-Type", "application/json"]],
      method: "POST",
    });
    await act(async () => {
      await mockFetchPromise.resolve({
        json: () => Promise.resolve(undefined),
      });
    });
    wrapper.update();
    expect(wrapper.find("#loading").exists()).toBe(false);
    expect(wrapper.find("#error").exists()).toBe(false);
    expect(wrapper.find("#data").exists()).toBe(false);
  });
});
