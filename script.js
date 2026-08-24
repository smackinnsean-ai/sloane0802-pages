const form = document.querySelector("#project-form");
const formPanel = document.querySelector("#inquiry-form-panel");
const successPanel = document.querySelector("#inquiry-success");
const sendAnotherButton = document.querySelector("#send-another");
const projectTypeSelect = form.elements.projectType;
const otherProjectField = document.querySelector("#other-project-field");
const otherProjectInput = form.elements.otherProjectType;

const syncOtherProjectField = () => {
  const showOtherField = projectTypeSelect.value === "other";
  otherProjectField.hidden = !showOtherField;
  otherProjectInput.required = showOtherField;

  if (!showOtherField) {
    otherProjectInput.value = "";
  }
};

projectTypeSelect.addEventListener("change", syncOtherProjectField);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formPanel.hidden = true;
  successPanel.hidden = false;
});

sendAnotherButton.addEventListener("click", () => {
  successPanel.hidden = true;
  formPanel.hidden = false;
  form.reset();
  syncOtherProjectField();
  form.elements.name.focus();
});
