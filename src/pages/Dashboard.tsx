import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";
import FilterBox from "../components/FilterBox";
import CustomCircularProgress from "../components/CustomCircularProgress";
import { useGlobalState } from "../hooks/GlobalStateContext";
import { ActionTypes } from "../types/types";
import { fetchCategories, fetchProductsByCategory } from "../api/api";
import ColumnChart from "../components/ColumnChart";
import CategoryPieChart from "../components/CategoryPieChart";
import ProductPieChart from "../components/ProductPieChart";

const Dashboard: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const { category, selectedProducts, showChart, loading } = state;
  const [showCategoryChart, setShowCategoryChart] = useState<boolean>(true);

  const handleClear = () => {
    dispatch({ type: ActionTypes.CLEAR_STATE });
    setShowCategoryChart(true);
  };

  const handleRunReport = () => {
    if (!category) {
      return;
    }
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    setTimeout(async () => {
      try {
        setShowCategoryChart(false);
        dispatch({ type: ActionTypes.SET_SHOW_CHART, payload: true });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      } catch (error) {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    }, 3000);
  };

  const handleSetCategory = (value: string | any) => {
    dispatch({ type: ActionTypes.SET_CATEGORY, payload: value });
    setShowCategoryChart(true);
    dispatch({ type: ActionTypes.SET_SHOW_CHART, payload: false });
  };

  const handleSetSelectedProducts = (value: number[] | any) => {
    dispatch({ type: ActionTypes.SET_SELECTED_PRODUCTS, payload: value });
    dispatch({ type: ActionTypes.SET_SHOW_CHART, payload: false });
  };

  const fetchCatList = async () => {
    const result = await fetchCategories();
    dispatch({ type: ActionTypes.SET_CATEGORY_LIST, payload: result });
  };

  const fetchProducts = async () => {
    try {
      const result = await fetchProductsByCategory(category);
      dispatch({ type: ActionTypes.SET_PRODUCT_LIST, payload: result });
    } catch (error) {
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCategory = event.target.value;
    handleSetCategory(selectedCategory);
  };

  const handleChangeProducts = (
    event: SelectChangeEvent<string | number[]>
  ) => {
    if (typeof event.target.value === "string") {
      handleSetSelectedProducts([]);
    } else {
      handleSetSelectedProducts(event.target.value as number[]);
    }
  };

  useEffect(() => {
    fetchCatList();
    if (category) {
      fetchProducts();
    }
  }, [category]);

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      className="dashboard-container"
    >
      <Grid item xs={12} md={3}>
        <FilterBox
          onClear={handleClear}
          onRunReport={handleRunReport}
          disabled={false}
          handleChange={handleChange}
          handleChangeProducts={handleChangeProducts}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container justifyContent="center">
          <Grid item>
            <CustomCircularProgress loading={loading} />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} style={{ maxWidth: "100%" }}>
            {showCategoryChart && <CategoryPieChart />}
            {showChart &&
              !showCategoryChart &&
              (selectedProducts.length > 0 ? (
                <ColumnChart />
              ) : (
                <ProductPieChart />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
