// ** React Imports
import { lazy } from "react"

const List = lazy(() => import("../../views/konregPool/features/list"))
const Create = lazy(() => import("../../views/konregPool/features/create"))
const Detail = lazy(() => import("../../views/konregPool/features/detail"))
const Edit = lazy(() => import("../../views/konregPool/features/edit"))

const KonregPool = [
  {
    element: <List />,
    path: "/konregpool/list"
  },
  {
    element: <Create />,
    path: "/konregpool/create"
  },
  {
    element: <Edit />,
    path: "/konregpool/:id/edit"
  },
  {
    element: <Detail />,
    path: "/konregpool/:id"
  }
]

export default KonregPool
