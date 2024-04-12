import Highcharts, { Options, SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Menu from "highcharts/modules/exporting";
import * as React from "react";
import { useGlobalState } from "../hooks/GlobalStateContext";

const CategoryPieChart: React.FC = () => {
  const { state } = useGlobalState();
  const { categoryList } = state;

  const seriesData: SeriesOptionsType[] = [
    {
      name: "Category",
      data: categoryList.map((category) => [category, 1]),
      type: "pie",
    },
  ];

  const chartOptions: Options = {
    chart: {
      type: "pie",
    },

    title: {
      text: "Category Distribution",
      align: "left",
      x: 70,
    },

    series: seriesData,

    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

Menu(Highcharts);

export default CategoryPieChart;
