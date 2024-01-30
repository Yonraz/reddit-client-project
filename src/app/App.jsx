import "./App.css";
import Things from "../features/things/Things";
import SubredditSelect from "../features/subredditSelect/SubredditSelect";
import { useSelector } from "react-redux";
import { selectSubredditSelection } from "../features/subredditSelect/SubredditSelectSlice";
import { Container, CssBaseline, Grid, Typography } from "@mui/material";

function App() {
  const subredditSelection = useSelector(selectSubredditSelection);
  return (
    <>
      <Container justifyContent="center" maxWidth="lg">
        <Grid container spacing={3}>
          <CssBaseline />
          <Grid item xs={12}>
            <Typography variant="h2" textAlign="center">
              miniReddit
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <SubredditSelect selection={subredditSelection} />
          </Grid>
          <Grid item xs={10}>
            <Things subredditSelection={subredditSelection} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
