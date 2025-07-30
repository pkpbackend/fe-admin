import "@src/App.scss";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

// ** Router Import
import { getUser } from "@utils/LoginHelpers";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { TITLE } from "./constants/app";
import { setAuthUser } from "./redux/auth";
import Router from "./router/Router";

// Register Chart Data Labels
Chart.register(ChartDataLabels);

const App = () => {
  const dispatch = useDispatch();
  const user = getUser();

  useEffect(() => {
    document.title = TITLE;

    if (user) {
      dispatch(setAuthUser(user));
    }
  }, [dispatch, user]);

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
