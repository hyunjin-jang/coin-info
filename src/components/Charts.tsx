import React from "react";
import Chart from "react-apexcharts";
import { chartData } from "../assets/chartData";

const Charts = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick", // 여기서 type이 string 대신 "candlestick"으로 지정되어야 합니다.
      height: 350,
      toolbar: {
        show: false, // 툴바 숨기기 (줌, 다운로드 버튼 등)
      },
    },
    title: {
      text: undefined
    },
    legend: {
      show: false, // 범례 숨기기
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    grid: {
      show: false, // 기준선(Grid Lines) 숨기기
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#1E88E5",  // 색상 설정 (상승 시 초록색)
          downward: "#FB8C00" // 색상 설정 (하락 시 빨간색)
        }
      }
    }
  };

  return <Chart options={options} series={chartData} type="candlestick" height={350} width={500}/>;
};

export default Charts;