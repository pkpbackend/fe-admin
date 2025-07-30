import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://profil.perumahan.pu.go.id/public/api/sibaru',
})

export const getDemand = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get('/demand.php', {
      params: params,
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getSupply = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get('/supply.php', {
      params: params,
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
