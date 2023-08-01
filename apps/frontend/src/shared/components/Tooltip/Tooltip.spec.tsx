import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("should render correctly", async () => {
    const TOOLTIP_CONTENT = "Tooltip Content";
    const TOOLTIP_TITLE = "Tooltip";
    const { queryByText, asFragment } = render(
      <Tooltip content={TOOLTIP_CONTENT}>{TOOLTIP_TITLE}</Tooltip>
    );
    expect(queryByText(TOOLTIP_TITLE)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
