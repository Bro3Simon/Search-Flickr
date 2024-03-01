import { Container } from "@mui/material";

import { SearchFlickr } from "app/components/SearchFlickr";

export default function Home() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        py: 8,
      }}
    >
      <SearchFlickr />
    </Container>
  );
}
