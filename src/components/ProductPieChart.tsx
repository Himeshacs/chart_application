import Highcharts, { Options, SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as React from "react";
import { useGlobalState } from "../hooks/GlobalStateContext";

const ProductPieChart: React.FC = () => {
  const { state } = useGlobalState();
  const { category, productList } = state;

  const seriesData: SeriesOptionsType[] = [
    {
      name: "Category",
      data: productList.map((product) => [product.title, 1]),
      type: "pie",
    },
  ];
  const chartOptions: Options = {
    chart: {
      type: "pie",
    },

    title: {
      text: `Products in ${category}`,
      align: "left",
      x: 70,
    },

    series: seriesData,
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default ProductPieChart;
