import { gql } from "@apollo/client";

export const GET_TOP_TOKENS = gql`
  {
    tokens(
      where: { name_not_contains: "You don't blacklist delta.financial" }
      first: 5
      orderBy: tradeVolumeUSD
      orderDirection: desc
    ) {
      symbol
      name
      id
      tradeVolumeUSD
      totalLiquidity
      totalSupply
    }
  }
`;

export const GET_DAILY_TOKEN = gql`
  query TokenDayDatas($tokenId: String!) {
    tokenDayDatas(
      where: { token: $tokenId }
      first: 365
      orderBy: date
      orderDirection: desc
    ) {
      date
      totalLiquidityUSD
      priceUSD
      token {
        symbol
      }
    }
  }
`;
