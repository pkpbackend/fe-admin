import sweetalert from "@utils/sweetalert";
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

const FormLink = (props) => {
  const { setToggle, toggle } = props;
  let { modalKey: key } = toggle;

  const [formData, setFormData] = useState({
    key,
    type: "link",
    params: "",
  });
  const [submitPengaturan] = useSubmitPengaturanMutation();

  const qPengaturan = usePengaturan({
    filtered: {
      defaultValue: {
        eq$key: key,
      },
    },
  });

  const [links, setLinks] = useState([{ title: "", description: "" }]);
  const [formError, setFormError] = useState([{}]);

  const setLink = async () => {
    if (!_.isEmpty(qPengaturan.data?.[0]?.params)) {
      const data = {
        ...qPengaturan.data[0],
        params: JSON.parse(qPengaturan.data[0].params),
      };
      //formerror
      let error = [];
      for await (const par of data.params) {
        error.push({ title: "", description: "" });
      }
      setFormError(error);

      setFormData({ ...formData, ...data });

      let slid = [{ title: "", description: "" }];
      if (Array.isArray(data.params) && data.params.length > 0) {
        slid = data.params;
      }
      setLinks(slid);
    }
  };

  useEffect(() => {
    setLink();
  }, [qPengaturan.data]);

  const clickSimpan = async () => {
    let error = false;
    let errors = [];
    for await (const link of links) {
      let elol = {};

      try {
        await checkValidasi(link);
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
      submitPengaturan({ ...formData, params: JSON.stringify([...links]) })
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

  let formSchema = null;

  if (formData.key == "kontakkami") {
    formSchema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    });
  } else {
    formSchema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required().url(),
    });
  }

  const checkValidasi = (link) => {
    return new Promise((resolve, reject) => {
      formSchema
        .validate(link, { abortEarly: false })
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

    links[index] = {
      ...links[index],
      [name]: value,
    };

    setLinks([...links]);
  };

  const addLink = () => {
    setLinks([...links, { title: "", description: "", file: null }]);
    setFormError([...formError, { title: "", description: "", file: null }]);
  };

  const deleteLink = (index) => {
    links.splice(index, 1);
    setLinks([...links]);

    formError.splice(index, 1);
    setFormError([...formError]);
  };

  return (
    <Fragment>
      <Form>
        {links.map((link, index) => {
          return (
            <RowLink
              links={links}
              index={index}
              key={index}
              formData={formData}
              formError={formError}
              setLinks={setLinks}
              handleTextChange={handleTextChange}
              deleteLink={deleteLink}
            />
          );
        })}
        <FormGroup
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button className={"btn btn-primary"} onClick={addLink}>
            Tambah Link
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

const RowLink = (props) => {
  let { links, index, formError, handleTextChange, deleteLink, formData } =
    props;
  let formErrorx = formError[index] ? formError[index] : {};

  return (
    <Fragment>
      <Row>
        <Col md={2}>
          Link {index + 1}
          <br></br>
          <Button color="danger" size="sm" onClick={(e) => deleteLink(index)}>
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
              value={links[index].title ? links[index].title : ""}
              onChange={(e) => handleTextChange(e, index)}
              invalid={formErrorx.title ? true : false}
            />
            {formErrorx.title && (
              <FormFeedback>{formErrorx.title}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="description">
              {formData.key == "kontakkami" ? "Deskripsi" : "URL Tujuan *"}
            </Label>
            <Input
              type="text"
              name="description"
              id="description"
              required
              value={links[index].description ? links[index].description : ""}
              onChange={(e) => handleTextChange(e, index)}
              invalid={formErrorx.description ? true : false}
            />
            {formErrorx.description && (
              <FormFeedback>{formErrorx.description}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <hr></hr>
    </Fragment>
  );
};

export default FormLink;
