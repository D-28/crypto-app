import { useQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GET_DAILY_TOKEN } from "../graphql/queries";
import { formatDate } from "../utils/format";
import Title from "./Title";

export default function Chart(props) {
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

  const chartD = data.tokenDayDatas.map((daily, i) => ({
    date: formatDate(daily.date),
    amount: Number(daily.totalLiquidityUSD).toFixed(2),
  }));

  return (
    <>
      <Title>Total Liquidity ($)</Title>
      <ResponsiveContainer>
        <LineChart
          data={chartD}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            hide
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          ></YAxis>
          <Tooltip />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
