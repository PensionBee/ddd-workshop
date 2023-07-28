import { LargeSystemIcon } from "../Svg/Svg";
import { Box } from "../Box/Box";
import { useState } from "react";
import type { ReactPlayerProps } from "react-player/lazy";
import ReactPlayer from "react-player/lazy";
import { Modal } from "../Modal/Modal";
import { StyledPlayButton, StyledIconWrapper } from "./Video.styled";

export type VideoProps = {
  /** The url path to the video */
  src: string;
  /** Overrides the default video thumbnail */
  thumbnail?: string;
  /** Mutes the video player */
  muted?: ReactPlayerProps["muted"];
  /** The video controls */
  controls?: ReactPlayerProps["controls"];
  /** Set to true or false to loop the media */
  loop?: ReactPlayerProps["loop"];
  /** If in lazy mode */
  fallback?: ReactPlayerProps["fallback"];
  /** If the video should play in a modal */
  isModal?: boolean;
};

export const Video: React.FC<VideoProps> = ({
  src,
  thumbnail = "",
  muted = false,
  controls = true,
  loop = false,
  fallback,
  isModal = false,
  ...props
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInlineVideoOpen, setIsInlineVideoOpen] = useState(false);

  if (isModal) {
    return (
      <Box position="relative" w="100%" pb="56.25%">
        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
          <StyledPlayButton onClick={() => setIsVideoModalOpen(true)}>
            <StyledIconWrapper position="absolute" top="50%" left="50%">
              <LargeSystemIcon icon="Play" w={64} h={64} />
            </StyledIconWrapper>
            <img src={thumbnail} />
          </StyledPlayButton>
        </Box>
        <Modal
          isOpen={isVideoModalOpen}
          handleClose={() => setIsVideoModalOpen(false)}
          backgroundColor="transparent"
          wMax="100vw"
          hMax="100vh"
        >
          <Box d="flex">
            <ReactPlayer
              url={src}
              muted={muted}
              controls={controls}
              loop={loop}
              fallback={fallback}
              playing
              {...props}
            />
          </Box>
        </Modal>
      </Box>
    );
  }

  return (
    <Box position="relative" w="100%" pb="56.25%">
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        {!isInlineVideoOpen ? (
          <StyledPlayButton onClick={() => setIsInlineVideoOpen(true)}>
            <StyledIconWrapper position="absolute" top="50%" left="50%">
              <LargeSystemIcon icon="Play" w={64} h={64} />
            </StyledIconWrapper>
            <img src={thumbnail} />
          </StyledPlayButton>
        ) : (
          <ReactPlayer
            url={src}
            muted={muted}
            controls={controls}
            loop={loop}
            fallback={fallback}
            width="100%"
            height="100%"
            playing
            {...props}
          />
        )}
      </Box>
    </Box>
  );
};
