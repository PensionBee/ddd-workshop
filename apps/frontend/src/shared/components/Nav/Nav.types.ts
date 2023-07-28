import type { LargeSystemIcon } from "@shared/components/Svg";

export type NavMenuItem = {
  children: string;
  href?: string;
  subList?: NavMenuItem[];
  hidden?: boolean;
  icon?: React.ComponentProps<typeof LargeSystemIcon>["icon"];
};
