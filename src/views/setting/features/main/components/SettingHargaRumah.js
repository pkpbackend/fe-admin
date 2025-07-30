import InputFormatNumberField from "@customcomponents/form/InputFormatNumberField";
import SelectField from "@customcomponents/form/SelectField";
import { useKabupatenQuery } from "@globalapi/wilayah";
import { useProvincesQuery } from "@views/MasterData/Wilayah/domains/provinsi";
import { useUpdateSettingMutation } from "@views/setting/domains";
import { useEffect, useState } from "react";
import { Edit3, X } from "react-feather";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Button,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

const SelectKabupatenField = ({ control, index, disabled }) => {
  const provincies = useWatch({ control, name: `items[${index}].provinsi` });
  const provinceIds = provincies?.map((province) => province.value);

  const { data, isLoading, isFetching } = useKabupatenQuery(
    {
      page: 1,
      pageSize: 2e9,
      filtered: JSON.stringify([{ id: "in$ProvinsiId", value: provinceIds }]),
    },
    { skip: provinceIds?.length === 0 }
  );

  const options =
    data?.map((city) => ({
      label: city.nama,
      value: city.id,
      ProvinsiId: city.ProvinsiId,
    })) ?? [];

  return (
    <SelectField
      formGroupProps={{
        cssModule: {
          "mb-3": "mb-0",
        },
      }}
      control={control}
      options={options}
      isMulti
      closeMenuOnSelect={false}
      name={`items[${index}].kabupaten`}
      isLoading={isLoading || isFetching}
      placeholder="Pilih kabupaten"
      disabled={disabled}
    />
  );
};

const ModalSettingHargaRumah = ({ isOpen, toggle, data = [], fieldKey }) => {
  const { control, watch, reset, handleSubmit } = useForm();
  const items = watch("items");
  const [updateMutation, resultUpdate] = useUpdateSettingMutation();

  const disabledInput = resultUpdate.isLoading;

  const queryProvinsi = useProvincesQuery(
    { page: 1, pageSize: 2e9 },
    { skip: !isOpen }
  );
  useEffect(() => {
    if (data) {
      reset({ items: data });
    }
  }, [data, reset]);

  async function onSubmit(value) {
    try {
      await updateMutation({
        key: fieldKey,
        value: JSON.stringify(value.items),
      }).unwrap();
      toast.success("Berhasil simpan harga rumah", {
        position: "top-center",
      });
      toggle();
    } catch (error) {
      toast.error("Gagal simpan harga rumah", { position: "top-center" });
    }
  }
  const optionProvince =
    queryProvinsi?.data?.data?.map((provinsi) => ({
      label: provinsi.nama,
      value: provinsi.id,
    })) ?? [];
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" scrollable>
      <ModalHeader>Setting Region Harga Rumah</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ListGroup>
            {items?.map((item, index) => (
              <ListGroupItem key={index}>
                <Row className="align-items-center gy-2">
                  <Col xs={2}>Harga Rumah</Col>
                  <Col xs={9}>
                    <InputFormatNumberField
                      disabled={disabledInput}
                      formGroupProps={{
                        cssModule: {
                          "mb-3": "mb-0",
                        },
                      }}
                      control={control}
                      name={`items[${index}].hargaRumah`}
                    />
                  </Col>
                  <Col xs={1}>
                    <Button
                      color="danger"
                      className="btn-icon"
                      size="sm"
                      disabled={disabledInput}
                    >
                      <X size={14} />
                    </Button>
                  </Col>
                  <Col xs={2}>Provinsi</Col>
                  <Col xs={9}>
                    <SelectField
                      formGroupProps={{
                        cssModule: {
                          "mb-3": "mb-0",
                        },
                      }}
                      control={control}
                      options={optionProvince}
                      isMulti
                      closeMenuOnSelect={false}
                      name={`items[${index}].provinsi`}
                      disabled={disabledInput}
                    />
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={2}>Kabupaten</Col>
                  <Col xs={9}>
                    <SelectKabupatenField
                      control={control}
                      index={index}
                      disabled={disabledInput}
                    />
                  </Col>
                  <Col xs={1}></Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>Batal</Button>
        <Button
          color="primary"
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
          disabled={disabledInput}
        >
          {resultUpdate.isLoading ? <Spinner size="sm" /> : null}
          Simpan
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const SettingHargaRumah = ({ data, fieldKey }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        outline
        color="primary"
        className="w-100 my-2"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Edit3 size={14} />
        Select Region
      </Button>
      <ModalSettingHargaRumah
        isOpen={openModal}
        toggle={() => {
          setOpenModal(false);
        }}
        fieldKey={fieldKey}
        data={data}
      />
    </>
  );
};

export default SettingHargaRumah;
