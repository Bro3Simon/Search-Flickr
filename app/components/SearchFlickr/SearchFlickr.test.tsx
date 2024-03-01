import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { SearchFlickr } from "app/components/SearchFlickr/SearchFlickr";
import * as service from "app/components/SearchFlickr/service";
import { DEFAULT_FORM_MESSAGE } from "app/components/SearchFlickr/useSearchFlickr";

jest.mock("app/components/SearchFlickr/service", () => ({
  __esModule: true,
  ...jest.requireActual("app/components/SearchFlickr/service"),
  getImages: () =>
    new Promise((resolve) =>
      // A small timeout is used to test that the textbox is disabled
      // while performing the search.
      setTimeout(() => {
        resolve("done");
      }, 100),
    ),
}));

describe("test SearchFlickr", () => {
  test("renders a textbox", () => {
    render(<SearchFlickr />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders a button", () => {
    render(<SearchFlickr />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders a form photo initially", async () => {
    render(<SearchFlickr />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("renders the correct form message initially", async () => {
    render(<SearchFlickr />);

    expect(screen.getByText(DEFAULT_FORM_MESSAGE)).toBeInTheDocument();
  });

  describe("spy on getImages", () => {
    const searchCriteria = "canoes";

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("does not search flickr when the required field is empty", async () => {
      const getImagesSpy = jest.spyOn(service, "getImages");
      const user = userEvent.setup();

      render(<SearchFlickr />);

      await user.click(screen.getByRole("button"));
      expect(getImagesSpy).not.toHaveBeenCalled();
    });

    test("textbox is disabled while performing the search", async () => {
      const user = userEvent.setup();

      render(<SearchFlickr />);

      const textbox = screen.getByRole("textbox");

      await user.type(textbox, searchCriteria);
      await user.click(screen.getByRole("button"));
      expect(textbox).toBeDisabled();
    });

    test("searches flickr with the correct input", async () => {
      const getImagesSpy = jest.spyOn(service, "getImages");
      const user = userEvent.setup();

      render(<SearchFlickr />);

      await user.type(screen.getByRole("textbox"), searchCriteria);
      await user.click(screen.getByRole("button"));
      expect(getImagesSpy).toHaveBeenCalledWith(searchCriteria);
    });
  });
});
