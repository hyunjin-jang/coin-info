import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "../api";


export const Container = styled.div`
  padding: 0px 50px;
`;

export const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`
const CoinsList = styled.ul`
  padding: 0;
`

const Coin = styled.li`
  background-color: ${props => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor}
    }
  }
`



const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: white;
  margin: 10px 0px 10px 10px;
`

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
  const [isDark, setIsDark] = useState<boolean>(false)

  const themeBtn = useMemo(() => {
    if (isDark) {
      return '라이트'
    }
    return '다크'
  }, [isDark])

  const handleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {data?.slice(0, 100).map((coin) =>
          <Coin key={coin.id}>
            <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} />
            <Link style={{ flex: 1 }} to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        )}
      </CoinsList>
    </Container>
  )
}

export default Coins

// https://api.coinpaprika.com/v1/coins/btc-bitcoin
// https://api.coinpaprika.com/v1/tickers/btc-bitcoin
// https://static.coinpaprika.com/coin/btc-bitcoin/logo.png