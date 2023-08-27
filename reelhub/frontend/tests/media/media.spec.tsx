import "@testing-library/jest-dom";
import { mediaApi } from "../../src/store/services/mediaApi";
import { screen, waitFor, render } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { server } from "./server";
import Trending from "../../src/components/Trending";
// import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";

describe("Media", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display media", async () => {
    render(
      <ApiProvider api={mediaApi}>
        <Trending />
      </ApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Beyond Earth")).toBeInTheDocument();
    });
  });
});
