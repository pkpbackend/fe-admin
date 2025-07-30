import axios from "axios"
import { BACKEND_BASE_URL } from "@constants/app"

const Axios = axios.create({
  baseURL: `${BACKEND_BASE_URL}/anom`
})

export default Axios
