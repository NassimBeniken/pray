import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import * as Location from "expo-location"
import styled from "styled-components"

import PrayItem from "./components/PrayItem"

import { getTimings } from "./api/api"

const Container = styled(LinearGradient)`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

export default function App() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Permission to access location was denied")
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])

  if (location) {
    getTimings(location.coords?.latitude, location.coords?.longitude)
  }

  return (
    <Container colors={["#36798a", "#54acc3", "#20c1ed"]}>
      <PrayItem height={20} />
    </Container>
  )
}
