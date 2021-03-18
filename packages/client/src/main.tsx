import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {createBreakpoints} from "@chakra-ui/theme-tools"
import React from "react"
import ReactDOM from "react-dom"

import HomeScreen from "./app/screens/Home"

import "./theme.css"

const breakPoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
})

const theme = extendTheme({
  colors: {
    primary: "#283f9c",
    secondary: "",
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
