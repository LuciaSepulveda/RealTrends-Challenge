import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {createBreakpoints} from "@chakra-ui/theme-tools"
import React from "react"
import ReactDOM from "react-dom"

import HomeScreen from "./app/screens/Home"

import "./theme.css"

const breakPoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
})

const theme = extendTheme({
  colors: {
    primary: "#283f9c",
  },
  breakPoints,
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <HomeScreen />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
