const settings = {
  formSelector: ".modal__form",
  inputSelector: "modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: ".mmodal__input_type_error",
  errorClass: "modal__error_visible",
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const setEventListeners = (formElement, config) => {};

enableValidation(settings); // Object "settings" gets passed to config
