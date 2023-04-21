import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { AppWrapper } from "#/test.utils";
import ContainersPage from "@/containers/components/containers-page";
import api from "@/utils/api";

jest.mock("@/utils/api");

jest.mock(
  "react-virtualized-auto-sizer",
  () =>
    ({ children }: { children: (size: { width: number; height: number }) => React.ReactNode }) => {
      return children({ width: 1280, height: 1024 });
    },
);

Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  },
});

describe("ContainersPage component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("loader visible", async () => {
    const mockGetApp = jest.spyOn(api, "getApp");
    mockGetApp.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ok: true, json: () => Promise.resolve([{ id: "container-id", name: "Product Name" }]) });
        }, 2000);
      });
    });
    render(
      <AppWrapper>
        <ContainersPage />
      </AppWrapper>,
    );
    expect(api.getApp).toHaveBeenCalledTimes(1);
    const containerList = screen.queryByTestId("container-list");
    expect(containerList).toBeNull();
    expect(screen.getByTestId("containers-loader")).toBeInTheDocument();
  });
  test("fetches ok", async () => {
    const mockGetApp = jest.spyOn(api, "getApp");
    mockGetApp.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: "container-id", name: "Product Name" }]),
    });
    render(
      <AppWrapper>
        <ContainersPage />
      </AppWrapper>,
    );
    await waitFor(() => screen.getByTestId("container-list"));
    expect(api.getApp).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("container-list")).toBeInTheDocument();
    expect(screen.getByTestId("container-list-element-container-id")).toBeInTheDocument();
  });
  test("fetches failed", async () => {
    const mockGetApp = jest.spyOn(api, "getApp");
    mockGetApp.mockResolvedValue({ ok: false, status: "Mock Failed" });
    render(
      <AppWrapper>
        <ContainersPage />
      </AppWrapper>,
    );
    await waitFor(() => screen.getByTestId("container-list"));
    expect(api.getApp).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("container-list")).toBeInTheDocument();
    const containerListItem = screen.queryByTestId("container-list-element-container-id");
    expect(containerListItem).toBeNull();
  });
});
