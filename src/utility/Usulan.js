import { JENIS_DATA_USULAN, TIPE_USULAN } from "../constants/usulan"

export const sasaranTransform = (data) => {
  if (!data) {
    return null
  }

  return {
    ...data,
    kecamatan: data.Kecamatan,
    desa: data.Desa,
    latitude: data.lat,
    longitude: data.lng
  }
}

export const usulanTransform = (data) => {
  if (!data) {
    return null
  }

  const jenisUsulan = TIPE_USULAN.find(
    (o) => o.direktorat === data.direktoratId
  )

  let transformedData = {
    id: data.id,
    jenisUsulan: {
      label: jenisUsulan.name,
      value: jenisUsulan.direktorat
    }
  }

  if (data.direktoratId === 1) {
    transformedData = {
      ...transformedData,
      jenisData: JENIS_DATA_USULAN.non_ruk.find(
        (o) => o.value === Number(data.jenisData)
      ),

      // step 1
      namaPicPengusul: data.picPengusul || "",
      jabatanPicPengusul: data.jabatanPic || "",
      emailPicPengusul: data.email || "",
      telpPicPengusul: data.telponPengusul || "",
      hpPicPengusul: data.telponPengusul || "",

      instansiPengusul: data.instansi || "",
      alamatInstansiPengusul: data.alamatInstansi || "",

      tahunUsulan: Number(data.tahunProposal) || "",
      noSurat: data.noSurat || "",
      tanggalSurat: data.tglSurat || "",

      // step 2
      penerimaManfaat: Number(data.PenerimaManfaatId) || "",
      jumlahUnit: Number(data.jumlahUnit) || "",
      jumlahTower: Number(data.jumlahTb) || "",

      provinsi: Number(data.Provinsi.id) || "",
      kabupaten: Number(data.City.id) || "",
      kecamatan: Number(data.Kecamatan.id) || "",
      desa: Number(data.Desa.id) || "",

      latitude: data.lat || "",
      longitude: data.lng || ""
    }
  } else if (data.direktoratId === 2) {
    transformedData = {
      ...transformedData,
      jenisData: JENIS_DATA_USULAN.non_ruk.find(
        (o) => o.value === Number(data.jenisData)
      ),

      // step 1
      namaPicPengusul: data.picPengusul || "",
      jabatanPicPengusul: data.jabatanPic || "",
      emailPicPengusul: data.email || "",
      telpPicPengusul: data.telponPengusul || "",
      hpPicPengusul: data.telponPengusul || "",

      instansiPengusul: data.instansi || "",
      alamatInstansiPengusul: data.alamatInstansi || "",

      tahunUsulan: Number(data.tahunProposal) || "",
      noSurat: data.noSurat || "",
      tanggalSurat: data.tglSurat || "",

      // step 2
      penerimaManfaat: Number(data.PenerimaManfaatId) || "",
      jumlahUnit: Number(data.jumlahUnit) || "",

      provinsi: Number(data.Provinsi.id) || "",
      kabupaten: Number(data.City.id) || "",

      //sasarans
      sasarans: data.Sasarans.map((item) => {
        return sasaranTransform(item)
      })
    }
  }

  return transformedData
}
