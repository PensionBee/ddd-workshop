import { act, fireEvent, routerRender, vi } from "@shared/testUtils";
import { useRef } from "react";
import { StyledContentList } from "../../DropdownMenu/DropdownMenu.styled";
import { DropdownMenuSubList } from "../../DropdownMenu/DropdownMenuSubList/DropdownMenuSubList";
import { useArrowNavigation } from "./useArrowNavigation";

const SUBLIST = [
  {
    children: "Test",
    href: "/test",
  },
  {
    children: "Test 2",
    href: "/test2",
  },
];

const ArrowNavigationComponent = ({ isDisabled }: { isDisabled?: boolean }) => {
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useArrowNavigation(dropdownRef, {
    direction: "vertical",
    disabled: isDisabled,
  });

  return (
    <StyledContentList ref={dropdownRef}>
      <DropdownMenuSubList subList={SUBLIST} />
    </StyledContentList>
  );
};

const NoRefArrowNavigationComponent = () => {
  const dropdownRef = {} as React.MutableRefObject<HTMLUListElement | null>;

  useArrowNavigation(dropdownRef, {
    direction: "vertical",
  });

  return (
    <StyledContentList>
      <DropdownMenuSubList subList={SUBLIST} />
    </StyledContentList>
  );
};

describe("useArrowNavigation", () => {
  it("should use arrow navigation", () => {
    const { getByText } = routerRender(<ArrowNavigationComponent />);
    const firstLink = getByText("Test").closest("a");
    const secondLink = getByText("Test 2").closest("a");

    act(() => firstLink?.focus());
    expect(document.activeElement).toBe(firstLink);
    expect(firstLink).toHaveFocus();

    act(
      () =>
        firstLink &&
        fireEvent.keyDown(firstLink, {
          key: "ArrowDown",
          code: "ArrowDown",
          charCode: 40,
        })
    );
    expect(secondLink).toHaveFocus();

    act(
      () =>
        firstLink &&
        fireEvent.keyDown(firstLink, {
          key: "ArrowUp",
          code: "ArrowUp",
          charCode: 38,
        })
    );
    expect(firstLink).toHaveFocus();
  });

  it("should not use arrow navigation when disabled", () => {
    const { getByText } = routerRender(<ArrowNavigationComponent isDisabled />);
    const firstLink = getByText("Test").closest("a");

    act(() => firstLink?.focus());
    expect(firstLink).toHaveFocus();

    act(
      () =>
        firstLink &&
        fireEvent.keyDown(firstLink, {
          key: "ArrowDown",
          code: "ArrowDown",
          charCode: 40,
        })
    );
    expect(firstLink).toHaveFocus();

    act(
      () =>
        firstLink &&
        fireEvent.keyDown(firstLink, {
          key: "ArrowUp",
          code: "ArrowUp",
          charCode: 38,
        })
    );
    expect(firstLink).toHaveFocus();
  });

  it("should not fire callback when no ref is provided", () => {
    const { getByText } = routerRender(<NoRefArrowNavigationComponent />);
    const firstLink = getByText("Test").closest("a");

    act(() => firstLink?.focus());
    expect(firstLink).toHaveFocus();

    act(
      () =>
        firstLink &&
        fireEvent.keyDown(firstLink, {
          key: "ArrowDown",
          code: "ArrowDown",
          charCode: 40,
        })
    );
    expect(firstLink).toHaveFocus();

    act(
      () =>
        firstLink &&
        fireEvent.keyDown(firstLink, {
          key: "ArrowUp",
          code: "ArrowUp",
          charCode: 38,
        })
    );
    expect(firstLink).toHaveFocus();
  });
});
