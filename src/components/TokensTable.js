import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const formatNumber = (stringNumber) => {
  return (
    "$" +
    Number(stringNumber)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
};

export default function TokensTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {rows.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {++i}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
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
    </TableContainer>
  );
}
