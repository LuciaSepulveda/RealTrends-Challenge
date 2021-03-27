import {Img, Text, Box, Button} from "@chakra-ui/react"
import * as React from "react"

import {urlImage} from "~/api/api"

interface Props {
  url: string
  name: string
  disabled: boolean
  select?: () => void
  key?: number
}

const Option: React.FC<Props> = ({url, name, disabled, select, key}) => {
  const [marginTop, setMarginTop] = React.useState<string>("0px")
  const [shadow, setShadow] = React.useState<string>("md")

  return (
    <Box
      key={key}
      boxShadow={shadow}
      transform={`translateY(${marginTop})`}
      transition="0.5s"
      onMouseEnter={() => {
        setMarginTop("-10px")
        setShadow("lg")
      }}
      onMouseLeave={() => {
        setMarginTop("0px")
        setShadow("md")
      }}
    >
      <Button w="100%" disabled={disabled} h="100%" onClick={select}>
        <Box m="auto" p={2} w="100%">
          <Img h="100%" src={url} w="100%" />
          <Text overflow="hidden" p={2}>
            {name}
          </Text>
        </Box>
      </Button>
    </Box>
  )
}

export default Option
