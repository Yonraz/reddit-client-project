/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { selectThings, addListOfThings } from "./ThingsSlice";
import { useEffect } from "react";
import { useFetchApi } from "../../hooks/useFetchApi";
import Thing from "./Thing";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
export default function Things({ subredditSelection }) {
  const things = useSelector(selectThings);
  const [data, isLoading, hasError] = useFetchApi(subredditSelection);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length === 0) return;
    dispatch(addListOfThings(data));
  }, [data]);
  useEffect(() => {
    if (data.length === 0) return;
    dispatch(addListOfThings(data));
  }, [subredditSelection]);

  return (
    <>
      <div>{isLoading && <p>Loading...</p>}</div>
      <Grid container>
        {!isLoading &&
          Object.values(things).map((thing) => (
            <Grid key={thing.id} item xs={12} sx={{ margin: "1rem 0" }}>
              <Card sx={{ maxWidth: "450px" }}>
                <Thing id={thing.id} />
              </Card>
            </Grid>
          ))}
      </Grid>
      <div>{hasError && <div>some error occured</div>}</div>
    </>
  );
}
