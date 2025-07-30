export const TIPE_USULAN = [
  {
    direktorat: 1,
    name: "Bantuan Rumah Susun",
    privKey: "ditRusun"
  },
  {
    direktorat: 2,
    name: "Bantuan Rumah Khusus",
    privKey: "ditRusus"
  },
  {
    direktorat: 3,
    name: "Bantuan Stimulan Perumahan Swadaya",
    privKey: "ditSwadaya"
  },
  {
    direktorat: 4,
    name: "Bantuan Prasarana dan Sarana Umum",
    privKey: "ditRuk"
  }
]

export const JENIS_DATA_USULAN = {
  ruk: [
    {
      value: 1,
      label: "Non Skala Besar (Bantuan PSU NSB)"
    },
    {
      value: 2,
      label: "Skala Besar (Bantuan PSU SB)"
    },
    {
      value: 3,
      label: "Komunitas di Perumahan Umum"
    },
    {
      value: 4,
      label: "Komunitas yang dibantu PBRS"
    },
    {
      value: 5,
      label: "Perumahan Skala Besar Terdiri dari 1 (Satu) Perumahan",
      create: true,
      pengusul: ["pemda"]
    },
    {
      value: 6,
      label: "Perumahan Selain Skala Besar (Prakarsa dan Upaya Kelompok MBR)",
      create: true,
      pengusul: ["pemda"]
    },
    {
      value: 7,
      label: "Perumahan Skala Besar Terdiri dari 1 (Satu) Perumahan",
      create: true,
      pengusul: ["pengembang"]
    },
    {
      value: 8,
      label: "Perumahan Selain Skala Besar",
      create: true,
      pengusul: ["pengembang"]
    }
  ],
  non_ruk: [
    {
      value: 2,
      label: "Penugasan Presiden",
      jenis: "direktif",
      direktorat: [1, 2, 3]
    },
    {
      value: 3,
      label: "Pimpinan dan Anggota Lembaga Tinggi Negara",
      jenis: "direktif",
      direktorat: [1, 2, 3]
    },
    {
      value: 4,
      label: "Pimpinan Kementerian/Lembaga",
      jenis: "direktif",
      direktorat: [1, 2, 3]
    },
    {
      value: 5,
      label: "Pimpinan PTN/PTS/PONPES/LPKB",
      jenis: "reguler",
      direktorat: [1]
    },
    {
      value: 1,
      label: "Bupati/Walikota",
      jenis: "reguler",
      direktorat: [1, 2, 3]
    }
  ]
}

export const DIREKTORAT = {
  1: "Direktorat Rumah Susun",
  2: "Direktorat Rumah Khusus",
  3: "Direktorat Rumah Swadaya",
  4: "Direktorat Rumah Umum dan Komersil"
}

export const CHECKLIST_RANGKAIAN_PEMROGRAMAN = {
  1: "RAKORBANGWIL",
  2: "KONREG",
  3: "RAKORTEK",
  4: "RAKORTEKREMBANG",
  5: "MUSREMBANGNAS",
  6: "SB PAGU INDIKATIF",
  7: "SB PAGU ANGGARAN",
  8: "TRILATERAL MEETING I",
  9: "RAKORTEK II",
  10: "SB ALOKASI ANGGARAN",
  11: "TRILATERAL MEETING II"
}
