import Router from "./Router";
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router />
    </>
  )
}

export default App;
