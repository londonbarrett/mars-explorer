import Providers from "@/components/providers";
import latestPhotos from "@/mocks/latest-photos.json";
import { render, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import routerMock from "next-router-mock";
import { ReactNode } from "react";
import Page from "./page";

jest.mock("next/navigation", () => {
  return {
    ...require("next-router-mock"),
    useSearchParams() {
      return new URLSearchParams(routerMock.query as Record<string, string>);
    },
  };
});

describe("Main App Page", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(latestPhotos),
    })
  ) as jest.Mock;
  const renderPage = async (params: any) =>
    render(await Page(params), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Providers>{children}</Providers>
      ),
    });
  it("Renders successfully", async () => {
    const { getAllByAltText } = await renderPage({});
    const images = getAllByAltText(/2023-08-06/, { exact: false });
    expect(images).toBeTruthy();
  });
  it("Sets URL query when interacting with filters", async () => {
    const { getByLabelText } = await renderPage({});
    const roverFilter = getByLabelText(/select a rover/i);
    await user.click(roverFilter);
    const opportunityOption = getByLabelText(/opportunity/i);
    await user.click(opportunityOption);
    const cameraFilter = getByLabelText(/select a camera/i);
    await user.click(cameraFilter);
    const navigationCameraOption = getByLabelText(/navigation camera/i);
    await user.click(navigationCameraOption);
    const date = getByLabelText(/select a date/i) as HTMLInputElement;
    fireEvent.change(date, { target: { value: "2023-01-09" } });
    expect(routerMock.asPath).toBe(
      "/?rover=opportunity&camera=navcam&date=2023-01-09"
    );
  });
});
