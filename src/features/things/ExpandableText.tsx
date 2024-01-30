import React, { useState } from "react";
import {
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Variant } from "@mui/material/styles/createTypography";

export const ExpandableText = (props: {
  body: string;
  tolerance: number;
  variant: Variant;
}) => {
  const [expanded, setExpnaded] = useState(false);
  const { body, tolerance, variant } = props;
  const isTooLong = body.length > 250;
  if (body === "") return;
  const handleExpandClick = () => {
    if (isTooLong) {
      setText(expanded ? slicedText : body);
    }
    setExpnaded((prev) => !prev);
  };
  const slicedText = `${body.slice(0, tolerance)}...`;
  const defaultText = isTooLong ? slicedText : body;
  const [text, setText] = useState(defaultText);
  return (
    <div>
      <CardContent>
        <Typography
          variant={variant}
          color={variant === "body2" ? "textSecondary" : "textPrimary"}
        >
          {text}
        </Typography>
      </CardContent>
      {isTooLong && (
        <div>
          <CardActions disableSpacing>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMore />
            </IconButton>
          </CardActions>
        </div>
      )}
    </div>
  );
};
