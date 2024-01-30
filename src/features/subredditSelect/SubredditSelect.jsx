/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { changeSelection } from "./SubredditSelectSlice";
import {subredditOptions} from '../subredditOptions/subredditOptions'
import {
  FormControl,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

export default function SubredditSelect(props) {
  const { selection } = props;
  const dispatch = useDispatch();
  const handleOptionChanged = (e) => {
    if (e.target.selected) return;
    dispatch(changeSelection(e.target.value));
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" variant="h6">
        Subreddits
      </FormLabel>
      <ToggleButtonGroup
        value={selection}
        exclusive
        onChange={handleOptionChanged}
        aria-label="options"
      >
        {subredditOptions.map((option) => (
          <ToggleButton
            key={option}
            value={option}
            aria-label={option}
            selected={option === selection}
          >
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
}
