import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom"

import HomeScreen from "./app/screens/Home"

import "./theme.css"

const theme = extendTheme({
  colors: {
    primary: "#283f9c",
    secondary: "",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <HomeScreen />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
