import { useState } from "react";

import type { StyledImageProps } from "./Image.styled";
import { StyledImage } from "./Image.styled";
import { Box } from "../Box/Box";
import { LazyLoad } from "../LazyLoad/LazyLoad";

export type ImageProps = {
  /** The image alt text (use something unique and descriptive to support screen readers) */
  alt?: StyledImageProps["alt"];
  /** The image height */
  h?: StyledImageProps["$h"];
  /** Placeholder thumbnail URL to use before image is loaded */
  lazyPlaceholder?: string;
  /** The maximum width */
  wMax?: StyledImageProps["$wMax"];
  /** The maximum height */
  hMax?: StyledImageProps["$hMax"];
  /** Sizes for use with srcset option */
  sizes?: string;
  /** The url path to the avatar image */
  src: StyledImageProps["src"];
  /** Srcset option */
  srcset?: string;
  /** The image width */
  w?: StyledImageProps["$w"];
};

export const Image: React.FC<ImageProps> = ({
  alt,
  h,
  src,
  w,
  lazyPlaceholder,
  hMax,
  wMax,
  sizes,
  srcset,
  ...props
}) => {
  const [isError, setIsError] = useState(false);

  const imageProps = {
    alt,
    sizes,
    srcset,
  };

  const styledImageProps = {
    $h: h,
    $w: w,
    $hMax: hMax,
    $wMax: wMax,
  };

  const handleError = () => setIsError(true);

  const placeholderImage = lazyPlaceholder && (
    <StyledImage
      src={lazyPlaceholder}
      {...styledImageProps}
      {...imageProps}
      {...props}
      $blur
    />
  );

  if (isError) {
    return <Box h={h || hMax} w={w || wMax} {...props} />;
  }

  if (placeholderImage) {
    return (
      <LazyLoad placeholder={placeholderImage}>
        <StyledImage
          src={src}
          onError={handleError}
          {...styledImageProps}
          {...imageProps}
          {...props}
        />
      </LazyLoad>
    );
  }

  return (
    <StyledImage
      src={src}
      onError={handleError}
      {...styledImageProps}
      {...imageProps}
      {...props}
    />
  );
};
