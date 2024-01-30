import { useEffect, useState } from "react";
import { processCommentsJson } from "../helpers/processCommentsJson";

export type Comment = {
  body: string;
  author: string;
  id: string;
  score: number;
};

export type FetchCommentsForPost = (
  postId: string,
  subreddit: string,
  limit?: number
) => Promise<Comment[] | undefined>;

export type UseFetchCommentsForPost = () => [
  commentsForPost: Comment[],
  fetchCommentsForPost: FetchCommentsForPost,
  isLoading: boolean
];

const useFetchCommentsForPost: UseFetchCommentsForPost = () => {
  // https://www.reddit.com/r/memes/comments/1ad6f39.json?limit=10
  // https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=${limit}
  const [commentsForPost, setCommentsForPost] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
  }, []);
  const fetchCommentsForPost: FetchCommentsForPost = async (
    postId,
    subreddit,
    limit = 10
  ) => {
    try {
      const response = await fetch(
        `https://www.reddit.com/${subreddit}/comments/${postId}.json?limit=${limit}`
      );
      const responseData = await response.json();
      const parsedComments: Comment[] = processCommentsJson(responseData);
      setCommentsForPost(parsedComments);
      setIsLoading(false);
      return parsedComments;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return [commentsForPost, fetchCommentsForPost, isLoadingComments];
};
export default useFetchCommentsForPost;
