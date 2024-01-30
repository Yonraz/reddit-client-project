import React, { useState } from "react";
import useFetchCommentsForPost from "../../hooks/useFetchComments";
import { addComments } from "../comments/CommentsSlice";
import { addCommentIds, selectThingById } from "./ThingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { ExpandableText } from "./ExpandableText";
import { CommentList } from "../comments/CommentList";

interface ThingInterface {
  id: string;
  name: string;
  title: string;
  subreddit: string;
  authorName: string;
  description: string;
  imageUrl: string;
  numLikes: string;
  numComments: string;
  commentIds: string[];
}

export default function Thing(props: { id: string }) {
  const { id } = props;
  const thing: ThingInterface = useSelector(selectThingById(id));
  const dispatch = useDispatch();
  const [commentsForPost, fetchCommentsForPost, isLoadingComments] =
    useFetchCommentsForPost();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [lastCommentsLength, setLastCommentsLength] = useState(
    thing.commentIds.length
  );

  const fetchComments = async () => {
    try {
      const parsedComments = await fetchCommentsForPost(
        thing.id,
        thing.subreddit,
        10
      );
      if (parsedComments === undefined)
        throw Error("error occured while fetching comments");
      const commentIds = parsedComments.map((comment) => comment.id);
      dispatch(addComments(parsedComments));
      dispatch(addCommentIds({ postId: thing.id, commentIds: commentIds }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentsClick = () => {
    setCommentsOpen(!commentsOpen);
    if (commentsForPost.length > lastCommentsLength) return;
    setLastCommentsLength(commentsForPost.length);
    fetchComments();
  };

  return (
    <CardContent>
      {thing !== undefined && (
        <div>
          <div key={thing.name}>
            <ExpandableText body={thing.title} tolerance={50} variant="h5" />
            <hr />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography sx={{ fontSize: "1rem" }}>
                By: {thing.authorName}
              </Typography>
              <Typography sx={{ fontSize: "1rem" }}>
                {thing.subreddit}
              </Typography>
            </Box>
            <CardMedia
              image={thing.imageUrl}
              component="img"
              style={{ objectFit: "cover", width: "100%" }}
            />
            <Grid container spacing={2} sx={{ margin: "5px 0px" }}>
              <Grid
                item
                onClick={handleCommentsClick}
                sx={{ cursor: "pointer" }}
              >
                <Typography textAlign="center">
                  <CommentIcon /> {thing.numComments}
                </Typography>
              </Grid>
              <Grid item>
                <Typography textAlign="center">
                  <ThumbUpIcon /> {thing.numLikes}{" "}
                </Typography>
              </Grid>
            </Grid>
            <ExpandableText
              body={thing.description}
              tolerance={250}
              variant="body2"
            />
          </div>
          <CommentList
            commentsOpen={commentsOpen}
            commentIds={thing.commentIds}
            isLoadingComments={isLoadingComments}
          />
        </div>
      )}
    </CardContent>
  );
}
