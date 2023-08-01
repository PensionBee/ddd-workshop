import { render } from "@shared/testUtils";
import { Portal } from "./Portal";

describe("Portal", () => {
  const PORTAL_CONTENT = "Portal Content";

  describe("Default", () => {
    it("should render inside the default portal", () => {
      const { asFragment } = render(<Portal>{PORTAL_CONTENT}</Portal>);
      const portalRoot = document.querySelector("#portal-root");
      expect(portalRoot?.innerHTML).toBe(PORTAL_CONTENT);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("With wrapperId", () => {
    it("should render inside the specified wrapper", () => {
      const PORTAL_KEY = "portal-key";
      const { asFragment } = render(
        <Portal wrapperId={PORTAL_KEY}>{PORTAL_CONTENT}</Portal>
      );
      const portalRootFromKey = document.querySelector(`#${PORTAL_KEY}`);
      expect(portalRootFromKey?.innerHTML).toBe(PORTAL_CONTENT);
      expect(asFragment()).toMatchSnapshot();
    });

    it("should create wrapper if not exists", () => {
      const PORTAL_KEY = "portal-key";
      const { asFragment } = render(
        <Portal wrapperId={PORTAL_KEY}>{PORTAL_CONTENT}</Portal>
      );
      const portalRootFromKey = document.querySelector(`#${PORTAL_KEY}`);
      expect(portalRootFromKey).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should use wrapper if already exists", () => {
      const PORTAL_KEY = "portal-key";
      const { asFragment } = render(
        <>
          <Portal wrapperId={PORTAL_KEY}>{PORTAL_CONTENT}</Portal>
          <div id={PORTAL_KEY} />
        </>
      );
      const portalRootFromKey = document.querySelector(`#${PORTAL_KEY}`);
      expect(portalRootFromKey).toBeInTheDocument();
      expect(portalRootFromKey?.innerHTML).toBe(PORTAL_CONTENT);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
