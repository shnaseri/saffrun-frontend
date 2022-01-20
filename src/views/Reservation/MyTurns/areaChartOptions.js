let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $label_color_light = "#dae1e7";

let themeColors = [$warning, $primary, $success, $danger, $info];

let options = {
  chart: {
    id: "areaChart",
    // toolbar : {
    //   show : false
    // }
  },
  xaxis: {
    // type: "datetime",
    categories: [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "12:00",
      "13:00",
      "20:00",
      "15:00",
      "16:00",
      "22:00",
      "22:00",
    ],
    labels: {
      show: true,
      rotate: 0,
      style: {
        colors: [],
        fontSize: "12px",
        fontFamily: "Dana-FaNum, Arial, sans-serif",
        fontWeight: 400,
        // cssClass: "apexcharts-yaxis-label",
      },
    },
    title: {
      text: "ساعت برگزاری ",
      offsetY: 10,
      style: {
        color: $warning,
        fontFamily: "Dana-FaNum, Arial, sans-serif",
      },
    },
    tooltip: {
      enabled: false,
    },
    tickAmount: 4, //when api is ready set it to lastTimeHour - FirstTimeHour
  },

  yaxis: {
    min: 0,
    max: 1.001,
    tickAmount: 5,
    labels: {
      show: true,
      style: {
        colors: [],
        fontSize: "12px",
        fontFamily: "Dana-FaNum, Arial, sans-serif",
        fontWeight: 400,
      },
      offsetX: -23,
      offsetY: 0,
      rotate: 0,
      formatter: (value) => {
        return `${Math.floor(value * 100)} %`;
      },
    },
    title: {
      text: "درصد شرکت ",
      offsetX: -30,
      style: {
        color: $warning,
        fontFamily: "Dana-FaNum, Arial, sans-serif",
      },
    },
  },
  stroke: {
    curve: "smooth",
  },
  dataLabels: {
    enabled: false,
  },
  // title: {
  //   text: "Product Trends by Time",
  //   align: "right",
  // },
  colors: themeColors,
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  legend: {
    offsetY: -10,
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: "Dana-FaNum, Arial, sans-serif",
    },
    marker: {
      show: false,
    },
    x: {
      show: true,
      format: "HH:mm",
    },
    y: {
      formatter: undefined,
      title: {
        formatter: (seriesName) => "",
      },
    },
  },
};
let series = [
  {
    name: "series1",
    data: [
      0.53,
      0,
      0.278,
      0.36,
      0,
      0.9,
      0.3,
      0.53,
      0,
      0.278,
      0.36,
      1,
      0.9,
      1,
    ],
  },
];

export { options, series };
