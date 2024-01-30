import { useEffect, useState } from "react";
import { processRedditResponse } from "../helpers/processRedditJson";

export function useFetchApi(subreddit, limit = 5) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  subreddit = subreddit === "" ? "memes" : subreddit;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://www.reddit.com/r/${subreddit}.json?limit=${limit - 1}`
        );
        if (!response.ok) throw new Error("some error occured");
        const json = await response.json();
        const things = processRedditResponse(json);
        setData(things);
        setIsLoading(false);
      } catch (error) {
        setHasError(error.message || "An error occurred while fetching data");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [subreddit, limit]);

  return [data, isLoading, hasError];
}
