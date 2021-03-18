import {Box, SimpleGrid, Img, Button, Text, GridItem, Spinner} from "@chakra-ui/react"
import * as React from "react"
import axios from "axios"

import {headers, URL} from "../../../api/api"
import {Serie} from "../../../types/types"

import {urlImage} from "~/api/api"

interface Props {
  options: Serie[]
  state: () => void
}

const SelectOptions: React.FC<Props> = ({options, state}) => {
  const [status, setStatus] = React.useState<boolean>(false)
  const [series, setSeries] = React.useState<Serie[]>([])
  const [update, setUpdate] = React.useState<boolean>(false)

  const getData = async () => {
    try {
      const result = await axios.get(URL, {headers})

      setSeries(result.data.results)
      setStatus(true)
    } catch (error) {
      console.log(error)
    }
  }

  const selectOption = (s: Serie) => {
    options.push(s)
    setUpdate(true)
    if (options.length === 2) {
      state()
    }
  }

  if (status === false) {
    getData()
  }

  if (update === true && status === true) {
    return (
      <SimpleGrid columns={{sm: 2, md: 3, lg: 4, xl: 5}} m="auto" spacing={4} w="70%">
        <GridItem colSpan={{sm: 2, md: 3, lg: 4, xl: 5}}>
          <Text color="primary" fontSize="4xl" fontWeight="semibold" m="30px">
            Please select two series
          </Text>
        </GridItem>
        {series.map((elem) => {
          return (
            <Box key={elem.id} boxShadow="lg">
              {options[0].name === elem.name && (
                <Button disabled h="100%" w="100%">
                  <Box m="auto" p={2} w="100%">
                    <Img h="100%" src={urlImage + elem.poster_path} w="100%" />
                    <Text overflow="hidden" p={2}>
                      {elem.name}
                    </Text>
                  </Box>
                </Button>
              )}
              {options[0].name !== elem.name && (
                <Button h="100%" w="100%" onClick={() => selectOption(elem)}>
                  <Box m="auto" p={2} w="100%">
                    <Img h="100%" src={urlImage + elem.poster_path} w="100%" />
                    <Text overflow="hidden" p={2}>
                      {elem.name}
                    </Text>
                  </Box>
                </Button>
              )}
            </Box>
          )
        })}
      </SimpleGrid>
    )
  }

  /*
  if (update === false && status === true) {
    return (
      <SimpleGrid columns={{sm: 2, md: 3, lg: 4, xl: 5}} m="auto" spacing={4} w="70%">
        <GridItem colSpan={{sm: 2, md: 3, lg: 4, xl: 5}}>
          <Text color="primary" fontSize="4xl" fontWeight="semibold" m="30px">
            Please select two series
          </Text>
        </GridItem>
        {series.map((elem) => {
          return (
            <Box key={elem.id} boxShadow="lg">
              {options[0] === undefined && (
                <Button _hover={{}} h="100%" w="100%" onClick={() => selectOption(elem)}>
                  <Box m="auto" p={2} w="100%">
                    <Img h="100%" src={urlImage + elem.poster_path} w="100%" />
                    <Text overflow="hidden" p={2}>
                      {elem.name}
                    </Text>
                  </Box>
                </Button>
              )}
            </Box>
          )
        })}
      </SimpleGrid>
    )
  }
*/
  return (
    <SimpleGrid columns={{sm: 2, md: 3, lg: 4, xl: 5}} m="auto" mt="0px" spacing={4} w="70%">
      <GridItem colSpan={{sm: 2, md: 3, lg: 4, xl: 5}}>
        <Text color="primary" fontSize="4xl" fontWeight="semibold" m="30px">
          Please select two series
        </Text>
      </GridItem>
      {status === false && (
        <GridItem colSpan={{sm: 2, md: 3, lg: 4, xl: 5}} mt={150}>
          <Spinner m="auto" />
        </GridItem>
      )}
      {status === true &&
        series.map((elem) => {
          return (
            <Box key={elem.id} boxShadow="lg">
              {options[0] === undefined && (
                <Button _hover={{}} h="100%" w="100%" onClick={() => selectOption(elem)}>
                  <Box m="auto" p={2} w="100%">
                    <Img h="100%" src={urlImage + elem.poster_path} w="100%" />
                    <Text overflow="hidden" p={2}>
                      {elem.name}
                    </Text>
                  </Box>
                </Button>
              )}
            </Box>
          )
        })}
    </SimpleGrid>
  )
}

export default SelectOptions
