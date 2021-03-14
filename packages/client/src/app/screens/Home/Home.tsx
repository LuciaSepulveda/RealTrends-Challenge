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
  const [sendChannel, setSendChannel] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (state === "ready") {
      const socket = SocketIO.io("http://localhost:5000")

      console.log(channel)
      socket.on("state", (votes: Vote[]) => setVotes(votes))
      socket.emit("set-channel", channel)
    }
  }, [state, channel])
  /*
  React.useEffect(() => {
    if (state === "ready" && sendChannel === false) {
      socket.emit("set-channel", channel)
      setSendChannel(true)
    }
  }, [state, channel, sendChannel])*/
  /*
  React.useEffect(() => {
    if (status === true) {
      socket.emit("set-channel", channel)
    }
  }, [status, channel])
*/
  const optionsReady = () => {
    setState(State.Ready)
  }

  const handleChange = (event: {target: {value: React.SetStateAction<string>}}) => {
    setChannel(event.target.value)
  }

  const channelReady = () => {
    setStatus(true)
    setSendChannel(true)
  }
  /*
  if (status === true && sendChannel === false) {
    socket.emit("set-channel", channel)
    setSendChannel(true)
  }
*/

  if (state === "init" && status === true) {
    return <SelectOptions options={options} state={optionsReady} />
  }

  if (state === "ready") {
    return <ScreenVote options={options} votes={votes} />
  }

  return (
    <Box>
      <Text>Enter name of Twitch channel: </Text>
      <Input
        bg="red"
        name="channel"
        placeholder="Twitch channel"
        type="text"
        value={channel}
        variant="filled"
        onChange={handleChange}
      />
      <Text>{channel}</Text>
      <Button onClick={() => channelReady()}>Ok</Button>
    </Box>
  )
}

export default Home
