import {Box, SimpleGrid, Img, Button, Text, GridItem, Spinner} from "@chakra-ui/react"
import * as React from "react"
import axios from "axios"
import {motion} from "framer-motion"

import Option from "../../../components/Option/Option"
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

  const animation = {
    visible: {opacity: 1, scale: 1},
    hidden: {opacity: 0, scale: 0},
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
            <>
              {options[0].name === elem.name && (
                <Option
                  key={elem.id}
                  disabled={true}
                  name={elem.name}
                  url={urlImage + elem.poster_path}
                />
              )}
              {options[0].name !== elem.name && (
                <Option
                  key={elem.id}
                  disabled={false}
                  name={elem.name}
                  select={() => selectOption(elem)}
                  url={urlImage + elem.poster_path}
                />
              )}
            </>
          )
        })}
      </SimpleGrid>
    )
  }

  return (
    <SimpleGrid
      columns={{sm: 2, md: 3, lg: 4, xl: 5}}
      m="auto"
      mt="0px"
      spacing={4}
      w={{sm: "80%", md: "70%", lg: "70%", xl: "70%"}}
    >
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
            <motion.div
              key={elem.id}
              animate="visible"
              initial="hidden"
              transition={{duration: 0.3}}
              variants={animation}
            >
              {options[0] === undefined && (
                <Option
                  disabled={false}
                  name={elem.name}
                  select={() => selectOption(elem)}
                  url={urlImage + elem.poster_path}
                />
              )}
            </motion.div>
          )
        })}
    </SimpleGrid>
  )
}

export default SelectOptions
