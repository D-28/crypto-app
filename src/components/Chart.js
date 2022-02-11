import { useQuery } from "@apollo/client";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GET_DAILY_TOKEN } from "../graphql/queries";
import { formatDate, getMonthFromDate } from "../utils/format";
import Title from "./Title";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function Chart(props) {
  const { selectedToken } = props;
  const theme = useTheme();
  const [chartInterval, setChartInterval] = useState(null);

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

  const chartM = data.tokenDayDatas.map((daily, i) => ({
    date: getMonthFromDate(daily.date),
    amount: Number(daily.totalLiquidityUSD).toFixed(2),
  }));

  return (
    <>
      <Title>Total Liquidity ($)</Title>
      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Daily</Typography>
          <AntSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
            onChange={(event) =>
              setChartInterval(event.target.checked ? chartM : chartD)
            }
          />
          <Typography>Monthly</Typography>
        </Stack>
      </FormGroup>
      <ResponsiveContainer>
        <LineChart
          data={chartInterval}
          margin={{
            top: 86,
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
