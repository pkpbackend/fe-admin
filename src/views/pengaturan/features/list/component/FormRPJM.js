import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import {
  usePengaturan,
  useSubmitPengaturanMutation,
} from "../../../../../api/domains/pengaturan";
import * as yup from "yup";
import _ from "lodash";
import sweetalert from "@utils/sweetalert";

const FormRPJM = (props) => {
  const { setToggle, toggle } = props;
  let { modalKey: key } = toggle;

  const [submitPengaturan] = useSubmitPengaturanMutation();

  const qPengaturan = usePengaturan({
    filtered: {
      defaultValue: {
        eq$key: key,
      },
    },
  });

  const [formData, setFormData] = useState({
    key,
    type: "rpjm",
    target: 0,
    capaian: 0,
    tahun: [
      {
        tahun: "",
        direktorat: [
          {
            dir: "rusun",
            target: 0,
            capaian: 0,
          },
          {
            dir: "rusus",
            target: 0,
            capaian: 0,
          },
          {
            dir: "swadaya",
            target: 0,
            capaian: 0,
          },
          {
            dir: "ruk",
            target: 0,
            capaian: 0,
          },
        ],
      },
      {
        tahun: "",
        direktorat: [
          {
            dir: "rusun",
            target: 0,
            capaian: 0,
          },
          {
            dir: "rusus",
            target: 0,
            capaian: 0,
          },
          {
            dir: "swadaya",
            target: 0,
            capaian: 0,
          },
          {
            dir: "ruk",
            target: 0,
            capaian: 0,
          },
        ],
      },
      {
        tahun: "",
        direktorat: [
          {
            dir: "rusun",
            target: 0,
            capaian: 0,
          },
          {
            dir: "rusus",
            target: 0,
            capaian: 0,
          },
          {
            dir: "swadaya",
            target: 0,
            capaian: 0,
          },
          {
            dir: "ruk",
            target: 0,
            capaian: 0,
          },
        ],
      },
      {
        tahun: "",
        direktorat: [
          {
            dir: "rusun",
            target: 0,
            capaian: 0,
          },
          {
            dir: "rusus",
            target: 0,
            capaian: 0,
          },
          {
            dir: "swadaya",
            target: 0,
            capaian: 0,
          },
          {
            dir: "ruk",
            target: 0,
            capaian: 0,
          },
        ],
      },
      {
        tahun: "",
        direktorat: [
          {
            dir: "rusun",
            target: 0,
            capaian: 0,
          },
          {
            dir: "rusus",
            target: 0,
            capaian: 0,
          },
          {
            dir: "swadaya",
            target: 0,
            capaian: 0,
          },
          {
            dir: "ruk",
            target: 0,
            capaian: 0,
          },
        ],
      },
    ],
  });

  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (!_.isEmpty(qPengaturan.data?.[0]?.params)) {
      const data = {
        ...qPengaturan.data[0],
        params: JSON.parse(qPengaturan.data[0].params),
      };
      setFormData({ ...data, tahun: data.params });
    }
  }, [qPengaturan.data]);

  const clickSimpan = async () => {
    checkValidasi()
      .then((meong) => {
        submitPengaturan({
          key: formData.key,
          params: JSON.stringify(formData.tahun),
        })
          .unwrap()
          .then(async (result) => {
            await sweetalert.fire({
              title: "Sukses",
              text: "Data berhasil diubah",
              type: "success",
            });

            setToggle({
              ...toggle,
              modalTambah: false,
            });
          })
          .catch(async (err) => {
            if (err.response) {
              setFormError({
                ...formError,
                ...err.response.data.error,
              });
            }
            await sweetalert.fire({
              title: "Gagal Ubah Content",
              text: err,
              type: "error",
            });
          });
      })
      .catch((err) => {
        setFormError(err);
      });
  };

  const formSchema = yup.object().shape({
    tahun: yup.array().of(
      yup.object().shape({
        tahun: yup.string().required(),
        direktorat: yup.array().of(
          yup.object().shape({
            target: yup.number().required().integer(),
            capaian: yup.number().required().integer(),
          })
        ),
      })
    ),
  });

  const checkValidasi = () => {
    return new Promise((resolve, reject) => {
      formSchema
        .validate(formData, { abortEarly: false })
        .then((value) => {
          resolve(null);
        })
        .catch((err) => {
          let { inner } = err;

          let errors = {};
          inner.forEach((error) => {
            errors = {
              ...errors,
              [error.path]: error.message,
            };
          });

          reject(errors);
        });
    });
  };

  const handleTextChange = (e, name) => {
    let { value } = e.target;

    let meong = name.split("-");

    if (meong.length == 2) {
      let fname = meong[0];
      let index = meong[1];

      let { tahun } = formData;

      tahun[index] = {
        ...tahun[index],
        [fname]: value,
      };

      setFormData({
        ...formData,
        tahun,
      });
    } else {
      let fname = meong[0];
      let index = meong[1];
      let dir = meong[2];

      let { tahun } = formData;

      tahun[index].direktorat[dir][fname] = value;

      setFormData({
        ...formData,
        tahun,
      });
    }
  };

  return (
    <Fragment>
      <Form>
        <Row>
          <Col md={2}></Col>
          <Col md={2}>Rusun</Col>
          <Col md={2}>Rusus</Col>
          <Col md={2}>Swadaya</Col>
          <Col md={2}>RUK</Col>
        </Row>
        <hr></hr>
        <TahunRow
          index={0}
          formData={formData}
          handleTextChange={handleTextChange}
          formError={formError}
        />
        <hr></hr>
        <TahunRow
          index={1}
          formData={formData}
          handleTextChange={handleTextChange}
          formError={formError}
        />
        <hr></hr>
        <TahunRow
          index={2}
          formData={formData}
          handleTextChange={handleTextChange}
          formError={formError}
        />
        <hr></hr>
        <TahunRow
          index={3}
          formData={formData}
          handleTextChange={handleTextChange}
          formError={formError}
        />
        <hr></hr>
        <TahunRow
          index={4}
          formData={formData}
          handleTextChange={handleTextChange}
          formError={formError}
        />
        <hr></hr>
        <FormGroup
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            className={"float-right btn btn-primary"}
            onClick={clickSimpan}
          >
            Simpan
          </Button>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

const TahunRow = (props) => {
  let { index, formData, formError, handleTextChange } = props;

  return (
    <Row>
      <Col md={2}>
        <FormGroup>
          <Label for="tahun">Tahun *</Label>
          <Input
            type="text"
            required
            value={formData?.tahun?.[index]?.tahun || ""}
            onChange={(e) => handleTextChange(e, "tahun-" + index)}
            invalid={formError[`tahun[${index}].tahun`] ? true : false}
          />
          {formError[`tahun[${index}].tahun`] && (
            <FormFeedback>{formError[`tahun[${index}].tahun`]}</FormFeedback>
          )}
        </FormGroup>
      </Col>
      <DirektoratCol
        index={index}
        formData={formData}
        handleTextChange={handleTextChange}
        dir={0}
        formError={formError}
      />
      <DirektoratCol
        index={index}
        formData={formData}
        handleTextChange={handleTextChange}
        dir={1}
        formError={formError}
      />
      <DirektoratCol
        index={index}
        formData={formData}
        handleTextChange={handleTextChange}
        dir={2}
        formError={formError}
      />
      <DirektoratCol
        index={index}
        formData={formData}
        handleTextChange={handleTextChange}
        dir={3}
        formError={formError}
      />
    </Row>
  );
};

const DirektoratCol = (props) => {
  let { index, dir, formData, formError, handleTextChange } = props;

  return (
    <Col md={2}>
      <FormGroup>
        <Label for="target">Target *</Label>
        <Input
          type="text"
          required
          value={
            formData?.tahun?.[index]?.direktorat?.[dir].target
              ? formData?.tahun?.[index]?.direktorat?.[dir].target
              : ""
          }
          onChange={(e) => handleTextChange(e, "target-" + index + "-" + dir)}
          invalid={
            formError[`tahun[${index}].direktorat[${dir}].target`]
              ? true
              : false
          }
        />
        {formError[`tahun[${index}].direktorat[${dir}].target`] && (
          <FormFeedback>
            {formError[`tahun[${index}].direktorat[${dir}].target`]}
          </FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="capaian">Capaian *</Label>
        <Input
          type="text"
          required
          value={
            formData?.tahun?.[index]?.direktorat?.[dir].capaian
              ? formData?.tahun?.[index]?.direktorat?.[dir].capaian
              : ""
          }
          onChange={(e) => handleTextChange(e, "capaian-" + index + "-" + dir)}
          invalid={
            formError[`tahun[${index}].direktorat[${dir}].capaian`]
              ? true
              : false
          }
        />
        {formError[`tahun[${index}].direktorat[${dir}].capaian`] && (
          <FormFeedback>
            {formError[`tahun[${index}].direktorat[${dir}].capaian`]}
          </FormFeedback>
        )}
      </FormGroup>
    </Col>
  );
};

export default FormRPJM;
