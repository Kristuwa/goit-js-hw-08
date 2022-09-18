import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

const formData = {};
const STORAGE_KEY = 'feedback-form-state';

populateForm();

function onFormSubmit(e) {
  e.preventDefault();

  console.log(formData);

  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  console.log(formData);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm(e) {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  const parsedMessage = JSON.parse(savedMessage);

  if (parsedMessage) {
    refs.email.value = parsedMessage.email;
    refs.textarea.value = parsedMessage.message;
    console.log(parsedMessage.email);
    console.log(parsedMessage.message);
  }
}
