import { ThemeRegistry } from "app/ThemeRegistry";
import { Children } from "app/types/commonProps";

import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "A compact yet robust application that empowers users to search Flickr, exemplifying my expertise in connecting to and efficiently consuming APIs. This demonstrates my ability to seamlessly integrate external resources, thereby enhancing the functionality and overall user experience of the application.",
  title: "Search Flickr",
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
