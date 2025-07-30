import get from "lodash/get";

export default function generateChartBackground(pluginId, color = "#F8F8F8") {
  return [
    {
      id: pluginId,
      beforeDraw(chartInstance) {
        const chartArea = get(chartInstance, "chartArea");
        const { ctx: ctxBeforeDraw } = chartInstance;

        ctxBeforeDraw.save();
        ctxBeforeDraw.fillStyle = color;
        ctxBeforeDraw.fillRect(
          chartArea?.left,
          chartArea?.top,
          chartArea?.right - chartArea?.left,
          chartArea?.bottom - chartArea?.top
        );

        ctxBeforeDraw.restore();
      },
    },
  ];
}
