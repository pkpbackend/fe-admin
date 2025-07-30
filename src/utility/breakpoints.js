import { useMediaQuery } from "react-responsive";
const useExtraLargeDeviceMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 1200px)" });
const useLargeDeviceMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 992px)" });
const useMediumDeviceMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 768px)" });
const useSmallDeviceMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 577px)" });

export {
  useExtraLargeDeviceMediaQuery,
  useLargeDeviceMediaQuery,
  useMediumDeviceMediaQuery,
  useSmallDeviceMediaQuery,
};
