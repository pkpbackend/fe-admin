import _ from "lodash";
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as yup from "yup";
import {
  usePengaturan,
  useSubmitPengaturanMutation,
} from "../../../../../api/domains/pengaturan";
import sweetalert from "@utils/sweetalert";

const FormAplikasi = (props) => {
  const { setToggle, toggle } = props;
  let { modalKey: key } = toggle;

  const [formData, setFormData] = useState({
    key,
    type: "aplikasi",
    params: "",
  });

  const [sliders, setSliders] = useState([
    { title: "", description: "", file: null },
  ]);
  const [formError, setFormError] = useState([{}]);
  const [submitPengaturan] = useSubmitPengaturanMutation();

  const qPengaturan = usePengaturan({
    filtered: {
      defaultValue: {
        eq$key: key,
      },
    },
  });

  const setSlide = async () => {
    if (!_.isEmpty(qPengaturan.data?.[0]?.params)) {
      const data = {
        ...qPengaturan.data[0],
        params: JSON.parse(qPengaturan.data[0].params),
      };

      //formerror
      let error = [];
      for await (const par of data.params) {
        error.push({ title: "", description: "", file: null });
      }
      setFormError(error);

      setFormData({ ...formData, ...data });

      let slid = [{ title: "", description: "" }];
      if (Array.isArray(data.params) && data.params.length > 0) {
        slid = data.params;
      }
      setSliders(slid);
    }
  };

  useEffect(() => {
    setSlide();
  }, [qPengaturan.data]);

  const clickSimpan = async () => {
    let error = false;
    let errors = [];
    for await (const slider of sliders) {
      let elol = {};

      if ("filename" in slider) {
      } else {
        if (slider.file == null) {
          error = true;
          elol = {
            ...elol,
            file: "File is required",
          };
        }
      }

      try {
        await checkValidasi(slider);
      } catch (err) {
        error = true;
        elol = {
          ...elol,
          ...err,
        };
      }

      errors.push(elol);
    }

    if (!error) {
      submitPengaturan({ ...formData, params: JSON.stringify([...sliders]) })
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
    } else {
      setFormError([...errors]);
    }
  };

  const formSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required().url(),
  });

  const checkValidasi = (slider) => {
    return new Promise((resolve, reject) => {
      formSchema
        .validate(slider, { abortEarly: false })
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

  const handleTextChange = (e, index) => {
    let { name, value } = e.target;

    sliders[index] = {
      ...sliders[index],
      [name]: value,
    };

    setSliders([...sliders]);
  };

  const handleInputChange = (e, index) => {
    let { name, files } = e.target;

    sliders[index] = {
      ...sliders[index],
      filename: files[0].name,
      [name]: files[0],
    };

    setSliders([...sliders]);
  };

  const addSlider = () => {
    setSliders([...sliders, { title: "", description: "", file: null }]);
    setFormError([...formError, { title: "", description: "", file: null }]);
  };

  const deleteSlider = (index) => {
    sliders.splice(index, 1);
    setSliders([...sliders]);

    formError.splice(index, 1);
    setFormError([...formError]);
  };

  return (
    <Fragment>
      <Form>
        {sliders.map((slider, index) => {
          return (
            <RowSlider
              sliders={sliders}
              index={index}
              key={index}
              formError={formError}
              setSliders={setSliders}
              handleTextChange={handleTextChange}
              handleInputChange={handleInputChange}
              deleteSlider={deleteSlider}
            />
          );
        })}
        <FormGroup
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button className={"btn btn-primary"} onClick={addSlider}>
            Tambah Slider
          </Button>
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

const RowSlider = (props) => {
  let {
    sliders,
    index,
    formError,
    handleTextChange,
    handleInputChange,
    deleteSlider,
  } = props;
  let formErrorx = formError[index] ? formError[index] : {};

  return (
    <Fragment>
      <Row>
        <Col md={2}>
          Slider {index + 1}
          <br></br>
          <Button color="danger" size="sm" onClick={(e) => deleteSlider(index)}>
            <i className="fa fa-trash" />
          </Button>
        </Col>
        <Col md={10}>
          <FormGroup>
            <Label for="title">Nama *</Label>
            <Input
              type="text"
              name="title"
              id="title"
              required
              value={sliders[index].title ? sliders[index].title : ""}
              onChange={(e) => handleTextChange(e, index)}
              invalid={formErrorx.title ? true : false}
            />
            {formErrorx.title && (
              <FormFeedback>{formErrorx.title}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="description">URL Beranda Aplikasi *</Label>
            <Input
              type="text"
              name="description"
              id="description"
              required
              value={
                sliders[index].description ? sliders[index].description : ""
              }
              onChange={(e) => handleTextChange(e, index)}
              invalid={formErrorx.description ? true : false}
            />
            {formErrorx.description && (
              <FormFeedback>{formErrorx.description}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="file">Logo Aplikasi</Label>
            <Input
              type="file"
              name="file"
              id="file"
              accept={"image/*"}
              onChange={(e) => handleInputChange(e, index)}
            />
            {formErrorx.file && (
              <span style={{ color: "#f86c6b", fontSize: 11 }}>
                {formErrorx.file}
              </span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <hr></hr>
    </Fragment>
  );
};

export default FormAplikasi;
