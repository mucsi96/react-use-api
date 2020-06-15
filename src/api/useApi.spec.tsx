import { mount } from "enzyme";
import React, { FC, ReactElement, useEffect } from "react";
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
  const fetch = useApi();

  useEffect(() => {
    fetch(props).then(resultCallback);
  }, []);

  return null;
};

describe("useApi", () => {
  test("fetches data from server", async () => {
    mount(<TestComponent url="http://test.url" method="GET" />);
    expect(mockFetch).toBeCalledWith("http://test.url", {
      body: undefined,
      headers: [["Content-Type", "application/json"]],
      method: "GET",
    });
    expect(resultCallback).not.toBeCalled();
    await act(async () => {
      await mockFetchPromise.resolve({
        json: () => Promise.resolve({ test: "result" }),
      });
    });
    expect(resultCallback).toBeCalledWith({ test: "result" });
  });

  test("posts data to server", async () => {
    mount(
      <TestComponent
        url="http://test.url"
        method="POST"
        body={{ test: "body" }}
      />
    );
    expect(mockFetch).toBeCalledWith("http://test.url", {
      body: JSON.stringify({ test: "body" }),
      headers: [["Content-Type", "application/json"]],
      method: "POST",
    });
  });
});
