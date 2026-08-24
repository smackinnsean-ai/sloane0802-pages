const form = document.querySelector("#project-form");
const formPanel = document.querySelector("#inquiry-form-panel");
const successPanel = document.querySelector("#inquiry-success");
const sendAnotherButton = document.querySelector("#send-another");
const projectTypeSelect = form.elements.projectType;
const websiteInput = form.elements.website;
const otherProjectField = document.querySelector("#other-project-field");
const otherProjectInput = form.elements.otherProjectType;
const submitButton = form.querySelector('button[type="submit"]');
const formError = document.querySelector("#form-error");

const syncOtherProjectField = () => {
  const showOtherField = projectTypeSelect.value === "other";
  otherProjectField.hidden = !showOtherField;
  otherProjectInput.required = showOtherField;

  if (!showOtherField) {
    otherProjectInput.value = "";
  }
};

projectTypeSelect.addEventListener("change", syncOtherProjectField);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.hidden = true;
  submitButton.disabled = true;
  submitButton.setAttribute("aria-busy", "true");

  const websiteValue = websiteInput.value.trim();
  if (websiteValue && !/^[a-z][a-z\d+.-]*:\/\//i.test(websiteValue)) {
    websiteInput.value = `https://${websiteValue}`;
  }

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Inquiry delivery failed");
    }

    formPanel.hidden = true;
    successPanel.hidden = false;
  } catch (error) {
    console.error(error);
    formError.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-busy");
  }
});

sendAnotherButton.addEventListener("click", () => {
  successPanel.hidden = true;
  formPanel.hidden = false;
  form.reset();
  syncOtherProjectField();
  form.elements.name.focus();
});
