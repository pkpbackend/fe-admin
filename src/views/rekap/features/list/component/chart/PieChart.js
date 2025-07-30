import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { useSmallDeviceMediaQuery } from "@utils/breakpoints";
import generateStyledChartTooltip from "@utils/generateStyledChartTooltip";

export default function PieChart({dataRekap, canvasName}) {
  const isSmallDevice = useSmallDeviceMediaQuery();
  // For useEffect only
  useEffect(() => {
    const el = document.getElementById(`pieChart_${canvasName}`);
    const ctx = el.getContext("2d");
    const data = {
      labels: dataRekap?.map(data=> {
        return data?.name
      }),
      datasets: [
        {
          data: dataRekap?.map(data=> {
            return data?.value
          }),
          backgroundColor: dataRekap?.map(data=> {
            return data?.color
          })
        },
      ],
    };

    const options = {
      plugins: {
        datalabels: {
          color: "white",
          font: { family: "Quicksand", size: 16 },
          formatter: (value, context) => {
            const partialValue = value;
            const totalValue = context.dataset.data.reduce(
              (prev, curr) => prev + curr,
              0
            );

            const percentage = ((partialValue / totalValue) * 100).toFixed(0);

            if (percentage > 3) {
              return `${percentage}%`;
            }

            return "";
          },
        },
        legend: { display: false },
        tooltip: generateStyledChartTooltip({
          callbacks() {
            return {
              title(titleContext) {
                const { label } = titleContext[0];

                return label;
              },
              label(labelContext) {
                return labelContext.formattedValue;
              },
            };
          },
        }),
      },
    };

    const pieChart = new Chart(ctx, {
      type: "pie",
      data,
      options,
    });

    return () => {
      pieChart.destroy();
    };
  }, [dataRekap, isSmallDevice]);

  return (
    <div className="d-flex align-items-center justify-content-center w-50 m-auto">
      <canvas id={`pieChart_${canvasName}`} />
    </div>
  );
}
