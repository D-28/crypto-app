import { gql } from "@apollo/client";

export const GET_TOTAL_LIQUIDITY_USD = gql`
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
    }
  }
`;
