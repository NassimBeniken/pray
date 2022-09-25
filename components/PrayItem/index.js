import styled from "styled-components"

const Container = styled.View`
  border-radius: 5px;
  display: flex;
  elevation: 4;
  height: ${({isActual}) => isActual ? '250px' : '70px'};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 4px;
  width: ${({isActual}) => isActual ? '800px' : '500px'};
`

const ImageContainer = styled.ImageBackground`
  border-radius: 5px;
  height: 100%;
  overflow: hidden;
  width: 100%;
  opacity: ${({isActual}) => isActual ? '1' : '0.3'}
`

const PrayItem = ({imageUrl, isActual, name, time }) => {
  return (
    <Container isActual={isActual}>
      <ImageContainer isActual={isActual} source={{ uri: imageUrl }} resizeMode="cover" />
    </Container>
  )
}

export default PrayItem
