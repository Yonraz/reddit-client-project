import React from "react";
import { CardContent, Typography, Box } from "@mui/material";
import { ExpandableText } from "../things/ExpandableText";
export const Comment = (props) => {
  const { body, author, score } = props;

  return (
    <CardContent>
      <div>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography sx={{ fontSize: "1.1rem", fontWeight: "500" }}>
            {author}
          </Typography>
          <Typography sx={{ fontSize: "1rem" }}>Score: {score}</Typography>
        </Box>
        <hr />
        <ExpandableText body={body} variant="body2" tolerance={250} />
      </div>
    </CardContent>
  );
};
