import { ReactNode } from "react";

type ButtonVariant = "text" | "outlined" | "contained";

export interface ProductSelectorProps {
  disabled: boolean;
  handleChangeProducts: any;
}

export interface ProductData {
  name: any;
  price?: number;
}
export interface CategorySelectorProps {
  disabled: boolean;
  handleChange: any;
}

export interface FilterBoxProps extends CategorySelectorProps, ProductSelectorProps {
  onClear: () => void;
  onRunReport: () => void;
}

export interface CustomCircularProgressProps {
  loading: boolean;
}

export interface ButtonProps <T extends ButtonVariant = ButtonVariant> {
  onClick: () => void;
  disabled: boolean;
  variant?:T;
  className?:string;
  children:string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
}

export enum ActionTypes {
  SET_CATEGORY = "SET_CATEGORY",
  SET_SELECTED_PRODUCTS = "SET_SELECTED_PRODUCTS",
  SET_SHOW_CHART = "SET_SHOW_CHART",
  SET_LOADING = "SET_LOADING",
  CLEAR_STATE = "CLEAR_STATE",
  SET_CATEGORY_LIST = "SET_CATEGORY_LIST",
  SET_PRODUCT_LIST = "SET_PRODUCT_LIST",
}

export interface GlobalStateProviderProps {
  children: ReactNode;
}
