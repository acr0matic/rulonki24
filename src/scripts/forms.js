/* global IMask */
/* global MicroModal */

function Validation(inputElement, validationType) {
  const pattern = {
    name: {
      regex: /[a-zA-Zа-яА-Я]/g,
      error: 'Вы неправильно ввели имя',
    },

    phone: {
      regex: /^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s\\-]?[0-9]{2}[\s\\-]?[0-9]{2}$/g,
      error: 'Вы неправильно ввели номер телефона',
    },
  };

  const input = inputElement;
  const type = validationType;
  const match = pattern[type].regex.test(input.value);

  if (!match) {
    input.classList.add('input--error');
  }

  return match;
}

function CheckForm(formElement) {
  const name = formElement.querySelector('[data-form=name]');
  const phone = formElement.querySelector('[data-form=phone]');

  function CheckError(field) {
    if (field.classList.contains('input--error')) {
      field.classList.remove('input--error');
    }
  }

  name.addEventListener('click', () => {
    CheckError(name);
  });

  phone.addEventListener('click', () => {
    CheckError(phone);
  });

  return Validation(name, 'name') && Validation(phone, 'phone');
}

function AJAXform(formElement, formMethod = 'post') {
  const form = formElement;
  const acceptButton = formElement.querySelector('[type="button"]');
  const formAction = form.getAttribute('action');
  const formInputs = form.querySelectorAll('input');

  const buttonContent = acceptButton.innerHTML;

  function XMLhttp() {
    const httpRequest = new XMLHttpRequest();
    const formData = new FormData();

    formInputs.forEach((inputElement) => {
      const input = inputElement;

      formData.append(input.name, input.value);
    });

    httpRequest.onreadystatechange = function Response() {
      if (this.readyState === 4 && this.status === 200) {
        if (document.getElementById('modal-callback').classList.contains('is-open')) MicroModal.close('modal-callback');
        MicroModal.show('modal-accept');
        acceptButton.innerHTML = buttonContent;

        formInputs.forEach((inputElement) => {
          const input = inputElement;

          if (input.type === 'checkbox') input.checked = false;
          input.value = '';
        });
      }
    };

    httpRequest.open(formMethod, formAction);
    httpRequest.send(formData);
  }

  acceptButton.onclick = () => {
    if (CheckForm(form)) {
      acceptButton.innerHTML = '<i class="button__loader fa fa-circle-o-notch fa-spin"></i>Отправляем';
      XMLhttp();
    }
  };
}

window.addEventListener('DOMContentLoaded', () => {
  // Маска для номера телефона
  const phoneInputs = document.querySelectorAll('input[name=user_phone]');
  const maskOptions = {
    mask: '+{7} (000) 000-00-00',
  };

  phoneInputs.forEach((input) => IMask(input, maskOptions));

  const heroForm = document.getElementById('hero-form');
  const specialistForm = document.getElementById('specialist-form');
  const sectionForm = document.getElementById('section-form');
  const modalForm = document.getElementById('modal-form');

  AJAXform(heroForm);
  AJAXform(specialistForm);
  AJAXform(sectionForm);
  AJAXform(modalForm);
});
