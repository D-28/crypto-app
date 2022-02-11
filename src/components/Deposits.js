import { useQuery } from "@apollo/client";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { GET_DAILY_TOKEN } from "../graphql/queries";
import Title from "./Title";
import { formatDate, formatNumber } from "../utils/format";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  const { selectedToken } = props;
  const theme = useTheme();

  const { loading, error, data } = useQuery(GET_DAILY_TOKEN, {
    variables: {
      tokenId: selectedToken,
    },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.error(error);
    return <p>Something went wrong!</p>;
  }

  console.log(data.tokenDayDatas[0]);

  return (
    <>
      <Title>{data.tokenDayDatas[0].token.symbol}</Title>
      <Typography component="p" variant="h4">
        {formatNumber(data.tokenDayDatas[0].priceUSD)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {formatDate(data.tokenDayDatas[0].date)}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Wallet Balance
        </Link>
      </div>
    </>
  );
}
