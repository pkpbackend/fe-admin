const url_new = {
  development: "http://localhost:8000",
  staging: "https://api-sibaru.ujiaplikasi.com",
  prod: "https://sibaru.perumahan.pu.go.id/api",
};

const public_base = {
  development: "http://localhost:8000/public",
  staging: "https://api-sibaru.ujiaplikasi.com/public",
  prod: "https://sibaru.perumahan.pu.go.id/static",
};

const bypass = {
  prod: false,
  staging: false,
  development: true,
};

const dashboard_url = {
  prod: "https://sibaru.perumahan.pu.go.id/dashboard",
  staging: "https://sibaru.ujiaplikasi.com/dashboard",
  development: "http://localhost:3000/dashboard",
};

const landing_url = {
  development: "https://sibaruv3.ujiaplikasi.com/",
  staging: "https://sibaru.ujiaplikasi.com/",
  prod: "https://sibaru.perumahan.pu.go.id/",
};

const ENV = process.env.REACT_APP_NODE_ENV || "development";
export const REVALIDATE_TOKEN = process.env.REACT_APP_REVALIDATE_TOKEN || "";

export const DASHBOARD_URL = dashboard_url[ENV];

export const BACKEND_BASE_URL = {
  development: "http://localhost:8000",
  staging: "https://sibaru.stagingperumahan.com/backend",
  prod: "https://sibaru.perumahan.pu.go.id/api",
}[ENV];

export const BASE_URL = {
  development: "http://localhost:8000/api/v1",
  staging: "https://api-sibaru.ujiaplikasi.com",
  prod: "https://sibaru.perumahan.pu.go.id/api",
}[ENV];

export const LANDING_URL = landing_url[ENV];
export const BASE_NEW_URL = url_new[ENV];

export const BYPASS_LOGIN = bypass[ENV];
export const ROLE = {
  ADMIN_DIREKTORAT: 1,
  ADMIN_PERENCANA: 2,
  PEMPROV: 3,
  PEMKAB: 4,
  SNVT: 5,
  SUPER_ADMIN: 6,
  PENGEMBANG: 7,
};
export const STATUS_TERKIRIM = {
  TERKIRIM: "terkirim",
  BELUM_TERKIRIM: "belum terkirim",
  MENERIMA: "menerima",
};
export const DIREKTORAT = {
  RUSUN: 1,
  RUSUS: 2,
  SWADAYA: 3,
  RUK: 4,
  SELURUH_DIREKTORAT: 999,
};

export const MAX_SIZE_FILE = 5;

export const PUBLIC_BASE_URL = public_base[ENV];

export const SCOPE_REGION_ROLE = {
  SELURUH_INDONESIA: 1,
  PER_PROVINSI: 2,
  PER_KABUPATEN: 3,
  PER_PROVINSI_TERPILIH: 4,
  PER_KABUPATEN_TERPILIH: 5,
  USULAN_SENDIRI: 6,
};

export const DIREKTIF = {
  0: {
    label: "Reguler",
    value: 0,
  },
  1: {
    label: "Direktif",
    value: 1,
  },
  2: {
    label: "Reguler & Direktif",
    value: 2,
  },
};

export const optionsDirektif = [
  {
    label: "Reguler",
    value: 0,
  },
  {
    label: "Direktif",
    value: 1,
  },
];

export const DIREKTIF_ID = {
  REGULER: 0,
  DIREKTIF: 1,
  REGULER_DIREKTIF: 2,
};

export const STATUS_VERMIN = {
  LOLOS: 1,
  TIDAK_LOLOS: 0,
  BELUM: null,
};

export const STATUS_VERTEK = {
  LAYAK: 1,
  TIDAK_LAYAK: 0,
  BELUM: null,
};

export const DATA_MASTER_COMPONENT = ["komponenPengajuan"];

export const TYPE_USULAN = {
  1: "Non Skala Besar (Bantuan PSU NSB)",
  2: "Skala Besar (Bantuan PSU SB)",
  3: "Komunitas di Perumahan Umum",
  4: "Komunitas yang dibantu PBRS",
};

export const TYPE_USULAN_RUK = {
  5: "Perumahan Skala Besar Terdiri Lebih dari 1 (Satu) Perumahan",
  6: "Perumahan Selain Skala Besar (Prakarsa dan Upaya Kelompok MBR)",
  7: "Perumahan Skala Besar Terdiri dari 1 (Satu) Perumahan",
  8: "Perumahan Selain Skala Besar",
};

export const TYPE_USULAN_ALL = {
  ...TYPE_USULAN,
  ...TYPE_USULAN_RUK,
};

export const LABEL_DIREKTORAT = {
  1: "Rumah Susun",
  2: "Rumah Khusus",
  3: "Rumah Swadaya",
  4: "Rumah Umum",
};

export const DAYA_TAMPUNG_SETTING = {
  1: "daya_tampung_non_sekala_besar",
  2: "daya_tampung_sekala_besar",
  3: "daya_tampung_komunitas_perumahan",
  4: "daya_tampung_komunitas_bantuan",
};

export const JUMLAH_USULAN_SETTING = {
  1: "jumlah_usulan_non_sekala_besar",
  2: "jumlah_usulan_sekala_besar",
  3: "jumlah_usulan_komunitas_perumahan",
  4: "jumlah_usulan_komunitas_bantuan",
};

export const TYPE_USULAN_ID = {
  UMUM: 1,
  SEKALA_BESAR: 2,
  BANTUAN_PSU_KOMUNITAS: 3,
  SWADAYA: 4,
};

export const TYPE_DOKUMEN = {
  EXTERNAL: 1,
  INTERNAL: 2,
  TEXT: 3,
};

export const TYPE_SPESIFIKASI = {
  PB: 1, // Progress pelaksanaan baru
  PK: 2, // Peningkatan kualitas
};

export const GOOGLE_API_KEY = "AIzaSyCcqaGdC6wuMjYigsjsEaIPPcW6pOsPFlA";

export const SUPER_ADMIN_ROLE_ID = 1;

export const STATUS_SERAH_TERIMA = [
  { label: "BELUM SERAH TERIMA ASET", value: 0 },
  { label: "SUDAH SERAH TERIMA ASET", value: 1 },
];

export const KETERANGAN_SERAH_TERIMA = [
  { label: "BELUM BISA DI PROSES SERAH TERIMA ASET", value: 0 },
  { label: "BELUM DIAJUKAN", value: 1 },
  { label: "DIHAPUS DARI NERACA (HIBAH)", value: 2 },
  { label: "LENGKAP DOKUMEN EXTERNAL", value: 3 },
  { label: "MENUNGGU PERSETUJUAN HIBAH SEKJEN", value: 4 },
  { label: "PERSETUJUAN IJIN PRINSIP", value: 5 },
  { label: "PERSETUJUAN SEKJEN", value: 6 },
  { label: "PROSES BAST", value: 7 },
  { label: "PROSES PEMBERKASAN KE SEKJEN", value: 8 },
  { label: "PROSES PEMBERKASAN KE SETDITJEN", value: 9 },
  { label: "PROSES PEMBUATAN BAST DI SETDITJEN", value: 10 },
  { label: "PROSES PENCERMATAN DI KEMENKEU", value: 11 },
  { label: "PROSES PERSETUJUAN DI SETNEG", value: 12 },
  { label: "PROSES VERIFIKASI SESDITJEN", value: 13 },
  { label: "RENCANA DIHAPUS", value: 14 },
  { label: "SUDAH DIAJUKAN", value: 15 },
  { label: "SUDAH DIHAPUS", value: 16 },
  { label: "SUDAH PERSETUJUAN, BELUM SERAH TERIMA", value: 17 },
  { label: "TELAH DITERBITKAN SK PENGHAPUSAN DAN BAST", value: 18 },
  { label: "USULAN BMN", value: 19 },
];

export const JENIS_USULAN_SWADAYA = [
  {
    value: 2,
    label: "Penugasan Presiden",
    jenis: "direktif",
  },
  {
    value: 3,
    label: "Pimpinan dan Anggota Lembaga Tinggi Negara",
    jenis: "direktif",
  },
  {
    value: 4,
    label: "Pimpinan Kementerian/Lembaga",
    jenis: "direktif",
  },
  {
    value: 5,
    label: "PTN/PTS/LPKB",
    jenis: "reguler",
  },
  {
    value: 1,
    label: "Gubernur/Bupati/Walikota",
    jenis: "reguler",
  },
];
