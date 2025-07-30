const checkValidasi = async (formSchema, formData) => {
  try {
    const check = await formSchema.validate(formData, { abortEarly: false });

    return {
      status: true,
    };
  } catch (err) {
    let { inner } = err;

    let errors = {};
    inner.forEach((error) => {
      errors = {
        ...errors,
        [error.path]: error.message,
      };
    });

    return {
      status: false,
      errors: errors,
    };
  }
};

export default checkValidasi;
