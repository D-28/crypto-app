import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useQuery } from "@apollo/client";
import { GET_TOP_TOKENS } from "../graphql/queries";
import { formatNumber } from "../utils/format";

function preventDefault(event) {
  event.preventDefault();
}

export default function Tokens(props) {
  const { selectedToken, setSelectedToken } = props;
  const { loading, error, data } = useQuery(GET_TOP_TOKENS);

  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.error(error);
    return <p>Something went wrong!</p>;
  }
  console.log("$", data);

  return (
    <>
      <Title>Top Tokens</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Trade Volume (USD) ↓&nbsp;</TableCell>
            <TableCell align="right">Total Supply&nbsp;</TableCell>
            <TableCell align="right">Total Liquidity&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.tokens.map((row, i) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => setSelectedToken(row.id)}
              selected={selectedToken == row.id}
            >
              <TableCell component="th" scope="row">
                {++i}
              </TableCell>
              <TableCell align="left">{row.symbol}</TableCell>
              <TableCell align="right">
                {formatNumber(row.tradeVolumeUSD)}
              </TableCell>
              <TableCell align="right">
                {formatNumber(row.totalSupply)}
              </TableCell>
              <TableCell align="right">
                {formatNumber(row.totalLiquidity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more tokens
      </Link>
    </>
  );
}
