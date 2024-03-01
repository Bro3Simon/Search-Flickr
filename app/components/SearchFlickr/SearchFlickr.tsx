"use client";

import { LoadingButton } from "@mui/lab";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

import { FormTextField } from "app/components/FormTextField";
import { useSearchFlickr } from "app/components/SearchFlickr/useSearchFlickr";
import { REQUIRED_RULE } from "app/utilities";

const xsSize = 150;
const smSize = 300;
const mdSize = 400;
const imageSizes = { md: mdSize, sm: smSize, xs: xsSize };

export function SearchFlickr() {
  const {
    control,
    formImage,
    formImageAltText,
    formMessage,
    handleSubmit,
    isSubmitting,
    photos,
    warningColor,
  } = useSearchFlickr();

  return (
    <Card>
      <CardContent>
        <Box
          alignItems="baseline"
          component="form"
          display="flex"
          gap={2}
          justifyContent="center"
          mb={2}
          onSubmit={handleSubmit}
        >
          <FormTextField
            control={control}
            label="Search Criteria"
            name="searchCriteria"
            rules={REQUIRED_RULE}
          />

          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
          >
            Search
          </LoadingButton>
        </Box>

        {!photos.length ? (
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography>{formMessage}</Typography>

            <Box
              height={imageSizes}
              overflow="hidden"
              position="relative"
              width={imageSizes}
            >
              <Image
                alt={formImageAltText}
                fill
                sizes={`(min-width: 600px) ${smSize}px, (min-width: 900px) ${mdSize}px, ${xsSize}px`}
                src={formImage.src}
              />
            </Box>
          </Box>
        ) : (
          <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
            {photos.map(({ title, url }) => (
              <Image
                alt={title}
                height={150}
                key={url}
                src={url}
                style={{
                  borderColor: warningColor,
                  borderRadius: 4,
                  borderStyle: "solid",
                  borderWidth: 2,
                }}
                width={150}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
