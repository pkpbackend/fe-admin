const ENV = process.env.REACT_APP_NODE_ENV || "development";

export const TITLE = "SIBARU | Sistem Informasi Bantuan Perumahan";

export const BACKEND_BASE_URL = {
  development: "http://localhost:8000",
  staging: "https://api-sibaruv3.ujiaplikasi.com",
  prod: "https://sibaru.perumahan.pu.go.id/api",
}[ENV];

export const BACKEND_BASE_URLV3 = {
  development: "http://localhost:8000",
  staging: "https://api-sibaruv3.ujiaplikasi.com",
  prod: "https://sibaru.perumahan.pu.go.id/api",
}[ENV];

export const ASSET_URL = {
  development: "https://sibaru.s3.ap-southeast-1.amazonaws.com/sibaru",
  staging: "https://sibaru.s3.ap-southeast-1.amazonaws.com/sibaru",
  prod: "https://sibaru.perumahan.pu.go.id/static",
}[ENV];

export const URLs = {
  v3: `http://api-sibaruv3.ujiaplikasi.com/v3`,
};
