import { theme } from "@shared/styling/theme";
import styled from "styled-components";

export const StyledSignatureButton = styled.button`
  border-width: 0px;
  border-radius: 10px;
  text-align: center;
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  transition: color 250ms ease, background-color 250ms ease;
  display: flex;
  position: absolute;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background-color: ${() => theme.colors.white};
  border: 1px solid ${() => theme.colors.grey4};
  margin: 7px;
  margin-left: 80%;
  padding: 10px 20px;
  &:hover {
    background-color: ${() => theme.colors.grey7};
  }
  color: ${() => theme.colors.grey1};
  font-size: 1.75rem;
  font-weight: 450;
`;

export const StyledSignatureLine = styled.div`
  align-self: end;
  margin-bottom: 40px;
  height: fit-content;
  width: 80%;
  border-bottom: 1px solid ${() => theme.colors.grey4};
  display: flex;
  position: absolute;
  pointer-events: none;
`;

export const StyledSignatureError = styled.div`
  background-color: ${() => theme.colors.red100};
  border-radius: 5px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 500px;
`;

export const StyledSignatureErrorCaret = styled.span`
  border-bottom: 10px solid ${() => theme.colors.red100};
  border-left: 6px solid rgba(0, 0, 0, 0);
  border-right: 6px solid rgba(0, 0, 0, 0);
  margin-left: 20px;
  content: "";
  display: inline-block;
  position: relative;
  top: -12px;
  height: 0;
  vertical-align: top;
  width: 0;
`;
