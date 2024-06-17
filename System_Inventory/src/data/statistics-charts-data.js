import { chartsConfig } from "@/configs";
import axios from "axios";


const getProductStatistics = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/product-statistics");
    return response.data;
  } catch (error) {
    console.error("Error fetching product statistics", error);
    return null;
  }
};

const websiteViewsChart = async () => {
  const stats = await getProductStatistics();
  return {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: stats ? [stats.views, ...Array(6).fill(0)] : [50, 20, 10, 22, 50, 10, 40], 
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#388e3c",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["M", "T", "W", "T", "F", "S", "S"],
      },
    },
  };
};

const dailySalesChart = async () => {
  const stats = await getProductStatistics();
  return {
    type: "line",
    height: 220,
    series: [
      {
        name: "Sales",
        data: stats ? [stats.sales, ...Array(8).fill(0)] : [50, 40, 300, 320, 500, 350, 200, 230, 500], // Ejemplo de cómo puedes utilizar los datos obtenidos
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
};

const completedTaskChart = async () => {
  const stats = await getProductStatistics();
  return {
    type: "line",
    height: 220,
    series: [
      {
        name: "Tasks",
        data: stats ? [stats.sales, ...Array(8).fill(0)] : [50, 40, 300, 320, 500, 350, 200, 230, 500], // Ejemplo de cómo puedes utilizar los datos obtenidos
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#388e3c"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
};

// Exportar datos como una promesa
export const fetchStatisticsChartsData = () => {
  return Promise.all([websiteViewsChart(), dailySalesChart(), completedTaskChart()]).then(([websiteViews, dailySales, completedTasks]) => [
    {
      color: "white",
      title: "Website View",
      description: "Last Campaign Performance",
      footer: "campaign sent 2 days ago",
      chart: websiteViews,
    },
    {
      color: "white",
      title: "Daily Sales",
      description: "15% increase in today sales",
      footer: "updated 4 min ago",
      chart: dailySales,
    },
    {
      color: "white",
      title: "Completed Tasks",
      description: "Last Campaign Performance",
      footer: "just updated",
      chart: completedTasks,
    },
  ]);
};

export default fetchStatisticsChartsData;

