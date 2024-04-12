import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { ProductSelectorProps } from "../types/types";
import { useGlobalState } from "../hooks/GlobalStateContext";

const ProductSelector: React.FC<ProductSelectorProps> = ({
  disabled,
  handleChangeProducts,
}) => {
  const { state } = useGlobalState();
  const { selectedProducts, productList } = state;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-multiple-name-label">Select Product</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={selectedProducts}
        onChange={handleChangeProducts}
        disabled={disabled}
        label="Select Product"
      >
        {productList?.map((product: any) => (
          <MenuItem key={product.id} value={product.title}>
            {product.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductSelector;