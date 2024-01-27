import { useDispatch, useSelector } from "react-redux";
import { selectThings, thingsIsLoading, getThings } from "./ThingsSlice";
import ThingType from "../../types/thingType";
import { useEffect } from "react";

export default function Things() {
  const things: Record<string, ThingType> = useSelector(selectThings);
  const isLoading = useSelector(thingsIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThings);
  }, []);

  return (
    <>
      <div>{isLoading && <p>Loading...</p>}</div>
      {!isLoading &&
        Object.values(things).map((thing: ThingType) => (
          <div key={thing.id}>
            <h1>{thing.title}</h1>
            <p>{thing.description}</p>
          </div>
        ))}
    </>
  );
}
