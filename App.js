import { useEffect, useState } from "react"
import * as Location from "expo-location"
import styled from "styled-components"

import PrayItem from "./components/PrayItem"

import { getTimings } from "./api/api"
import { ActivityIndicator, View } from "react-native"
import { images } from "./utils/ImagesUrl"

const Container = styled.ImageBackground`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const ListItem = styled.FlatList`
  width: 100%;
  display: flex;
`

export default function App() {
  const [location, setLocation] = useState(null)
  const [timings, setTimings] = useState(null)
  const [listData, setListData] = useState(null)
  let timingsData = []

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Permission to access location was denied")
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      if (location) {
        setTimings(
          await getTimings(
            location.coords?.latitude,
            location.coords?.longitude
          )
        )
      }
    })()
  }, [])

  useEffect(() => {
    if (timings) {
      for (const [key, value] of Object.entries(timings)) {
        if (
          key === "Dhuhr" ||
          key === "Fajr" ||
          key === "Asr" ||
          key === "Maghrib" ||
          key === "Isha"
        ) {
          timingsData.push({
            name: key,
            time: value,
            imageUrl: images.find((element) => element.name === key)?.image,
          })
        }
      }
      setListData(timingsData)
    }
  }, [timings])

  const isActual = (name, timings) => {
    const date = new Date()
    let actualName = ""
    const actualTime = `${date.getHours()}${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }`
    let formattedTimings = timings.map((timing) => ({
      ...timing,
      time: parseInt(
        `${timing.time.split(":")[0]}${timing.time.split(":")[1]}`,
        10
      ),
    }))

    formattedTimings = formattedTimings.sort((a, b) => a.time - b.time)

    for (let i = 0; i < formattedTimings.length; i++) {
      if (i === formattedTimings.length - 1) {
        actualName = formattedTimings[i].name
        break
      }
      if (
        actualTime >= formattedTimings[i].time &&
        actualTime < formattedTimings[i + 1].time
      ) {
        actualName = formattedTimings[i].name
        break
      }
    }

    return name === actualName
  }

  return (
    <Container
      source={{ uri: "https://images.alphacoders.com/925/925776.jpg" }}
    >
      {listData ? (
        <ListItem
          data={listData}
          renderItem={({ item }) => (
            <PrayItem
              imageUrl={item.imageUrl}
              isActual={isActual(item.name, listData)}
              name={item.name}
              time={item.time}
            />
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      ) : (
        <ActivityIndicator animating size="large" color="#FFF" />
      )}
    </Container>
  )
}
