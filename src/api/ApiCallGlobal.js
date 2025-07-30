import axios from "axios";
import { wrongLogin } from "@utils/LoginHelpers";
import { BASE_URL } from "@constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.token = localStorage.getItem("token");

const Axios = axios.create({
  baseURL: BASE_URL,
});

// Auth
function postLogin(data) {
  return Axios.post("/login", data);
}

// Usulan
function postUsulan(formData) {
  return Axios.post("/usulan", formData);
}
function postUsulanRuk(formData) {
  return Axios.post("/usulan/ruk", formData);
}
function updateUsulan(id, formData) {
  return Axios.put(`/usulan/${id}`, formData);
}
function updateUsulanRuk(id, formData) {
  return Axios.put(`/usulan/ruk/${id}`, formData);
}
function getUsulan(paramEncoded) {
  return Axios.get(`/usulan?${paramEncoded}&timestamp=${new Date().getTime()}`);
}
function getUsulanExcel(paramEncoded) {
  return Axios.get(
    `/usulan/excel?${paramEncoded}&timestamp=${new Date().getTime()}`,
    { responseType: "blob" }
  );
}
function getUsulanDetail(id) {
  return Axios.get(`/usulan/${id}`);
}
function getSasaranByUsulan(id) {
  return Axios.get(`/usulan/${id}/sasaran`);
}
function getVerminByUsulan(id) {
  return Axios.get(`/usulan/${id}/vermin`);
}
function getVertekByUsulan(id) {
  return Axios.get(`/usulan/${id}/vertek`);
}

function deleteUsulan(UsulanId) {
  return Axios.delete(`usulan/${UsulanId}`);
}

// dokumen
function getDokumen(paramEncoded) {
  let params = encodeURI(paramEncoded);
  return Axios.get(`/dokumen?${params}`);
}
function getMasterDokumen(paramEncoded) {
  return Axios.get(`/master-dokumen?${paramEncoded}`);
}
function deleteDokumen(dokumenId) {
  return Axios.delete("/dokumen/" + dokumenId);
}

// vermin
function updateVermin(id, data) {
  return Axios.put(`/vermin/${id}`, data);
}
function notificationEmailVermin(data) {
  return Axios.post("/vermin/notification-email", data);
}

// vertek
function getVertekBySasaran(id) {
  return Axios.get(`/sasaran/${id}/vertek`);
}

function updateVertek(id, data) {
  let formData = new FormData();
  formData.append("SasaranId", id);
  formData.append("status", data.status);
  formData.append("UsulanId", data.UsulanId);
  formData.append("keterangan", data.keterangan);
  formData.append("namaPupr", data.namaPupr);
  formData.append("jabatanPupr", data.jabatanPupr);
  formData.append("nipPupr", data.nipPupr);
  formData.append("telponPupr", data.telponPupr);
  formData.append("namaSnvt", data.namaSnvt);
  formData.append("jabatanSnvt", data.jabatanSnvt);
  formData.append("nipSnvt", data.nipSnvt);
  formData.append("telponSnvt", data.telponSnvt);
  formData.append("namaPejKabKota", data.namaPejKabKota);
  formData.append("jabatanPejKabKota", data.jabatanPejKabKota);
  formData.append("nipPejKabKota", data.nipPejKabKota);
  formData.append("telponPejKabKota", data.telponPejKabKota);

  formData.append("dataLapangan1", data.dataLapangan1);
  formData.append("dataLapangan2", data.dataLapangan2);
  formData.append("dataLapangan3", data.dataLapangan3);
  formData.append("dataLapangan4", data.dataLapangan4);
  formData.append("dataLapangan5", data.dataLapangan5);
  formData.append("dataLapangan6", data.dataLapangan6);
  formData.append("dataLapangan7", data.dataLapangan7);
  formData.append("dataLapangan8", data.dataLapangan8);
  formData.append("dataLapangan9", data.dataLapangan9);
  formData.append("dataLapangan10", data.dataLapangan10);
  formData.append("dataLapangan11", data.dataLapangan11);
  formData.append("dataLapangan12", data.dataLapangan12);
  formData.append("dataLapangan13", data.dataLapangan13);
  formData.append("dataLapangan14", data.dataLapangan14);
  formData.append("dataLapangan15", data.dataLapangan15);
  formData.append("dataLapangan16", data.dataLapangan16);
  formData.append("dataLapangan17", data.dataLapangan17);
  formData.append("dataLapangan18", data.dataLapangan18);
  formData.append("dataLapangan19", data.dataLapangan19);
  formData.append("dataLapangan20", data.dataLapangan20);
  formData.append("dataLapangan21", data.dataLapangan21);
  formData.append("dataLapangan22", data.dataLapangan22);

  formData.append("type", data.type);
  formData.append("tglSurvei", data.tglSurvei);
  formData.append("surveyor", data.surveyor);
  formData.append("proposalAsli", data.proposalAsli);
  formData.append("legalitasLahan", data.legalitasLahan);
  formData.append("sesuaiRTRW", data.sesuaiRTRW);
  formData.append("sesuaiMasterPlan", data.sesuaiMasterPlan);
  formData.append("kondisi", data.kondisi);
  formData.append("perkerasanJalan", data.perkerasanJalan);
  formData.append("sumberListrik", data.sumberListrik);
  formData.append("sumberAir", data.sumberAir);
  formData.append("jarakKepusatKegiatan", data.jarakKepusatKegiatan);
  formData.append("kondisiTanah", data.kondisiTanah);
  formData.append("kelayakanTeknis", data.kelayakanTeknis);

  formData.append("namaLokasiDetail", data.namaLokasiDetail);
  formData.append("titikKoordinat", data.titikKoordinat);
  formData.append("peruntukan", data.peruntukan);
  formData.append("tglVertek", data.tglVertek);
  formData.append("statusLahan", data.statusLahan);
  formData.append("rtrw", data.rtrw);
  formData.append("luasLahan", data.luasLahan);
  formData.append("kondisiLahan", data.kondisiLahan);
  formData.append("kondisiJalanAkses", data.kondisiJalanAkses);
  formData.append("jauhLahanDariJalanUtama", data.jauhLahanDariJalanUtama);
  formData.append("sumberAirBersih", data.sumberAirBersih);
  formData.append(
    "sumberPenerbanganDanJarakGardu",
    data.sumberPenerbanganDanJarakGardu
  );
  formData.append("aksesSaluranPembuangan", data.aksesSaluranPembuangan);
  formData.append("groundJarak", data.groundJarak);
  formData.append("sitePlant", data.sitePlant);
  formData.append("jenisTanah", data.jenisTanah);
  formData.append("tipologiPermukaanTanah", data.tipologiPermukaanTanah);
  formData.append("rawanBencana", data.rawanBencana);
  formData.append("catatan", data.catatan);
  formData.append("fileFoto", data.fileFoto);
  formData.append("fileVertek", data.fileVertek);
  return Axios.put(`/vertek/${id}`, formData);
}

// dokumen
function postDokumen(data) {
  // udah langsung jadi form data
  return Axios.post("/dokumen", data);
}

function updateDokumen(id, data) {
  let rayFalse = [null, undefined, "null", "undefined", 0];
  let formData = new FormData();
  formData.append("id", data.id);
  formData.append("file", data.file ? data.file : "");
  if (data.fileInput) {
    formData.append("fileInput", data.fileInput);
  }
  formData.append("model", data.model);
  formData.append("ModelId", data.ModelId);
  formData.append("UsulanId", data.UsulanId);
  formData.append("keterangan", data.keterangan ? data.keterangan : "");
  formData.append("status", data.status);
  formData.append("MasterDokumenId", data.MasterDokumenId);
  formData.append("lengkap", data.lengkap);
  formData.append("ditRususDokumenId", data.ditRususDokumenId);
  formData.append("ditRususVerminId", data.ditRususVerminId);
  formData.append("valueText", data.valueText);

  return Axios.put(`/dokumen/${id}`, formData);
}

function getCityByIdProvinsi(id) {
  return Axios.get(`/city/search/${id}`);
}
function getCity(params) {
  return new Promise((resolve, reject) => {
    Axios.get(`/city?${params}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
function getProvinsi() {
  return Axios.get("/provinsi");
}

function getKecamatanByCity(id) {
  return Axios.get(`/city/${id}/kecamatan`);
}
function getDesaByKecamatan(id) {
  return Axios.get(`/kecamatan/${id}/desa`);
}
function getKabupatenByBulkProvinsi(params) {
  return Axios.get(`/city-provinsi?${params}`);
}

function getPenerimaManfaat(params) {
  if (params) {
    return Axios.get(`/penerima-manfaat?${params}`);
  }

  return Axios.get("/penerima-manfaat");
}

function getUser(paramEncoded) {
  return Axios.get(`/user?${paramEncoded}`);
}

function postUser(data) {
  return Axios.post("/user", data);
}

function deleteUser(id) {
  return Axios.delete(`/user/${id}`);
}

function getUserDetail(id) {
  return Axios.get(`/user/${id}`);
}

function updateUser(id, data) {
  return Axios.put(`/user/${id}`, data);
}

function getRole(params) {
  return Axios.get(`/role?${params}`);
}

function storeRole(formData) {
  return Axios.post("/role", formData);
}

function updateRole(id, formData) {
  return Axios.put(`/role/${id}`, formData);
}

function deleteRole(id) {
  return Axios.delete(`/role/${id}`);
}

function getSettings() {
  return Axios.get("/settings");
}

function updateSettings(data) {
  return Axios.put("/settings", data);
}

function getSettingByName(paramEncoded) {
  return Axios.get(`/get-setting?${paramEncoded}`);
}

function storeExcel(id, formData) {
  return Axios.put(`/settings/excel/${id}`, formData);
}

// pengembang
function getPengembang(params) {
  return Axios.get(`/pengembang?${params}`);
}

function storePengembang(data) {
  return Axios.post("/pengembang", data);
}
function updatePengembang(id, formData) {
  return Axios.put(`/pengembang/${id}`, formData);
}
function deletePengembang(id) {
  return Axios.delete(`/pengembang/${id}`);
}

// master kategori dokumen
function getMasterKategoriDokumen(params) {
  return Axios.get(`/master-kategori-dokumen?${params}`);
}

function registerPengembang(formData) {
  let newForm = new FormData();
  // newForm.append('fileNpwp', formData.fileNpwp);
  let keys = Object.keys(formData);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    newForm.append(key, formData[key]);
  }

  return Axios.post("/register-pengembang", newForm);
}

function getMasterKomponenPengajuan(params) {
  return Axios.get(`/master-komponen-pengajuan?${params}`);
}

function storeMasterKomponenPengajuan(formData) {
  return new Promise((resolve, reject) => {
    Axios.post("/master-komponen-pengajuan", formData)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function updateMasterKomponenPengajuan(id, formData) {
  return new Promise((resolve, reject) => {
    Axios.put(`/master-komponen-pengajuan/${id}`, formData)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function deleteMasterKomponenPengajuan(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/master-komponen-pengajuan/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function getDirektorat(params) {
  return Axios.get(`/direktorat?${params}`);
}

// perumahan

function createPerumahan(formData) {
  return new Promise((resolve, reject) => {
    Axios.post("/perumahan", formData)
      .then((res) => {
        let response = res.data;
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updatePerumahan(PerumahanId, formData) {
  return new Promise((resolve, reject) => {
    Axios.put(`/perumahan/${PerumahanId}`, formData)
      .then((res) => {
        let response = res.data;
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// perusahaan

function createPerusahaan(formData) {
  return new Promise((resolve, reject) => {
    Axios.post("/perusahaan", formData)
      .then((res) => {
        let response = res.data;
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updatePerusahaan(PerusahaanId, formData) {
  return new Promise((resolve, reject) => {
    Axios.put(`/perusahaan/${PerusahaanId}`, formData)
      .then((res) => {
        let response = res.data;
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// rekapitulasi

function getRekapUsulan(params = "") {
  return Axios.get(`/rekapitulasi-usulan?${params}`);
}

function getRekapUsulanProvinsi(params) {
  return Axios.get(`/rekapitulasi/usulan-status-terkirim/provinsi?${params}`);
}

function getRekapUsulanKabupaten(params) {
  return Axios.get(`/rekapitulasi/matrik/kabupaten?${params}`);
}

function getJumlahUnitKabupaten(props) {
  let CityId = props.CityId || null;
  return Axios.get(`/rekapitulasi/unit-kabupaten/${CityId}`);
}

// siprus
function getUsulanRusus(params) {
  return Axios.get(`/rusus/usulan?${params}`);
}

// swadaya
function postUsulanSwadaya(formData) {
  return Axios.post("/swadaya/usulan", formData);
}

function getScopeRegionRole(params = "") {
  return Axios.get(`/role/scope-region?${params}`);
}

// rusun
function getUsulanRusun() {
  return Axios.get("/rusun/usulan/proposal");
}

function getUsulanByIdRusun(id) {
  return Axios.get(`/rusun/usulan/proposal/${id}`);
}

function storeUsulanRusun(formData) {
  return Axios.post("/rusun/usulan/proposal", formData);
}

function updateUsulanRusun(id, formData) {
  return Axios.put(`/rusun/usulan/${id}`, formData);
}

function getPeruntukanRusun() {
  return Axios.get("/rusun/peruntukan");
}

function getProvinsiRusun() {
  return Axios.get("/rusun/provinsi");
}

function getKabupatenRusun(id = false) {
  if (id) {
    return Axios.get(`/rusun/provinsi/${id}`);
  }
}

function storeDocumentRusun(formData) {
  return Axios.post("/rusun/document", formData);
}

function updateDocumentRusun(id, formData) {
  return Axios.put(`/rusun/document/${id}`, formData);
}

function updateVerminByUsulanRusun(UsulanId, formData) {
  return Axios.put(`/rusun/vermin-byusulan/${UsulanId}`, formData);
}

function updateVertekByUsulanRusun(UsulanId, formData) {
  return Axios.put(`/rusun/vertek-byusulan/${UsulanId}`, formData);
}

function getVertekByUsulanRusun(UsulanId) {
  return Axios.get(`/rusun/vertek-byusulan/${UsulanId}`);
}

// spesifikasi

function getSpesifikasiByUsulan({ UsulanId, type }) {
  return new Promise((resolve, reject) => {
    Axios.get(`/spesifikasi-byusulan/${UsulanId}?type=${type}`)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
}

function storeSpesifikasi(formData) {
  return new Promise((resolve, reject) => {
    Axios.post("/spesifikasi", formData)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
}

function updateSpesifikasi(SpesifikasiId, formData) {
  return new Promise((resolve, reject) => {
    Axios.put(`/spesifikasi/${SpesifikasiId}`, formData)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
}

function deleteSpesifikasi(SpesifikasiId, formData) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/spesifikasi/${SpesifikasiId}`, formData)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

// master kegiatan
function getMasterKegiatan(params) {
  return new Promise((resolve, reject) => {
    Axios.get(`/master-kegiatan?${params}`)
      .then((res) => {
        let listKegiatan = res.data.data;
        // listKegiatan = listKegiatan.map(item => ({ value: item.id, label: item.name }))
        // return listKegiatan
        resolve(listKegiatan.data);
      })
      .catch((err) => reject(err));
  });
}

function storeMasterKegiatan(formData) {
  return new Promise((resolve, reject) => {
    Axios.post("/master-kegiatan", formData)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
}

function updateMasterKegiatan(MasterKegiatanId, formData) {
  return new Promise((resolve, reject) => {
    Axios.put(`/master-kegiatan/${MasterKegiatanId}`, formData)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function deleteMasterKegiatan(MasterKegiatanId) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/master-kegiatan/${MasterKegiatanId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

// PENETAPAN
function getPenetapan(params) {
  return new Promise((resolve, reject) => {
    Axios.get(`/penetapan?${params}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
function getPenetapanUsulan(params) {
  return new Promise((resolve, reject) => {
    Axios.get(`/penetapanusulan?${params}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
function getDetailPenetapan(PenetapanId) {
  return new Promise((resolve, reject) => {
    Axios.get(`/penetapan/${PenetapanId}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
function storePenetapan(formData) {
  return new Promise((resolve, reject) => {
    Axios.post("/penetapan", formData)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function updatePenetapan(id, formData) {
  return new Promise((resolve, reject) => {
    Axios.put(`/penetapan/${id}`, formData)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function deletePenetapan(id) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/penetapan/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function getBdtrtlh(params) {
  return new Promise((resolve, reject) => {
    Axios.get(`/bdtrtlh?${params}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function getJumlahRtlh(props) {
  let params = "";
  if (typeof props === "object" && Object.keys(props).length > 0) {
    ({ params } = props);
  }

  return Axios.get(`/jumlah-rtlh?${params}`).then((res) => res.data);
}

function getJumlahRtlhPerDesa(props) {
  return Axios.get(`/jumlah-rtlh-desa?${props}`).then((res) => res.data);
}

async function synchronizeEmonTable(props) {
  let { params } = props;
  if (!params) params = "";
  return new Promise((resolve, reject) => {
    Axios.get(`/synchronize-emon`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

// get user notification
async function getNotificationUser(props) {
  let params = "";
  if (props) {
    params = props.params;
  }
  return new Promise((resolve, reject) => {
    return null;
    // Axios.get(`/notification?${params}`)
    //   .then((res) => resolve(res.data))
    //   .catch((err) => reject(err))
  });
}

async function readNotification(props) {
  let params = "";
  let id = "";
  if (props) {
    params = props.params;
    id = props.id;
  }
  return new Promise((resolve, reject) => {
    Axios.put(`/notification/${id}?${params}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

async function readAllNotification(id) {
  return new Promise((resolve, reject) => {
    Axios.put(`/notification-readall/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

async function getCommentByUsulan(id) {
  return Axios.get(`/comment-by-usulan/${id}`).then((res) => res.data);
}

async function createCommentUsulan(formData) {
  return Axios.post("/comment-usulan", formData).then((res) => res.data);
}

async function updateCommentUsulan(id, formData) {
  return Axios.put(`/comment-usulan/${id}`, formData).then((res) => res.data);
}

async function deleteCommentUsulan(id) {
  return Axios.delete(`/comment-usulan/${id}`);
}

async function getDetailRekapMatrixRuk(props) {
  let UsulanId;
  let params;
  if (typeof props === "object" && Object.keys(props).length > 0) {
    ({ UsulanId, params } = props);
    params = params || "";
  }

  return Axios.get(`/rekapitulasi/matrix-ruk/${UsulanId}?${params}`);
}

async function getListTahunUsulan(props) {
  return Axios.get("/tahun-usulan");
}

async function getListTahunBantuanPsu(props) {
  return Axios.get("/tahun-bantuan-psu");
}

async function getListTahunSuratUsulan(props) {
  return Axios.get("/tahun-surat-usulan");
}

async function getListTahunProposal(props) {
  return Axios.get("/tahun-proposal");
}

// bikin api di atas
async function onErrorCatch(error) {
  let message = "No Internet Connection";
  let httpStatus = 0;
  if (error.response) {
    let { data, status } = error.response;
    httpStatus = status;
    if (data) {
      if (data.message) {
        message = data.message;
      }
    }
  } else if (error.message) {
    message = error.message;
  }
  // await swal({
  //   title: 'Oops...',
  //   text: message,
  //   type: 'error',
  // })
  if (httpStatus === 403) {
    return wrongLogin();
  }
}

async function synchronizeUsulanRusus(params) {
  return Axios.get(`/rusus/synchronize-usulan`);
}

const ApiCall = {
  postLogin,
  Axios,
  updateUsulan,
  updateUsulanRuk,
  getUsulan,
  getUsulanExcel,
  getUsulanDetail,
  postUsulan,
  postUsulanRuk,
  deleteUsulan,
  getSasaranByUsulan,
  getVertekByUsulan,
  getVertekBySasaran,
  updateVertek,

  getVerminByUsulan,
  updateVermin,

  postDokumen,
  updateDokumen,
  getMasterDokumen,
  getDokumen,
  deleteDokumen,

  getMasterKategoriDokumen,
  getMasterKomponenPengajuan,
  storeMasterKomponenPengajuan,
  updateMasterKomponenPengajuan,
  deleteMasterKomponenPengajuan,
  getPengembang,
  storePengembang,
  updatePengembang,
  deletePengembang,

  getProvinsi,
  getCityByIdProvinsi,
  getCity,
  getKecamatanByCity,
  getDesaByKecamatan,
  getKabupatenByBulkProvinsi,

  getRole,
  storeRole,
  updateRole,
  deleteRole,

  getUser,
  getDirektorat,
  registerPengembang,
  postUser,
  deleteUser,
  updateUser,
  getUserDetail,

  getSettings,
  getSettingByName,
  updateSettings,
  notificationEmailVermin,

  onErrorCatch,
  getPenerimaManfaat,

  createPerumahan,
  updatePerumahan,
  createPerusahaan,
  updatePerusahaan,

  getRekapUsulan,
  // rusus
  getUsulanRusus,
  // swadaya
  postUsulanSwadaya,

  getScopeRegionRole,

  getUsulanRusun,
  storeUsulanRusun,
  updateUsulanRusun,
  getPeruntukanRusun,
  getProvinsiRusun,
  getKabupatenRusun,
  getUsulanByIdRusun,
  storeDocumentRusun,
  updateDocumentRusun,
  updateVerminByUsulanRusun,
  updateVertekByUsulanRusun,
  getVertekByUsulanRusun,

  // spesifikasi
  getSpesifikasiByUsulan,
  storeSpesifikasi,
  updateSpesifikasi,
  deleteSpesifikasi,

  // master kegiatan
  getMasterKegiatan,
  storeMasterKegiatan,
  updateMasterKegiatan,
  deleteMasterKegiatan,

  // PENETAPAN
  storePenetapan,
  getPenetapan,
  getPenetapanUsulan,
  getDetailPenetapan,
  deletePenetapan,
  updatePenetapan,

  // BDTRTLH
  getBdtrtlh,
  getJumlahRtlh,
  getJumlahRtlhPerDesa,

  // synchronize
  synchronizeEmonTable,

  // notification
  getNotificationUser,
  readNotification,

  getCommentByUsulan,
  createCommentUsulan,
  updateCommentUsulan,
  deleteCommentUsulan,
  // matrix ruk
  getDetailRekapMatrixRuk,

  getListTahunUsulan,
  getListTahunBantuanPsu,
  getListTahunSuratUsulan,
  getListTahunProposal,
  synchronizeUsulanRusus,
  storeExcel,

  getRekapUsulanProvinsi,
  getRekapUsulanKabupaten,
  getJumlahUnitKabupaten,

  readAllNotification,
};

export default ApiCall;
