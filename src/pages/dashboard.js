import { Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_TOTAL_LIQUIDITY_USD } from "../graphql/queries";

export default function Dashboard() {
  const { loading, error, data } = useQuery(GET_TOTAL_LIQUIDITY_USD);

  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.error(error);
    return <p>Something went wrong!</p>;
  }

  console.log(data);
  return (
    <>
      <Typography>Dashboard Page</Typography>
    </>
  );
}
