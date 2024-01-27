import { useDispatch, useSelector } from "react-redux";
import { selectThings, thingsIsLoading, getThings } from "./ThingsSlice";
import { useEffect, useState } from "react";

export default function Things() {
  const things = useSelector(selectThings);
  const [thingsList, setThingsList] = useState([]);
  const isLoading = useSelector(thingsIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThings);
    const newThings = things !== undefined ? Object.values(things) : [];
    setThingsList(newThings);
  }, []);

  function handleClick() {
    dispatch(getThings);
    console.log("things have arrived my boy" + things);
  }

  return (
    <>
      <button onClick={handleClick}>clickccccccccc</button>
      <div>{isLoading && <p>Loading...</p>}</div>
      {!isLoading &&
        thingsList.map((thing) => (
          <div key={thing.id}>
            <h1>{thing.title}</h1>
            <p>{thing.description}</p>
          </div>
        ))}
    </>
  );
}
