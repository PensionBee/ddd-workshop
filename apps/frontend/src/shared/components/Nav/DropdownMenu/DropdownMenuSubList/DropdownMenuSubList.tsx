import type { NavMenuItem } from "../../Nav.types";
import { DropdownMenuItem } from "../DropdownMenuItem/DropdownMenuItem";
import { DropdownMenuItemWithSubList } from "../DropdownMenuItemWithSubList/DropdownMenuItemWithSubList";

export type DropdownMenuSubListProps = {
  subList: NavMenuItem["subList"];
  setIsDropdownOpen?: (isOpen: boolean) => void;
};

export const DropdownMenuSubList: React.FC<DropdownMenuSubListProps> = ({
  subList,
  setIsDropdownOpen,
}) => {
  return (
    <>
      {subList?.map((item) => {
        if (item.hidden) return null;
        if (item.subList?.length) {
          return (
            <DropdownMenuItemWithSubList
              key={item.children}
              setIsDropdownOpen={setIsDropdownOpen}
              {...item}
            />
          );
        }
        return (
          <DropdownMenuItem
            key={item.children}
            {...item}
            href={item.href || ""}
          />
        );
      })}
    </>
  );
};
