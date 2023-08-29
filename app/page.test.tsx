import { render } from "@testing-library/react";
import Page from "./page";
import { ReactNode } from "react";
import latestPhotos from "@/mocks/latest-photos.json";

describe("Main App Page", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(latestPhotos),
    })
  ) as jest.Mock;
  const renderPage = async () => render(await Page());
  it("Renders successfully", async () => {
    const { getAllByAltText } = await renderPage();
    const images = getAllByAltText(/2023-08-06/, { exact: false });
    expect(images).toBeTruthy();
  });
});
