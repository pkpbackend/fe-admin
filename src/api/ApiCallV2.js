import axios from "axios";
import { BASE_URL, BASE_NEW_URL } from "@constants";
// import { wrongLogin } from '../utils/LoginHelpers'

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.token = localStorage.getItem("token");

const Axios = axios.create({
  baseURL: BASE_URL,
});

const apiLoginPengembang = axios.create({
  baseURL: BASE_NEW_URL,
});

export const postLoginV2 = function (formdata) {
  return new Promise((resolve, reject) => {
    Axios.post("/login", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postLoginPengembang = function (formdata) {
  return new Promise((resolve, reject) => {
    apiLoginPengembang
      .post("/ssosikumbang-login", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postRegister = function (params) {
  let formdata = new FormData();
  if (params.fileNpwp) {
    formdata.append("fileNpwp", params.fileNpwp);
    delete params.fileNpwp;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.post("/register-pengembang-v2", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postLupaPassword = function (formdata) {
  return new Promise((resolve, reject) => {
    Axios.put("/v2/profile/lupapassword", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postVerifyLupaPassword = function (formdata) {
  return new Promise((resolve, reject) => {
    Axios.put("/v2/profile/verifylupapassword", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//meong
export const getFilterMaster = () => {
  return new Promise((resolve, reject) => {
    Axios.get(`/pemanfaatan/getfilterkuning`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getFilterMasterInput = () => {
  return new Promise((resolve, reject) => {
    Axios.get(`/pemanfaatan/masterinput`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDataPemanfaatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/pemanfaatan/getprofilekuning", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const simpanPemanfaatan = function (formdata) {
  return new Promise((resolve, reject) => {
    Axios.post("/pemanfaatan/simpan", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updatePemanfaatan = function (formdata) {
  return new Promise((resolve, reject) => {
    Axios.put("/pemanfaatan/update", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const hapusPemanfaatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/pemanfaatan/hapus", {
      data: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export function fetchExcelPemanfaatan(params) {
  return new Promise((resolve, reject) => {
    Axios.get("/pemanfaatan/excel", {
      params: params,
      responseType: "blob",
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const getDataDetailPemanfaatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/pemanfaatan/detailprofile", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadFotoPemanfaatan = function (params) {
  let formdata = new FormData();

  if (params.files) {
    params.files.forEach((file) => {
      formdata.append("foto", file);
    });
  }

  formdata.append("id", params.id);

  return new Promise((resolve, reject) => {
    Axios.put("/pemanfaatan/foto/upload", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadVideoPemanfaatan = function (files, idPemanfaatan) {
  let formdata = new FormData();

  if (files.length > 0) {
    files.forEach((file) => {
      formdata.append("video", file.originFileObj);
    });
  }

  formdata.append("id", idPemanfaatan);

  return new Promise((resolve, reject) => {
    Axios.put("/pemanfaatan/video/upload", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const hapusFotoPemanfaatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/pemanfaatan/foto/hapus", {
      data: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const hapusVideoPemanfaatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/pemanfaatan/video/hapus", {
      data: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadDokumenPemanfaatan = function (params) {
  let formdata = new FormData();

  if (params.dokumen) {
    formdata.append("dokumen", params.dokumen);
  }

  for (const [key, value] of Object.entries(params)) {
    if (key !== "dokumen") {
      formdata.append(key, value);
    }
  }

  return new Promise((resolve, reject) => {
    Axios.put("/pemanfaatan/dokumen/upload", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const hapusDokumenPemanfaatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/pemanfaatan/dokumen/hapus", {
      data: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getRtlh = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/getrtlh", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getRekapUsulan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/rekapusulan", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//master filter usulan
export const getTahunUsulan = function () {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/filter/tahunusulan")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getFilterUsulan = function () {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/filter/usulan")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getPenerimaManfaat = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/filter/penerimamanfaat", {
      params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getKroRo = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/filter/kroro", {
      params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//master data
export const getProvinsi = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/provinsi", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getProvinsiById = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/provinsibyid", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createProvinsi = function (params) {
  let formdata = new FormData();
  if (params.geojson) {
    formdata.append("geojson", params.geojson);
    delete params.geojson;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.post("/v2/provinsi", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProvinsi = function (params) {
  let formdata = new FormData();
  if (params.geojson) {
    formdata.append("geojson", params.geojson);
    delete params.geojson;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.put("/v2/provinsi", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteProvinsi = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/v2/provinsi", { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//kabupaten
export const getKabupaten = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/kabupaten", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getKabupatenById = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/kabupatenbyid", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getKabupatenByProvinsi = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/kabupatenbyprovinsi", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createKabupaten = function (params) {
  let formdata = new FormData();
  if (params.geojson) {
    formdata.append("geojson", params.geojson);
    delete params.geojson;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.post("/v2/kabupaten", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateKabupaten = function (params) {
  let formdata = new FormData();
  if (params.geojson) {
    formdata.append("geojson", params.geojson);
    delete params.geojson;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.put("/v2/kabupaten", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteKabupaten = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/v2/kabupaten", { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//kecamatan
export const getKecamatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/kecamatan", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getKecamatanById = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/kecamatanbyid", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getKecamatanByKabupaten = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/kecamatanbykabupaten", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createKecamatan = function (params) {
  let formdata = new FormData();
  if (params.geojson) {
    formdata.append("geojson", params.geojson);
    delete params.geojson;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.post("/v2/kecamatan", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateKecamatan = function (params) {
  let formdata = new FormData();
  if (params.geojson) {
    formdata.append("geojson", params.geojson);
    delete params.geojson;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.put("/v2/kecamatan", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteKecamatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/v2/kecamatan", { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//desa
export const getDesa = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/desa", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDesaById = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/desabyid", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDesaByKecamatan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/desabykecamatan", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createDesa = function (params) {
  let formdata = new FormData();
  if (params.geojson) {
    formdata.append("geojson", params.geojson);
    delete params.geojson;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.post("/v2/desa", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateDesa = function (params) {
  let formdata = new FormData();
  if (params.geojson) {
    formdata.append("geojson", params.geojson);
    delete params.geojson;
  }
  formdata.append("data", JSON.stringify(params));

  return new Promise((resolve, reject) => {
    Axios.put("/v2/desa", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteDesa = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/v2/desa", { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//dokumen
export const getKategoriDokumen = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/masterkategoridokumen", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDokumen = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/masterdokumen", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//profile
export const editProfile = function (formdata) {
  return new Promise((resolve, reject) => {
    Axios.put("/v2/profile/editprofile", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const editPassword = function (formdata) {
  return new Promise((resolve, reject) => {
    Axios.put("/v2/profile/editpassword", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//pengumuman
export const getPengumumanDashboard = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/pengumumandashboard", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getPengumuman = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/pengumuman", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getPengumumanById = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/pengumumanbyid", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createPengumuman = function (params) {
  let formdata = new FormData();

  if (params.attach) {
    params.attach.forEach((file, index) => {
      formdata.append("attach", file);
    });
  }

  let meong = {};
  for (const [key, value] of Object.entries(params)) {
    if (key != "attach") {
      meong = {
        ...meong,
        [key]: value,
      };
    }
  }

  formdata.append("data", JSON.stringify(meong));

  return new Promise((resolve, reject) => {
    Axios.post("/v2/pengumuman", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updatePengumuman = function (params) {
  let formdata = new FormData();

  if (params.attach) {
    params.attach.forEach((file, index) => {
      formdata.append("attach", file);
    });
  }

  let meong = {};
  for (const [key, value] of Object.entries(params)) {
    if (key != "attach") {
      meong = {
        ...meong,
        [key]: value,
      };
    }
  }

  formdata.append("data", JSON.stringify(meong));

  return new Promise((resolve, reject) => {
    Axios.put("/v2/pengumuman", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deletePengumuman = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/v2/pengumuman", { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getKomponenPengajuan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/master-komponen-pengajuan", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getKomponenPengajuanById = function (id) {
  return new Promise((resolve, reject) => {
    Axios.get(`/master-komponen-pengajuan/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createKomponenPengajuan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.post("/master-komponen-pengajuan", params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateKomponenPengajuan = function (id, params) {
  return new Promise((resolve, reject) => {
    Axios.put(`/master-komponen-pengajuan/${id}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteKomponenPengajuan = function (id, params) {
  return new Promise((resolve, reject) => {
    Axios.delete(`/master-komponen-pengajuan/${id}`, { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//peraturan
export const getPeraturan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/peraturan", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getPeraturanById = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/peraturanbyid", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createPeraturan = function (params) {
  let formdata = new FormData();

  if (params.attach) {
    params.attach.forEach((file, index) => {
      formdata.append("attach", file);
    });
  }

  let meong = {};
  for (const [key, value] of Object.entries(params)) {
    if (key != "attach") {
      meong = {
        ...meong,
        [key]: value,
      };
    }
  }

  formdata.append("data", JSON.stringify(meong));

  return new Promise((resolve, reject) => {
    Axios.post("/v2/peraturan", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updatePeraturan = function (params) {
  let formdata = new FormData();

  if (params.attach) {
    params.attach.forEach((file, index) => {
      formdata.append("attach", file);
    });
  }

  let meong = {};
  for (const [key, value] of Object.entries(params)) {
    if (key != "attach") {
      meong = {
        ...meong,
        [key]: value,
      };
    }
  }

  formdata.append("data", JSON.stringify(meong));

  return new Promise((resolve, reject) => {
    Axios.put("/v2/peraturan", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deletePeraturan = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/v2/peraturan", { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//settings
export const getSettings = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/settings", {
      params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const setSetting = function (params) {
  let formdata = new FormData();

  if (params.key == "slider" || params.key == "aplikasi") {
    formdata.append("key", params.key);

    params.params.forEach((slider, index) => {
      formdata.append("file", slider.file);
    });

    let meong = [];
    for (const slider of params.params) {
      let sliderx = {};
      for (const [key, value] of Object.entries(slider)) {
        if (key != "file") {
          sliderx = {
            ...sliderx,
            [key]: value,
          };
        }
      }

      meong.push(sliderx);
    }

    formdata.append("params", JSON.stringify(meong));
  } else {
    formdata.append("key", params.key);
    formdata.append("params", JSON.stringify(params.params));
  }

  return new Promise((resolve, reject) => {
    Axios.post("/v2/settings", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//faq
export const getFaq = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/faq", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getFaqById = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/faqbyid", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createFaq = function (params) {
  let formdata = new FormData();

  if (params.attach) {
    params.attach.forEach((file, index) => {
      formdata.append("attach", file);
    });
  }

  let meong = {};
  for (const [key, value] of Object.entries(params)) {
    if (key != "attach") {
      meong = {
        ...meong,
        [key]: value,
      };
    }
  }

  formdata.append("data", JSON.stringify(meong));

  return new Promise((resolve, reject) => {
    Axios.post("/v2/faq", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateFaq = function (params) {
  let formdata = new FormData();

  if (params.attach) {
    params.attach.forEach((file, index) => {
      formdata.append("attach", file);
    });
  }

  let meong = {};
  for (const [key, value] of Object.entries(params)) {
    if (key != "attach") {
      meong = {
        ...meong,
        [key]: value,
      };
    }
  }

  formdata.append("data", JSON.stringify(meong));

  return new Promise((resolve, reject) => {
    Axios.put("/v2/faq", formdata)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteFaq = function (params) {
  return new Promise((resolve, reject) => {
    Axios.delete("/v2/faq", { data: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//konregpool
export const getKonregPool = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/konreg/pool", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDetailKonregPool = function (usulanId) {
  return new Promise((resolve, reject) => {
    Axios.get(`/v2/konreg/pool/${usulanId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const syncKonreg = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/konreg/sync", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const syncAllKonreg = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/konreg/syncall", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//usulan v2
export const getUsulanV2 = function (params) {
  return new Promise((resolve, reject) => {
    Axios.get("/v2/usulan", {
      params: params,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
