import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { CategorySelectorProps } from "../types/types";
import { useGlobalState } from "../hooks/GlobalStateContext";

const CategorySelector: React.FC<CategorySelectorProps> = ({
  disabled,
  handleChange,
}) => {
  const { state } = useGlobalState();
  const { category, categoryList } = state;

  return (
    <FormControl fullWidth  size="small"  >
      <InputLabel id="demo-select-small-label">Select Category</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={category}
        onChange={handleChange}
        disabled={disabled}
        label="Select Category"
      >
        {categoryList.map((categoryItem: any) => (
          <MenuItem key={categoryItem} value={categoryItem}>
            {categoryItem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelector;