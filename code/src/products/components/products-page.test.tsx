import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { AppWrapper } from "#/test.utils";
import ProductsPage from "@/products/components/products-page";
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

describe("ProductsPage component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("loader visible", async () => {
    const mockGetApp = jest.spyOn(api, "getApp");
    mockGetApp.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ok: true, json: () => Promise.resolve([{ id: "product-id", name: "Product Name" }]) });
        }, 2000);
      });
    });
    render(
      <AppWrapper>
        <ProductsPage />
      </AppWrapper>,
    );
    expect(api.getApp).toHaveBeenCalledTimes(1);
    const productList = screen.queryByTestId("product-list");
    expect(productList).toBeNull();
    expect(screen.getByTestId("products-loader")).toBeInTheDocument();
  });
  test("fetches ok", async () => {
    const mockGetApp = jest.spyOn(api, "getApp");
    mockGetApp.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: "product-id", name: "Product Name" }]),
    });
    render(
      <AppWrapper>
        <ProductsPage />
      </AppWrapper>,
    );
    await waitFor(() => screen.getByTestId("product-list"));
    expect(api.getApp).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
    expect(screen.getByTestId("product-list-element-product-id")).toBeInTheDocument();
  });
  test("fetches failed", async () => {
    const mockGetApp = jest.spyOn(api, "getApp");
    mockGetApp.mockResolvedValue({ ok: false, status: "Mock Failed" });
    render(
      <AppWrapper>
        <ProductsPage />
      </AppWrapper>,
    );
    await waitFor(() => screen.getByTestId("product-list"));
    expect(api.getApp).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
    const productListItem = screen.queryByTestId("product-list-element-product-id");
    expect(productListItem).toBeNull();
  });
});
