import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Spinner, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useCreateHelpdeskDiscussionChatMutation } from "../../../../../api/domains/diskusi";
import toast from "react-hot-toast";

const FormCreateChat = ({ helpeskId }) => {
  const [mutation] = useCreateHelpdeskDiscussionChatMutation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { chat: "" },
    resolver: yupResolver(
      Yup.object().shape({
        chat: Yup.string().required("Wajib diisi"),
      })
    ),
  });

  async function onSubmit(values) {
    try {
      await mutation({
        id: `${helpeskId}`,
        chat: values.chat,
      }).unwrap();
      reset({ chat: "" });
    } catch (error) {
      toast.error(error, { position: "top-center" });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="chat"
        control={control}
        render={({ field }) => (
          <>
            <Input
              id="chat"
              invalid={Boolean(errors.chat)}
              {...field}
              type="textarea"
              rows={3}
              disabled={isSubmitting}
            />
            {errors.chat ? (
              <FormFeedback>{errors.chat.message}</FormFeedback>
            ) : null}
          </>
        )}
      />
      <div style={{ marginTop: "1rem" }}>
        <Button type="submit" color="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner style={{ marginRight: "0.5rem" }} size="sm" />
          ) : null}
          Kirim
        </Button>
      </div>
    </Form>
  );
};

export default FormCreateChat;
