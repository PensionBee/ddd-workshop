import React, { useRef } from "react";
import { useIntersectionObserver } from "@shared/hooks/useIntersectionObserver/useIntersectionObserver";
import { StyledLazyLoad } from "./LazyLoad.styled";

export type LazyLoadProps = {
  /** React children */
  children: React.ReactNode;
  /** Placeholder element */
  placeholder: React.ReactNode;
};

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  placeholder,
  ...props
}) => {
  const lazyContainer = useRef(null);
  const isVisible = useIntersectionObserver(lazyContainer, true);

  if (!isVisible) {
    return (
      <StyledLazyLoad ref={lazyContainer} {...props}>
        {placeholder}
      </StyledLazyLoad>
    );
  }

  return (
    <StyledLazyLoad ref={lazyContainer} {...props}>
      {children}
    </StyledLazyLoad>
  );
};
