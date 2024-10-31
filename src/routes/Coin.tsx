import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom"
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Container, Header, Title } from "./Coins";
import styled from "styled-components";
import { useState } from "react";
import Charts from "../components/Charts";
import Prices from "../components/Prices";

const Loader = styled.div`
  
`

const ItemContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  background: grey; 
  border-radius: 12px; 
  padding: 10px 0px 10px 0px;
  justify-content: space-around;
`

const Item = styled.div`
  justify-content: center;
  flex-direction: column;
  display: flex;
`

const ItemTitle = styled.p`
  text-align: center;
  font-size: small;
  padding: 0px;
  margin: 0px;
  padding-bottom: 10px;
`

const ItemContent = styled.p`
  text-align: center;
  padding: 0px;
  margin: 0px;
`

const BackButton = styled.div`
  padding: 30px;
`

const Description = styled.div`
  width: 500px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  justify-content: space-between;
`

interface InfoProps {
  selected: boolean;
}

const Info = styled.p<InfoProps>`
  border-radius: 12px; 
  padding: 10px 0px 10px 0px;
  background-color: gray;
  text-align:center;
  color: ${(props) => (props.selected ? props.theme.accentColor : "white")};
  font-weight: 500;
  width: 245px;
`

interface RouteParams {
  coinId: string
}

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const { isLoading: infoLoading, data: infoData } = useQuery("coinInfo", () => fetchCoinInfo(coinId))
  const { isLoading: tickersLoading, data: tickersData } = useQuery("coinInfo", () => fetchCoinTickers(coinId))
  const [selected, setSelected] = useState<'chart'|'price'>('chart')

  const handleInfo = (selected: 'chart'|'price')=>{
    if(selected === 'chart'){
      setSelected(selected)
    }
    if(selected === 'price'){
      setSelected(selected)
    }
  }
  return (
    <>

      {
        infoLoading ? (<Loader> Loading...</Loader >) :
          <Container>
            <BackButton>
              <Link to={'/'}>←</Link>
            </BackButton>
            <Header>
              <Title>
                {infoData.name}
              </Title>
            </Header>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20 }}>
              <ItemContainer>
                <Item>
                  <ItemTitle>RANK</ItemTitle>
                  <ItemContent>{infoData.rank}</ItemContent>
                </Item>
                <Item>
                  <ItemTitle>SYMBOL</ItemTitle>
                  <ItemContent>{infoData.symbol}</ItemContent>
                </Item>
                <Item>
                  <ItemTitle>OPEN SOURCE</ItemTitle>
                  <ItemContent>{infoData.open_source ? "Yes" : "No"}</ItemContent>
                </Item>
              </ItemContainer>
              <Description>
                {infoData.description}
              </Description>
              <ItemContainer>
                <Item>
                  <ItemTitle>TOTAL SUPPLY</ItemTitle>
                  <ItemContent>{infoData.symbol}</ItemContent>
                </Item>
                <Item>
                  <ItemTitle>MAX SUPPLY</ItemTitle>
                  <ItemContent>{infoData.open_source ? "Yes" : "No"}</ItemContent>
                </Item>
              </ItemContainer>
              <InfoContainer>
                <Info onClick={()=>{handleInfo('chart')}} selected={selected === 'chart'}>CHART</Info>
                <Info onClick={()=>{handleInfo('price')}} selected={selected === 'price'}>PRICE</Info>
              </InfoContainer>
              {selected==='chart'?<Charts/>:<Prices/>}
            </div>
          </Container>
      }
    </>
  )
}

export default Coin