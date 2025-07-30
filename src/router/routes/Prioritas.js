// ** React Imports
import { lazy } from "react"

const List = lazy(() => import("../../views/prioritas/features/list"))
const Create = lazy(() => import("../../views/prioritas/features/create"))

const PrioritasRoutes = [
  {
    element: <List />,
    path: "/prioritas/list"
  },
  {
    element: <Create />,
    path: "/prioritas/create"
  }
]

export default PrioritasRoutes
