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

import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import _ from "lodash";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import sweetalert from "@utils/sweetalert";

const FormEditor = (props) => {
  const { setToggle, toggle } = props;
  let { modalKey: key } = toggle;

  const [formData, setFormData] = useState({
    key,
    type: "editor",
    params: "",
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlData, setHtmlData] = useState();
  const [formError, setFormError] = useState({});
  const [submitPengaturan] = useSubmitPengaturanMutation();

  const qPengaturan = usePengaturan({
    filtered: {
      defaultValue: {
        eq$key: key,
      },
    },
  });

  useEffect(() => {
    // getSettings({
    //   key: formData.key,
    // }).then(res => {
    //   let { data } = res;
    //   setFormData({ ...formData, params: data.content });

    //   //return
    //   setHtmlData(data.params.content);

    //   setEditorState(HtmlToEditor(data.params.content));
    // });

    if (!_.isEmpty(qPengaturan.data?.[0]?.params)) {
      const params = qPengaturan.data[0].params;

      // const data = JSON.parse(qPengaturan.data[0].params);

      setFormData({
        ...formData,
        params: params,
        id: qPengaturan.data?.[0]?.id,
      });

      // //return
      setHtmlData(params);

      setEditorState(HtmlToEditor(params));
    }
  }, [qPengaturan.data]);

  const handleEditor = (editorState) => {
    setEditorState(editorState);
    setFormData({
      ...formData,
      params: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
    setHtmlData(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const handleTextChange = (e) => {
    let { name, value } = e.target;

    setEditorState(HtmlToEditor(value));
    setHtmlData(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HtmlToEditor = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  };

  const clickSimpan = () => {
    checkValidasi().then((res) => {
      submitPengaturan(formData)
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
    });
  };

  const formSchema = yup.object().shape({
    key: yup.string().required(),
    params: yup.string().required(),
  });

  const checkValidasi = () => {
    return new Promise((resolve, reject) => {
      formSchema
        .validate(formData, { abortEarly: false })
        .then((value) => {
          setFormError({});
          resolve();
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

          setFormError({
            ...formError,
            ...errors,
          });

          reject();
        });
    });
  };

  return (
    <Fragment>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>WSYIWYG Editor</Label>
              <Editor
                editorState={editorState}
                wrapperStyle={{
                  border: "solid 0.5px",
                  borderRadius: 15,
                  padding: 10,
                }}
                editorStyle={{
                  border: "solid 0.5px",
                  borderRadius: 15,
                  padding: 10,
                  height: "500px",
                }}
                onEditorStateChange={handleEditor}
              />
              {formError.params && (
                <FormFeedback>{formError.params}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>HTML Editor</Label>
              <Input
                style={{ height: "650px" }}
                type="textarea"
                name="params"
                id="params"
                required
                value={htmlData ? htmlData : ""}
                onChange={(e) => handleTextChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
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

export default FormEditor;
