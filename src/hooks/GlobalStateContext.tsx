import React, { createContext, useReducer, useContext } from 'react';
import { ActionTypes, GlobalStateProviderProps } from '../types/types';

interface GlobalState {
  category: string;
  selectedProducts: number[];
  showChart: boolean;
  loading: boolean;
  categoryList: string[]; 
  productList: any[]; 

}

const initialState: GlobalState = {
  category: '',
  selectedProducts: [],
  showChart: false,
  loading: false,
  categoryList: [],
  productList: [],
};

type Action =
  | { type: ActionTypes.SET_CATEGORY; payload: string }
  | { type: ActionTypes.SET_SELECTED_PRODUCTS; payload: number[] }
  | { type: ActionTypes.SET_SHOW_CHART; payload: boolean }
  | { type: ActionTypes.SET_LOADING; payload: boolean }
  | { type: ActionTypes.CLEAR_STATE }
  | { type: ActionTypes.SET_CATEGORY_LIST; payload: string[] } 
  | { type: ActionTypes.SET_PRODUCT_LIST; payload: any[] }; 

const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case ActionTypes.SET_CATEGORY:
      return { ...state, category: action.payload };
    case ActionTypes.SET_SELECTED_PRODUCTS:
      return { ...state, selectedProducts: action.payload };
    case ActionTypes.SET_SHOW_CHART:
      return { ...state, showChart: action.payload };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
      case ActionTypes.SET_CATEGORY_LIST:
      return { ...state, categoryList: action.payload };
    case ActionTypes.SET_PRODUCT_LIST: 
      return { ...state, productList: action.payload };
    case ActionTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

const GlobalStateContext = createContext<{ state: GlobalState; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): { state: GlobalState; dispatch: React.Dispatch<Action> } => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
