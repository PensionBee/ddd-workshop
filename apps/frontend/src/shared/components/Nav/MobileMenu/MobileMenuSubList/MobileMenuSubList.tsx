import type { NavMenuItem } from "../../Nav.types";
import { MobileMenuItem } from "../MobileMenuItem/MobileMenuItem";
import { MobileMenuItemWithSubList } from "../MobileMenuItemWithSubList/MobileMenuItemWithSubList";

export type MobileMenuSubListProps = {
  subList: NavMenuItem["subList"];
};

export const MobileMenuSubList: React.FC<MobileMenuSubListProps> = ({
  subList,
}) => {
  return (
    <>
      {subList?.map((item) => {
        if (item.hidden) return null;
        if (item.subList?.length) {
          return <MobileMenuItemWithSubList key={item.children} {...item} />;
        }
        return (
          <MobileMenuItem key={item.children} href={item.href || ""}>
            {item.children}
          </MobileMenuItem>
        );
      })}
    </>
  );
};
