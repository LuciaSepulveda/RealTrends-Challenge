import {Box, Input, Text, Button} from "@chakra-ui/react"
import * as React from "react"
import SocketIO from "socket.io-client"

import ScreenVote from "../ScreenVote/ScreenVote"
import SelectOptions from "../SelectOptions/SelectOptions"

import {Serie, State, Vote} from "~/types/types"

const Home: React.FC = () => {
  const [status, setStatus] = React.useState<boolean>(false)
  const [state, setState] = React.useState<State>(State.Init)
  const [options, setOptions] = React.useState<Serie[]>([])
  const [votes, setVotes] = React.useState<Vote[]>([])
  const [channel, setChannel] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")

  React.useEffect(() => {
    if (state === "ready") {
      const socket = SocketIO.io("http://localhost:5000", {
        transports: ["websocket"],
      })

      socket.on("state", (votes: Vote[]) => setVotes(votes))
      socket.emit("set-channel", channel)
    }
  }, [state, channel])

  const optionsReady = () => {
    setState(State.Ready)
  }

  const handleChange = (event: {target: {value: React.SetStateAction<string>}}) => {
    setError("")
    setChannel(event.target.value)
  }

  const channelReady = () => {
    if (channel === "") {
      setError("Please enter a name")
    } else {
      setStatus(true)
    }
  }

  if (state === "init" && status === true) {
    return <SelectOptions options={options} state={optionsReady} />
  }

  if (state === "ready") {
    return <ScreenVote options={options} votes={votes} />
  }

  return (
    <Box bg="gray.200" boxShadow="lg" p="100px 50px">
      <Text color="primary" fontSize="xl" fontWeight="semibold" mb="10px">
        Enter name of Twitch channel:{" "}
      </Text>
      <Input
        _hover={{
          borderColor: "blue.400",
        }}
        bg="white"
        borderColor="primary"
        color="black"
        errorBorderColor="primary"
        focusBorderColor="blue.400"
        name="channel"
        placeholder="Twitch channel"
        value={channel}
        onChange={handleChange}
      />
      <Text color="red" fontSize="smaller">
        {error}
      </Text>
      <Button colorScheme="telegram" mt="12px" onClick={() => channelReady()}>
        OK
      </Button>
    </Box>
  )
}

export default Home
