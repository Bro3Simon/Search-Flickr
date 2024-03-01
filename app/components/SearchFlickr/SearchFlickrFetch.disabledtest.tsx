// import {
//   render,
//   screen,
//   waitForElementToBeRemoved,
// } from "@testing-library/react";
// import { userEvent } from "@testing-library/user-event";
// import { rest } from "msw";
// import { setupServer } from "msw/node";

// import { SearchFlickr } from "app/components/SearchFlickr";
// import {
//   ERROR_MESSAGE,
//   LOADING_MESSAGE,
//   NO_RESULTS_FOUND_MESSAGE,
// } from "app/components/SearchFlickr/useSearchFlickr";

// describe("mock API calls", () => {
//   const API_URL = "https://www.flickr.com/services/rest/*";
//   const MOCK_NO_RESULTS_FOUND_RESPONSE = {
//     photos: {
//       page: 1,
//       pages: 0,
//       perpage: 12,
//       photo: [],
//       total: 0,
//     },
//     stat: "ok",
//   };
//   const MOCK_SUCCESS_RESPONSE = {
//     photos: {
//       page: 1,
//       pages: 7232,
//       perpage: 12,
//       photo: [
//         {
//           farm: 66,
//           id: "53172913670",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "145904679@N04",
//           secret: "ea02b7f0fb",
//           server: "65535",
//           title: "XE3B6092 - Río Namorona - Namorona river (Madagascar)",
//         },
//         {
//           farm: 66,
//           id: "53172133239",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "184547423@N07",
//           secret: "1d412383b8",
//           server: "65535",
//           title: "Fog starting to come in",
//         },
//         {
//           farm: 66,
//           id: "53171347032",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "184547423@N07",
//           secret: "a9fa45537e",
//           server: "65535",
//           title: "Moonglow over a fishing boat",
//         },
//         {
//           farm: 66,
//           id: "53169912700",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "41768085@N05",
//           secret: "f81abd69dc",
//           server: "65535",
//           title: "Chinook canoe",
//         },
//         {
//           farm: 66,
//           id: "53169631188",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "95070668@N02",
//           secret: "f73b92690d",
//           server: "65535",
//           title: "Old Felixstowe & Felixstowe Ferry 1",
//         },
//         {
//           farm: 66,
//           id: "53168554607",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "95070668@N02",
//           secret: "ecc55e5c11",
//           server: "65535",
//           title: "Old Felixstowe & Felixstowe Ferry 2",
//         },
//         {
//           farm: 66,
//           id: "53169341979",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "95070668@N02",
//           secret: "01944669ce",
//           server: "65535",
//           title: "Old Felixstowe & Felixstowe Ferry 3",
//         },
//         {
//           farm: 66,
//           id: "53169579405",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "95070668@N02",
//           secret: "94acc6b99e",
//           server: "65535",
//           title: "Old Felixstowe & Felixstowe Ferry 4",
//         },
//         {
//           farm: 66,
//           id: "53169630363",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "95070668@N02",
//           secret: "ae66867f44",
//           server: "65535",
//           title: "Old Felixstowe & Felixstowe Ferry 5",
//         },
//         {
//           farm: 66,
//           id: "53169579135",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "95070668@N02",
//           secret: "2e12f94cbd",
//           server: "65535",
//           title: "Old Felixstowe & Felixstowe Ferry 6",
//         },
//         {
//           farm: 66,
//           id: "53169629833",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "95070668@N02",
//           secret: "dc1dc6c3a0",
//           server: "65535",
//           title: "Old Felixstowe & Felixstowe Ferry 7",
//         },
//         {
//           farm: 66,
//           id: "53169629663",
//           isfamily: 0,
//           isfriend: 0,
//           ispublic: 1,
//           owner: "95070668@N02",
//           secret: "4f85dcb3f1",
//           server: "65535",
//           title: "Old Felixstowe & Felixstowe Ferry 8",
//         },
//       ],
//       total: 86775,
//     },
//     stat: "ok",
//   };
//   const server = setupServer(
//     rest.get(API_URL, (request, response, context) =>
//       response(context.json(MOCK_SUCCESS_RESPONSE)),
//     ),
//   );

//   function useDelayedResponse() {
//     return server.use(
//       rest.get(API_URL, (request, response, context) =>
//         response(context.delay(100), context.json(MOCK_SUCCESS_RESPONSE)),
//       ),
//     );
//   }

//   function useErrorResponse() {
//     return server.use(
//       rest.get(API_URL, (request, response, context) =>
//         response(context.status(500)),
//       ),
//     );
//   }

//   function useNoResultsFoundResponse() {
//     return server.use(
//       rest.get(API_URL, (request, response, context) =>
//         response(context.json(MOCK_NO_RESULTS_FOUND_RESPONSE)),
//       ),
//     );
//   }

//   beforeAll(() => server.listen());
//   afterEach(() => server.resetHandlers());
//   afterAll(() => server.close());

//   test("renders the correct error message", async () => {
//     const user = userEvent.setup();

//     useErrorResponse();
//     render(<SearchFlickr />);

//     await user.type(screen.getByRole("textbox"), "canoes");
//     await user.click(screen.getByRole("button"));
//     await screen.findByText(ERROR_MESSAGE, { exact: false });
//     expect(
//       screen.getByText(ERROR_MESSAGE, { exact: false }),
//     ).toBeInTheDocument();
//   });

//   test("renders the correct no results found message", async () => {
//     const user = userEvent.setup();

//     useNoResultsFoundResponse();
//     render(<SearchFlickr />);

//     await user.type(screen.getByRole("textbox"), "canoes");
//     await user.click(screen.getByRole("button"));
//     await screen.findByText(NO_RESULTS_FOUND_MESSAGE);
//     expect(screen.getByText(NO_RESULTS_FOUND_MESSAGE)).toBeInTheDocument();
//   });

//   test("textbox is disabled while submitting", async () => {
//     const user = userEvent.setup();

//     useDelayedResponse();
//     render(<SearchFlickr />);

//     await user.type(screen.getByRole("textbox"), "canoes");
//     await user.click(screen.getByRole("button"));
//     expect(screen.getByRole("textbox")).toBeDisabled();
//   });

//   test("button is disabled while submitting", async () => {
//     const user = userEvent.setup();

//     useDelayedResponse();
//     render(<SearchFlickr />);
//     const button = screen.getByRole("button");

//     await user.type(screen.getByRole("textbox"), "canoes");
//     await user.click(button);
//     expect(button).toBeDisabled();
//   });

//   test("renders the correct loading message", async () => {
//     const user = userEvent.setup();

//     useDelayedResponse();
//     render(<SearchFlickr />);

//     await user.type(screen.getByRole("textbox"), "canoes");
//     await user.click(screen.getByRole("button"));
//     expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();
//   });

//   test("renders all the images returned from Flickr", async () => {
//     const user = userEvent.setup();

//     useDelayedResponse();
//     render(<SearchFlickr />);

//     await user.type(screen.getByRole("textbox"), "canoes");
//     await user.click(screen.getByRole("button"));
//     await waitForElementToBeRemoved(screen.queryByText(LOADING_MESSAGE));

//     MOCK_SUCCESS_RESPONSE.photos.photo.forEach(
//       ({ id, secret, server, title }) => {
//         const sizeSuffix = "q";

//         expect(screen.getByRole("img", { name: title })).toHaveAttribute(
//           "src",
//           `https://live.staticflickr.com/
// ${server}/${id}_${secret}_${sizeSuffix}.jpg`,
//         );
//       },
//     );
//   });
// });
