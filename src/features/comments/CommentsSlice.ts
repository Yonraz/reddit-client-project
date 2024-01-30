import { createSlice, createSelector } from "@reduxjs/toolkit";
import { Comment } from "../../hooks/useFetchComments";

const initialState = {
  comments: {},
};
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComments(state, action) {
      console.log("in action");
      console.log(action.payload);
      action.payload.forEach((comment: Comment) => {
        state.comments[comment.id] = {
          ...comment,
        };
      });
    },
  },
});

export default commentsSlice.reducer;
export const { addComments } = commentsSlice.actions;
export const selectComment: (commentId: string) => (state) => Comment =
  (commentId) => (state) =>
    state.comments.comments[commentId];

type MemoizedCommentsFunction = (state, commentIds: string[]) => Comment[];

export const selectMemoizedCommentsByIds: MemoizedCommentsFunction =
  createSelector(
    [(state) => state.comments.comments, (state, commentIds) => commentIds],
    (commentsMap, commentIds) => {
      if (commentIds.length === 0) return [];
      return commentIds.map((commentId: string) => commentsMap[commentId]);
    }
  );
