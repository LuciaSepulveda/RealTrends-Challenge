import {Box, SimpleGrid, Img, Text, Center} from "@chakra-ui/react"
import * as React from "react"

import twitch from "../../../assets/twitch.png"

import {urlImage} from "~/api/api"
import {Serie, Vote} from "~/types/types"

interface Props {
  options: Serie[]
  votes: Vote[]
}

const ScreenVote: React.FC<Props> = ({options, votes}) => {
  const totalVotes = votes.length
  let votesA = 0
  let votesB = 0
  let heightA = 0
  let heightB = 0

  votes.forEach((vote) => {
    if (vote.option === "A") votesA += 1
    else votesB += 1
  })

  if (totalVotes !== 0) {
    heightA = (votesA * 100) / totalVotes
    heightB = (votesB * 100) / totalVotes
  }

  return (
    <Box>
      <SimpleGrid columns={2} m="auto" spacing={6} w={{sm: "70%", md: "70%", lg: "60%", xl: "60%"}}>
        {options.map((elem) => {
          const index = options.indexOf(elem)

          return (
            <Box key={elem.id} m="auto" w="100%" zIndex={1}>
              {index === 0 && (
                <Box p={4} position="relative" zIndex={1}>
                  <Box p={0} position="relative" zIndex={1}>
                    {heightA >= 95 && (
                      <Text color="white" fontSize="lg" fontWeight="semibold" p={1}>
                        OPTION A
                      </Text>
                    )}
                    {heightA < 95 && (
                      <Text color="black" fontSize="lg" fontWeight="semibold" p={1}>
                        OPTION A
                      </Text>
                    )}
                    <Img boxShadow="lg" src={urlImage + elem.poster_path} w="100%" />
                    <Text
                      color="white"
                      fontSize="lg"
                      fontWeight="semibold"
                      h="30px"
                      overflow="hidden"
                      p={1}
                    >
                      {elem.name}
                    </Text>
                  </Box>
                  <Box
                    style={{
                      position: "absolute",
                      height: `${heightA}%`,
                      backgroundColor: `hsl(${heightA}, 100%, 40%)`,
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      zIndex: 0,
                      padding: "10%",
                      transition: "all 0.5s ease-out",
                    }}
                  />
                </Box>
              )}
              {index === 1 && (
                <Box p={4} position="relative" zIndex={1}>
                  <Box p={0} position="relative" zIndex={1}>
                    {heightB >= 95 && (
                      <Text color="white" fontSize="lg" fontWeight="semibold" p={1}>
                        OPTION B
                      </Text>
                    )}
                    {heightB < 95 && (
                      <Text color="black" fontSize="lg" fontWeight="semibold" p={1}>
                        OPTION B
                      </Text>
                    )}
                    <Img boxShadow="2xl" src={urlImage + elem.poster_path} w="100%" />
                    <Text
                      color="white"
                      fontSize="lg"
                      fontWeight="semibold"
                      h="30px"
                      overflow="hidden"
                      p={1}
                    >
                      {elem.name}
                    </Text>
                  </Box>
                  <Box
                    style={{
                      position: "absolute",
                      height: `${heightB}%`,
                      backgroundColor: `hsl(${heightB}, 100%, 40%)`,
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      zIndex: 0,
                      padding: "10%",
                      transition: "all 0.5s ease-out",
                    }}
                  />
                </Box>
              )}
            </Box>
          )
        })}
      </SimpleGrid>
      <Box
        bg="gray.200"
        borderRadius={4}
        boxShadow="md"
        column={2}
        h="300px"
        m="auto"
        mt="20px"
        overflowY="auto"
        p={4}
        w="70%"
      >
        {votes.map((elem) => {
          return (
            <Center key={elem.user}>
              <Img mr="9px" mt="3px" src={twitch} w="20px" />
              <Text as="b" color="primary" fontSize="l">
                {elem.user}
              </Text>
              <Text fontSize="l">
                {" "}
                : {elem.option}! {elem.review}{" "}
              </Text>
            </Center>
          )
        })}
      </Box>
    </Box>
  )
}

export default ScreenVote
