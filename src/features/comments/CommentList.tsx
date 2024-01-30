import React from "react";

import { Typography, Card } from "@mui/material";
import { Comment } from "./Comment";
import { useSelector } from "react-redux";
import { selectMemoizedCommentsByIds } from "./CommentsSlice";
import { Comment as CommentType } from "../../hooks/useFetchComments";

export const CommentList = (props: {
  commentsOpen: boolean;
  isLoadingComments: boolean;
  commentIds: string[];
}) => {
  const { commentsOpen, isLoadingComments, commentIds } = props;

  const comments: CommentType[] = useSelector((state) =>
    selectMemoizedCommentsByIds(state, commentIds)
  );

  return (
    <>
      <div>
        {commentsOpen && isLoadingComments && (
          <Typography>Loading...</Typography>
        )}
        {commentsOpen &&
          comments[0] !== undefined &&
          comments.map((comment) => {
            return (
              <Card sx={{ margin: "10px" }} key={comment.id}>
                <Comment
                  key={comment.id}
                  body={comment.body}
                  author={comment.author}
                  score={comment.score}
                />
              </Card>
            );
          })}
      </div>
    </>
  );
};
