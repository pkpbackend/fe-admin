/**
 * A simple customized chart tooltip options
 * @param {Object} options chart.js TooltipOptions
 */
function generateStyledChartTooltip(options = {}) {
  return {
    backgroundColor: "#fff",
    titleColor: "#374774",
    titleAlign: "center",
    titleFont: { family: "Quicksand Variable", weight: 600, size: 14 },
    bodyColor: "#374774",
    bodyAlign: "center",
    bodyFont: { family: "Quicksand Variable", weight: 600, size: 18 },
    bodySpacing: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    displayColors: false,
    ...options,
  };
}

export default generateStyledChartTooltip;
