import { Box, Paper } from "@mui/material";
import TokensTable from "../components/TokensTable";
import { useQuery } from "@apollo/client";
import { GET_TOP_TOKENS } from "../graphql/queries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_TOP_TOKENS);

  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.error(error);
    return <p>Something went wrong!</p>;
  }

  console.log(data.tokens);
  return (
    <Paper>
      <Box>
        <TokensTable rows={data.tokens} />
      </Box>
    </Paper>
  );
}
