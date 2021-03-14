import {Box, SimpleGrid, Img, Text, Center, Button} from "@chakra-ui/react"
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
      <SimpleGrid columns={2} m="auto" spacing={6} w="50%">
        {options.map((elem) => {
          const index = options.indexOf(elem)

          return (
            <Box key={elem.id} m="auto" w="100%" zIndex={1}>
              {index === 0 && (
                <Box p={4} position="relative" zIndex={1}>
                  <Box p={0} position="relative" zIndex={1}>
                    <Text>Option A</Text>
                    <Img src={urlImage + elem.poster_path} w="100%" />
                    <Text>{elem.name}</Text>
                  </Box>
                  <Box
                    style={{
                      position: "absolute",
                      height: `${heightA}%`,
                      backgroundColor: `hsl(${heightA}, 100%, 50%)`,
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
                    <Text>Option B</Text>
                    <Img src={urlImage + elem.poster_path} w="100%" />
                    <Text>{elem.name}</Text>
                  </Box>
                  <Box
                    style={{
                      position: "absolute",
                      height: `${heightB}%`,
                      backgroundColor: `hsl(${heightB}, 100%, 50%)`,
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
      <Box bg="gray.200" column={2} h="300px" m="auto" mt="20px" overflowY="auto" p={4} w="80%">
        {votes.map((elem) => {
          return (
            <Center key={elem.user}>
              <Img mr="9px" mt="3px" src={twitch} w="20px" />
              <Text as="b" fontSize="l" color="primary">
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
      <Button>Reset</Button>
    </Box>
  )
}

export default ScreenVote
