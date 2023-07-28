import styled from "styled-components";

export const StyledContentList = styled("ul")`
  display: grid;
  padding: 16px 0px;
  margin: 0px;
  column-gap: 10px;
  list-style: none;
  @media only screen and (min-width: 600px) {
    width: 250px;
  }
`;
