// ** React Imports
import { lazy } from "react"

const List = lazy(() => import("../../views/pengusulan/features/list"))
const Create = lazy(() => import("../../views/pengusulan/features/create"))
const Detail = lazy(() => import("../../views/pengusulan/features/detail"))
const Edit = lazy(() => import("../../views/pengusulan/features/edit"))

const PengusulanRoutes = [
  {
    element: <List />,
    path: "/pengusulan/list"
  },
  {
    element: <Create />,
    path: "/pengusulan/create"
  },
  {
    element: <Edit />,
    path: "/pengusulan/:id/edit"
  },
  {
    element: <Detail />,
    path: "/pengusulan/:id"
  }
]

export default PengusulanRoutes
