/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { selectThings, addListOfThings, selectIsSubredditFetched, addFetchedSubreddit } from "./ThingsSlice";
import { useEffect, useState } from "react";
import { useFetchApi } from "../../hooks/useFetchApi";
import Thing from "./Thing";
import Card from "@mui/material/Card";
import { Grid, Button } from "@mui/material";
export default function Things({ subredditSelection }) {
  const things = useSelector(selectThings);
  const [slicePoint, setSlicePoint] = useState(5);
  const thingsToDisplay = Object.values(things).slice(0, slicePoint);
  const [data, isLoading, hasError] = useFetchApi(subredditSelection);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length === 0) return;
    dispatch(addListOfThings(data));
    dispatch(addFetchedSubreddit(subredditSelection))
  }, [subredditSelection, data]);
  const handleShowMore = () => {
    setSlicePoint((prev) => prev + 5);
  };
  return (
    <>
      <div>{isLoading && <p>Loading...</p>}</div>
      <Grid container>
        {!isLoading &&
          thingsToDisplay.map((thing) => (
            <Grid key={thing.id} item xs={12} sx={{ margin: "1rem 0" }}>
              <Card sx={{ maxWidth: "550px" }}>
                <Thing id={thing.id} />
              </Card>
            </Grid>
          ))}
      </Grid>
      <div>{hasError && <div>some error occured</div>}</div>
      {!isLoading && (
        <Button
          variant="outlined"
          onClick={handleShowMore}
          sx={{ margin: "10px 0" }}
        >
          Show More...
        </Button>
      )}
    </>
  );
}
