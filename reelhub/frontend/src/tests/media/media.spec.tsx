import "@testing-library/jest-dom";
import { mediaApi } from "../../store/services/mediaApi";
import { screen, waitFor, render } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { server } from "./server";
import Recommended from "../../components/Recommended";
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
        <Recommended />
      </ApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Beyond Earth")).toBeInTheDocument();
    });
  });
});
