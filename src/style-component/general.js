import styled from "styled-components";
import theme from "../utils/variables";

const BodyStyled = styled.div`
  background-size: cover;
  line-height: 30px;
  padding: 0;
  word-spacing: 0px;
  background: ${theme.lightTheme.color.background};
  min-height: 100vh;
  color: ${theme.lightTheme.color.font};
`;

export default BodyStyled;
