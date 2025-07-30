// ** React Imports
import { lazy } from "react"

const List = lazy(() => import("../../views/pemanfaatan/list"))

const PemanfaatanRoutes = [
  {
    element: <List />,
    path: "/pemanfaatan/list"
  }
]

export default PemanfaatanRoutes
