import React, { useEffect } from "react";
import Chart from "chart.js/auto";
// import { DIREKTORAT_COLORS } from "@constants/index";
import Strings from "@utils/Strings";
import generateChartBackground from "@utils/generateChartBackground";
import generateStyledChartTooltip from "@utils/generateStyledChartTooltip";
import { useSmallDeviceMediaQuery } from "@utils/breakpoints";

export default function BarChart({dataRekap, canvasName}) {
  const isSmallDevice = useSmallDeviceMediaQuery();
  // For useEffect only
  const trackingDeps = JSON.stringify(Object.values(dataRekap));

  useEffect(() => {
    const el = document.getElementById(
      isSmallDevice ? `barChartXS_${canvasName}` : `barChart_${canvasName}`
    );

    const ctx = el.getContext("2d");
    const highestValue = Math.max(...Object.values(dataRekap));
    const suggestedMax =
      highestValue > 0 ? highestValue * 0.25 + highestValue : 10;

    // Urutannya mempengaruhi chartData
    const chartLabels = dataRekap?.map(data=> {
      return data?.name
    });

    const chartData = dataRekap?.map(data=> {
      return data?.value
    });

    // This code is buggy when used without 2 chart
    if (isSmallDevice) {
      el.height = chartLabels.length * 90;
    }

    const data = {
      labels: isSmallDevice ? chartData : chartLabels,
      datasets: [
        {
          barThickness: isSmallDevice ? 32 : undefined,
          data: chartData,
          backgroundColor: dataRekap?.map(data=> {
            return data?.color
          })
        },
      ],
    };

    const options = {
      indexAxis: isSmallDevice ? "y" : "x",
      plugins: {
        datalabels: {
          display: !isSmallDevice,
          color: "#374774",
          font: { family: "Quicksand", weight: 600, size: 14 },
          align: "end",
          anchor: "end",
          formatter: (value) => {
            if (value > 0) {
              return Intl.NumberFormat('en-US', {
                notation: "compact",
                maximumFractionDigits: 1
              }).format(value);
            }
            return "";
          },
        },
        legend: { display: false },
        tooltip: generateStyledChartTooltip({
          callbacks() {
            return {
              title(titleContext) {
                const { dataIndex } = titleContext[0];
                return chartLabels[dataIndex];
              },
            };
          },
        }),
      },
      scales: {
        x: {
          grid: { lineWidth: 0 },
          ticks: {
            display: isSmallDevice,
            callback: (value) => {
              return Intl.NumberFormat('en-US', {
                notation: "compact",
                maximumFractionDigits: 1
              }).format(value);
            },
            font: { family: "Quicksand", size: 14 },
            color: "#374774",
          },
        },
        y: {
          suggestedMax: isSmallDevice ? undefined : suggestedMax,
          grid: { color: "#DFDFDF" },
          ticks: {
            font: {
              family: "Quicksand",
              size: 14,
              weight: isSmallDevice ? 600 : undefined,
            },
            color: "#374774",
            ...(isSmallDevice
              ? {
                  z: 1,
                  labelOffset: -22,
                  padding: 2,
                  mirror: true,
                  callback(index) {
                    const chartValue = chartData[parseFloat(index)];

                    if (chartValue > 0) {
                      return Strings.localizeNumber(chartValue);
                    }

                    return "";
                  },
                }
              : {
                  callback(value) {
                    return Intl.NumberFormat('en-US', {
                      notation: "compact",
                      maximumFractionDigits: 1
                    }).format(value);
                  },
                }),
          },
        },
      },
    };

    const barChart = new Chart(ctx, {
      type: "bar",
      data,
      options,
      plugins: generateChartBackground("barChartRekapCapaianBg"),
    });

    return () => {
      barChart.destroy();
    };
  }, [
    trackingDeps,
    isSmallDevice,
    dataRekap,
  ]);

  /**
   * Creating 2 chart is the method to fix height when entering
   * mobile screen
   */
  return (
    <>
      <div style={{ display: isSmallDevice ? undefined : "none" }}>
        <canvas id={`barChartXS_${canvasName}`} />
      </div>

      <div style={{ display: isSmallDevice ? "none" : undefined }}>
        <canvas id={`barChart_${canvasName}`} />
      </div>
    </>
  );
}
