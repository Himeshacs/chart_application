import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CustomCircularProgressProps } from "../types/types";

const CustomCircularProgress: React.FC<CustomCircularProgressProps> = ({
  loading,
}) => {
  return loading ? <CircularProgress /> : null;
};

export default CustomCircularProgress;
