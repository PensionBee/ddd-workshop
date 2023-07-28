import { mediaFrom } from "@shared/styling/mediaQueries";
import styled from "styled-components";

export const StyledMenuDrawer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  transform: translateX(320px);
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  overflow: hidden;
  padding: 50px 0 20px;
  box-sizing: border-box;
  box-shadow: 0 0 0px rgb(174 190 210 / 40%);
  bottom: 0;
  z-index: 1;
  transition: transform 350ms ease, box-shadow 350ms ease;
  max-width: 100%;
  [data-close] {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
  }
  &[data-open="true"] {
    transform: translate(0);
    box-shadow: 0 0 20px rgb(174 190 210 / 40%);
  }
  ${mediaFrom.md} {
    padding: 108px 0 20px;
  }
`;

export const StyledMenuButton = styled.button`
  cursor: pointer;
`;
