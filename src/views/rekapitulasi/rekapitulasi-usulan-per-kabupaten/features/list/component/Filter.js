import { useState } from "react";

// ** Utils

// ** Third Party Components
import { useForm } from "react-hook-form";

// ** Reactstrap Imports
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Form,
  Row,
  Spinner,
} from "reactstrap";

import { DIREKTORAT, SCOPE_REGION_ROLE } from "@constants/index";
import InputField from "@customcomponents/form/InputField";
import SelectField from "@customcomponents/form/SelectField";
import { useFilterPengusulanTahunUsulanQuery } from "@globalapi/filter";
import { usePenerimaManfaatQuery } from "@globalapi/usulan";
import { useKabupatenQuery, useProvinsiQuery } from "@globalapi/wilayah";
import { getUser } from "@utils/LoginHelpers";
import { Search } from "react-feather";

const Filter = (props) => {
  const { handleTableAttrChange, loading, activeTab } = props;

  const user = getUser().user;
  const ScopeRegionRoleId = user.Role.ScopeRegionRoleId;
  const useScopeProvincies = JSON.parse(user.region)?.provinsi;

  // ** Local State
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  // ** Hooks
  const { control, handleSubmit, reset, watch } = useForm();
  const queryPenerimaManfaat = usePenerimaManfaatQuery(
    {
      page: 1,
      withLimit: false,
    },
    { skip: !open }
  );
  const provinsiId = watch("ProvinsiId");

  const queryProvinsi = useProvinsiQuery({}, { skip: !open });
  const queryKabupaten = useKabupatenQuery(
    {
      filtered: JSON.stringify([{ id: "eq$ProvinsiId", value: provinsiId }]),
      withLimit: false,
    },
    {
      skip: !provinsiId || provinsiId === "" || !open,
    }
  );

  const queryTahunUsulan = useFilterPengusulanTahunUsulanQuery(
    {},
    { skip: !open }
  );

  const onSubmit = (data) => {
    const filtered = [];
    const params = {};
    for (const key of Object.keys(data || {})) {
      if (data?.[key]) {
        let id = key;
        let value = data?.[key];
        if (key === "tahunUsulan") {
          params.fromYear = value;
          params.toYear = value;
        } else {
          if (key === "Usulans_Pengembang_namaPerusahaan") {
            id = "Usulans.Pengembang.namaPerusahaan";
          }
          if (key === "statusVermin") {
            value = value === "3" ? null : Number(value);
          }
          filtered.push({
            id,
            value,
          });
        }
      }
    }

    handleTableAttrChange({
      ...params,
      filtered: filtered.length ? filtered : null,
    });
  };

  const optionsStatusVerifikasi = [
    { value: "1", label: "Lengkap" },
    { value: "0", label: "Tidak Lengkap" },
    { value: "3", label: "Belum di Verifikasi" },
  ];
  const optionsDirektif = [
    { value: "0", label: "Regular" },
    { value: "1", label: "Direktif" },
  ];
  const optionsTipeUsulan = [
    { value: 1, label: "Non Skala Besar (Bantuan PS NSB)" },
    { value: 2, label: "Skala Besar (Bantuan PSU SB)" },
    { value: 3, label: "Komunitas di Perumahan Umum" },
    { value: 4, label: "Komunitas yang dibantu PBRS" },
  ];
  const optionsProvince =
    queryProvinsi?.data?.map((item) => ({
      value: item.id,
      label: item.nama,
    })) || [];

  const mappingProvisi =
    ScopeRegionRoleId === SCOPE_REGION_ROLE.SELURUH_INDONESIA
      ? optionsProvince
      : ScopeRegionRoleId === SCOPE_REGION_ROLE.PER_PROVINSI_TERPILIH
      ? useScopeProvincies
      : [];

  const optionsKabupaten =
    queryKabupaten?.data?.map((item) => ({
      value: item.id,
      label: item.nama,
    })) || [];
  const optionsTahunUsulan =
    Number(activeTab) === DIREKTORAT.RUK
      ? // TODO: Check later should use: tahunBantuanPsu
        queryTahunUsulan?.data?.tahunUsulan?.map((value) => ({
          label: value,
          value,
        })) || []
      : queryTahunUsulan?.data?.tahunUsulan?.map((value) => ({
          label: value,
          value,
        })) || [];
  const optionsPenerimaManfaat =
    queryPenerimaManfaat?.data
      ?.filter((item) => item.DirektoratId === Number(activeTab))
      .map((item) => ({
        value: item.id,
        label: item.tipe,
      })) || [];

  return (
    <Accordion className="mb-2" open={open} toggle={toggle} defaultValue="1">
      <AccordionItem className="border border-secondary-subtle">
        <AccordionHeader targetId="1">Filter</AccordionHeader>
        <AccordionBody accordionId="1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Col sm={4}>
                {Number(activeTab) === DIREKTORAT.RUK ? (
                  <>
                    <InputField
                      control={control}
                      name="Usulans_Pengembang_namaPerusahaan"
                      label="Pengembang"
                      placeholder="Masukan nama pengembang/developer..."
                      disabled={loading}
                    />
                    <InputField
                      control={control}
                      name="namaPerusahaan"
                      label="Nama Perusahaan"
                      placeholder="Masukan nama perusahaan..."
                      disabled={loading}
                    />
                    <SelectField
                      control={control}
                      name="type"
                      label="Jenis Usulan"
                      placeholder="Silahkan pilih jenis usulan..."
                      options={optionsTipeUsulan}
                      disabled={loading}
                    />
                  </>
                ) : (
                  <>
                    <SelectField
                      control={control}
                      name="direktif"
                      label="Jenis Usulan"
                      placeholder="Silahkan pilih jenis usulan..."
                      options={optionsDirektif}
                      disabled={loading}
                    />
                    <SelectField
                      control={control}
                      name="PenerimaManfaatId"
                      label="Penerima Manfaat"
                      placeholder="Silahkan pilih penerima manfaat..."
                      options={optionsPenerimaManfaat}
                      isLoading={
                        queryPenerimaManfaat?.isLoading ||
                        queryPenerimaManfaat?.isFetching
                      }
                      disabled={loading}
                    />
                  </>
                )}
              </Col>
              <Col sm={4}>
                <SelectField
                  control={control}
                  name="ProvinsiId"
                  label="Provinsi"
                  placeholder="Silahkan pilih provinsi..."
                  options={mappingProvisi || []}
                  isLoading={
                    queryProvinsi.isLoading || queryProvinsi.isFetching
                  }
                  disabled={loading}
                />
                <SelectField
                  control={control}
                  name="CityId"
                  label="Kabupaten/Kota"
                  placeholder="Silahkan pilih kabupaten/kota..."
                  options={optionsKabupaten}
                  isLoading={
                    queryKabupaten.isLoading || queryKabupaten.isFetching
                  }
                  disabled={loading}
                />
              </Col>
              <Col sm={4}>
                <SelectField
                  control={control}
                  name="statusVermin"
                  label="Status Verifikasi"
                  placeholder="Silahkan pilih status verifikasi..."
                  options={optionsStatusVerifikasi}
                  disabled={loading}
                />
                <SelectField
                  control={control}
                  name={"tahunUsulan"}
                  label="Tahun Usulan"
                  placeholder="Silahkan pilih tahun usulan..."
                  options={optionsTahunUsulan}
                  isLoading={
                    queryTahunUsulan.isLoading || queryTahunUsulan.isFetching
                  }
                  disabled={loading}
                />
              </Col>
            </Row>
            <div className="filter-actions">
              <Button
                color="secondary"
                outline
                size="sm"
                onClick={() => {
                  reset();
                  handleTableAttrChange();
                }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button
                type="submit"
                color="primary"
                size="sm"
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : <Search size={16} />}
                Filter
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
