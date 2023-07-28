import type { NavMenuItem } from "./Nav.types";

// Example content used in tests and stories

export const VISIBLE_LINK: NavMenuItem = {
  children: "Visible Item",
  href: "/",
};
export const HIDDEN_LINK: NavMenuItem = {
  children: "Hidden Item",
  href: "/",
  hidden: true,
};
export const SUB_LIST_ITEM: NavMenuItem = {
  children: "SubList Item",
  subList: [VISIBLE_LINK],
};
export const HIDDEN_SUB_LIST_ITEM: NavMenuItem = {
  children: "Hidden SubList Item",
  subList: [VISIBLE_LINK],
  hidden: true,
};

export const LIST = [VISIBLE_LINK] satisfies NavMenuItem[];
export const LIST_WITH_HIDDEN_LINK = [HIDDEN_LINK] satisfies NavMenuItem[];
export const LIST_WITH_SUB_LIST_ITEM = [SUB_LIST_ITEM] satisfies NavMenuItem[];
export const LIST_WITH_MIXED_ITEMS = [
  VISIBLE_LINK,
  HIDDEN_LINK,
  SUB_LIST_ITEM,
  HIDDEN_SUB_LIST_ITEM,
] satisfies NavMenuItem[];
