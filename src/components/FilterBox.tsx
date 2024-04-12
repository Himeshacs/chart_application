import React from "react";
import CategorySelector from "./CategorySelector";
import ProductSelector from "./ProductSelector";
import { FilterBoxProps } from "../types/types";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useGlobalState } from "../hooks/GlobalStateContext";
import ButtonComponent from "./Button";
import { Container } from "@mui/material";

const FilterBox: React.FC<FilterBoxProps> = ({
  onClear,
  onRunReport,
  handleChange,
  handleChangeProducts,
}) => {
  const { state } = useGlobalState();
  const { category, loading, showChart } = state;

  return (
    <Container>
      <Grid container spacing={2} className="filter-box-container">
        <Grid xs={6} md={8}>
          <Typography variant="h4" className="filter-box-title">
            Filters
          </Typography>
        </Grid>
        <Grid xs={6} md={4}>
          <ButtonComponent
            onClick={onClear}
            disabled={loading}
            className="clear-button"
            children="Clear"
          />
        </Grid>
        <Grid xs={12} md={8} ml={5}>
          <Grid mt={-10}>
            <CategorySelector disabled={false} handleChange={handleChange} />
          </Grid>
          <Grid mt={2}>
            <ProductSelector
              disabled={!category}
              handleChangeProducts={handleChangeProducts}
            />
          </Grid>
        </Grid>
        <Grid xs={12} md={8} className="filter-box-run-report-button">
          <ButtonComponent
            onClick={onRunReport}
            disabled={!category || showChart}
            children="Run Report"
            variant="contained"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilterBox;