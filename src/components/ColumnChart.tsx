import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Menu from "highcharts/modules/exporting";
import * as React from "react";
import { useGlobalState } from "../hooks/GlobalStateContext";
import { ProductData } from "../types/types";

const ColumnChart: React.FC = () => {
  const { state } = useGlobalState();
  const { category, selectedProducts, productList } = state;

  const chartData: ProductData[] = productList?.map((product: any) => {
    return {
      name: product.title,
      price: product.price,
    };
  });

  const seriesData = selectedProducts
    ?.map((productId) => {
      const product = chartData?.find((data) => data.name === productId);
      return product
        ? {
            name: product.name,
            data: [product.price],
            color: "#2FB2FE",
            type: "column",
            dataLabels: {
              enabled: true,
              align: "center",
              verticalAlign: "top",
              y: -20,
              formatter: function () {
                return this.y;
              },
            },
          }
        : null;
    })
    .filter(Boolean) as Highcharts.SeriesOptionsType[];

  const chartOptions: Options = {
    chart: {
      type: "column",
    },

    title: {
      text: "Products in selected Category",
      align: "left",
      x: 70,
    },

    xAxis: {
      categories: selectedProducts.map(String),
      labels: {
        useHTML: true,
        formatter: () => "",
      },
    },

    yAxis: {
      title: {
        text: category,
      },
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

export default ColumnChart;
