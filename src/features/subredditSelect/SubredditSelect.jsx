/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { changeSelection } from "./SubredditSelectSlice";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function SubredditSelect(props) {
  const { selection } = props;
  const dispatch = useDispatch();
  const options = [
    "funny",
    "science",
    "worldnews",
    "todayilearned",
    "DIY",
    "memes",
  ];
  const handleOptionChanged = (e) => {
    if (e.target.selected) return;
    dispatch(changeSelection(e.target.value));
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" variant="h6">
        Subreddits
      </FormLabel>
      <RadioGroup
        aria-label="options"
        name="options"
        value={selection}
        onChange={handleOptionChanged}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
