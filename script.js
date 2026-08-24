const form = document.querySelector("#project-form");
const formPanel = document.querySelector("#inquiry-form-panel");
const successPanel = document.querySelector("#inquiry-success");
const sendAnotherButton = document.querySelector("#send-another");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formPanel.hidden = true;
  successPanel.hidden = false;
});

sendAnotherButton.addEventListener("click", () => {
  successPanel.hidden = true;
  formPanel.hidden = false;
  form.reset();
  form.elements.name.focus();
});
