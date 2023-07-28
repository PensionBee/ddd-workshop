import { Image } from "../Image/Image";
import { StyledAvatar } from "./Avatar.styled";

export type AvatarProps = {
  /** The url path to the avatar image */
  src: string;
  /** The avatar image size */
  size: number;
  /** Defines if the highlighted variant styles should be applied */
  isHighlighted?: boolean;
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size,
  isHighlighted = false,
  ...props
}) => {
  return (
    <StyledAvatar
      data-rc="Avatar"
      as="div"
      $h={size}
      $isHighlighted={isHighlighted}
      $w={size}
      {...props}
    >
      <Image src={src} h={size} w={size} />
    </StyledAvatar>
  );
};
