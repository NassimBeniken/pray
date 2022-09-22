import styled from "styled-components"

const Container = styled.View`
  background-color: white;
  border-radius: 5px;
  display: flex;
  elevation: 4;
  height: ${({ height }) => height}%;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 4px;
  width: 80%;
`

const PrayItem = ({ height, name, time }) => <Container height={height} />

export default PrayItem
