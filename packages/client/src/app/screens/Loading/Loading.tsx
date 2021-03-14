import {Box, Spinner} from "@chakra-ui/react"
import * as React from "react"

const Loading: React.FC = () => {
  return (
    <Box bg="red" h="100vh" w="100%">
      <Spinner size="2xl" color="blue.600" />
    </Box>
  )
}

export default Loading
