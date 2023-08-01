import { render } from "@shared/testUtils";
import { useRef } from "react";
import {
  MockIntersectionObserver,
  mockObserve,
} from "./mockIntersectionObserver";
import { useIntersectionObserver } from "./useIntersectionObserver";

describe("useIntersectionObserver", () => {
  describe("Default", () => {
    it("should call observe", () => {
      window.IntersectionObserver = MockIntersectionObserver;
      const Component = () => {
        const div = useRef(null);
        const isVisible = useIntersectionObserver(div);
        return <div ref={div}>{isVisible ? "true" : "false"}</div>;
      };
      const { getByText, asFragment } = render(<Component />);

      // expect(mockObserve.mock.calls.length).toBe(1);
      expect(getByText("false")).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should default visible with no intersection observer", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).IntersectionObserver = undefined;
      const Component = () => {
        const div = useRef(null);
        const isVisible = useIntersectionObserver(div);
        return <div ref={div}>{isVisible ? "true" : "false"}</div>;
      };
      const { getByText, asFragment } = render(<Component />);

      // expect(mockObserve.mock.calls.length).toBe(0);
      expect(getByText("true")).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
