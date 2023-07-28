import { LargeSystemIcon } from "@shared/components/Svg";
import styled from "styled-components";

export const StyledCaret = styled(LargeSystemIcon)`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%) rotate(-180deg);
  transition: transform 250ms ease;
  [data-state="open"] & {
    transform: translateY(-50%) rotate(0deg);
  }
`;

export const StyledAccordionButton = styled.button`
  cursor: pointer;
  position: relative;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
`;
