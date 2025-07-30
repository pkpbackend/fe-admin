import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import * as yup from "yup";
import { useSubmitFaqMutation } from "../../../../../api/domains/faq";

import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import formValidate from "../../../../../utility/FormValidate";
import sweetalert from "@utils/sweetalert";

const FormTambah = (props) => {
  const { setToggle, toggle } = props;
  let { modalData, modalTambah } = toggle;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [submitFaq, resultSubmitFaq] = useSubmitFaqMutation();

  useEffect(() => {
    if (resultSubmitFaq.isSuccess) {
      sweetalert.fire(
        "Sukses",
        `${modalTambah ? "Tambah" : "Ubah"} FAQ berhasil...`,
        "success"
      );
    }
  }, [modalTambah, resultSubmitFaq]);

  useEffect(() => {
    if (modalData?.id) {
      setFormData({
        ...modalData,
        attachments: modalData.attachments ? modalData.attachments : [],
      });
      setEditorState(HtmlToEditor(modalData.answer));
    }
  }, [modalData]);

  const handleEditor = (editorState) => {
    setEditorState(editorState);
    setFormData({
      ...formData,
      answer: draftToHtml(convertToRaw(editorState.getCurrentContent())),
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

  const handleTextChange = (e) => {
    let { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formSchema = yup.object().shape({
    question: yup.string().required(),
    answer: yup.string().nullable(),
  });
  const clickSimpan = async () => {
    const check = await formValidate(formSchema, formData);
    if (check.status) {
      submitFaq(formData)
        .unwrap()
        .then((res) => {
          setToggle({
            ...toggle,
            isOpen: false,
          });
        });
    } else {
      setFormError({
        ...formError,
        ...check.errors,
      });
    }
  };

  return (
    <Form>
      <FormGroup>
        <Label for="question">Pertanyaan *</Label>
        <Input
          type="text"
          name="question"
          id="question"
          required
          value={formData.question ? formData.question : ""}
          onChange={(e) => handleTextChange(e)}
          invalid={formError.question ? true : false}
        />
        {formError.question && (
          <FormFeedback>{formError.question}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Jawaban</Label>
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
        {formError.answer && <FormFeedback>{formError.answer}</FormFeedback>}
      </FormGroup>
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
          color="primary"
        >
          Simpan
        </Button>
      </FormGroup>
    </Form>
  );
};

export default FormTambah;
