import 'regenerator-runtime/runtime';

const init = function () {
  document.getElementById('register_submit').addEventListener('click', register_send);
  document.getElementById('login_submit').addEventListener('click', login_send);
  document.getElementById('rodo_link').addEventListener('click', rodo_show);
  document.getElementById('rodo_button_accept').addEventListener('click', rodo_check);
  document.getElementById('rodo_button_cancel').addEventListener('click', rodo_hide);
};

const register_send = async function (ev) {
  //Czyszczenie poprzednich błędów
  document.getElementById('firstName').classList.remove('error');
  document.getElementById('firstName').parentElement.classList.remove('error-msg2');
  document.getElementById('lastName').classList.remove('error');
  document.getElementById('lastName').parentElement.classList.remove('error-msg2');
  document.getElementById('email').classList.remove('error');
  document.getElementById('email').parentElement.classList.remove('error-msg2');
  document.getElementById('phone').classList.remove('error');
  document.getElementById('phone').parentElement.classList.remove('error-msg2');
  document.getElementById('password').classList.remove('error');
  document.getElementById('password').parentElement.classList.remove('error-msg2');
  document.getElementById('register_password2').classList.remove('error');
  document.getElementById('register_password2').parentElement.classList.remove('error-msg2');
  document.getElementById('rodo').classList.remove('error');
  document.getElementById('rodo').parentElement.classList.remove('error-msg2');

  //Potwierdzenie opuszczenia strony
  window.onbeforeunload = function (e) {
    var message = 'Strona prosi o potwierdzenie decyzji jej opuszczenia',
      e = e || window.event;
    if (e) {
      e.returnValue = message;
    }
    return message;
  };

  //let fails = register_validate();

  window.onbeforeunload = 0;
  //document.getElementById('form_register').submit();
  try {
    const res = await axios.post('http://localhost:5000/api/users', {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      drivingLicense: document.getElementById('drivingLicense').value,
      password: document.getElementById('password').value,
    });
    console.log(res);

    localStorage.setItem('token', res.data.token);
    console.log(localStorage.getItem('token'));
    console.log(res.data.token);
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        let field = document.getElementById(error.param);
        field.classList.add('error');
        field.parentElement.classList.add('error-msg2');
        field.parentElement.setAttribute('data-errormsg', error.msg);
      })
      /*fails.forEach(function (obj) {
        let field = document.getElementById(obj.input);
        field.classList.add('error');
        field.parentElement.classList.add('error-msg2');
        field.parentElement.setAttribute('data-errormsg', obj.msg);
      })*/
    }
  }

    // } else {
    //   //Wyświetlenie błędów (ramki + wiadomości)
    //   fails.forEach(function (obj) {
    //     let field = document.getElementById(obj.input);
    //     field.classList.add('error');
    //     field.parentElement.classList.add('error-msg2');
    //     field.parentElement.setAttribute('data-errormsg', obj.msg);
    //   });
};

const login_send = function (ev) {
  //Czyszczenie poprzednich błędów
  document.getElementById('login_email').classList.remove('error');
  document.getElementById('login_email').parentElement.classList.remove('error-msg2');
  document.getElementById('login_password').classList.remove('error');
  document.getElementById('login_password').parentElement.classList.remove('error-msg2');

  let fails = login_validate();

  if (fails.length === 0) {
    window.onbeforeunload = 0;
    //document.getElementById('form_login').submit();
    axios.post('http://localhost:5000/api/auth', {
      email: document.getElementById('login_email').value,
      password: document.getElementById('login_password').value,
    });
  } else {
    //Wyświetlenie błędów (ramki + wiadomości)
    fails.forEach(function (obj) {
      let field = document.getElementById(obj.input);
      field.classList.add('error');
      field.parentElement.classList.add('error-msg2');
      field.parentElement.setAttribute('data-errormsg', obj.msg);
    });
  }
};

const register_validate = function (ev) {
  let failures = [];
  let firstName = document.getElementById('firstName');
  let lastName = document.getElementById('lastName');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let password = document.getElementById('password');
  let password2 = document.getElementById('register_password2');
  let rodo = document.getElementById('rodo');

  if (firstName.value === '') {
    failures.push({ input: 'firstName', msg: 'Pole wymagane!' });
  } else if (!firstName.value.match(/[a-z]/i)) {
    failures.push({ input: 'firstName', msg: 'Nieprawidłowe dane!' });
  }
  if (lastName.value === '') {
    failures.push({ input: 'lastName', msg: 'Pole wymagane!' });
  } else if (!lastName.value.match(/[a-z]/i)) {
    failures.push({ input: 'lastName', msg: 'Nieprawidłowe dane!' });
  }
  if (email.value === '') {
    failures.push({ input: 'email', msg: 'Pole wymagane!' });
  } else if (email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1) {
    failures.push({ input: 'email', msg: 'Nieprawidłowe dane!' });
  }
  if (phone.value === '') {
    failures.push({ input: 'phone', msg: 'Pole wymagane!' });
  }
  if (password.value.length < 6) {
    failures.push({ input: 'password', msg: 'Hasło za krótkie!' });
  }
  if (password2.value.length < 6) {
    failures.push({ input: 'register_password2', msg: 'Hasło za krótkie!' });
  }
  if (password.value != password2.value) {
    failures.push({ input: 'register_password2', msg: 'Hasła są różne!' });
  }
  if (!rodo.checked) {
    failures.push({ input: 'rodo', msg: 'Pole wymagane!' });
  }

  return failures;
};

const login_validate = function (ev) {
  let failures = [];
  let email = document.getElementById('login_email');
  let password = document.getElementById('login_password');

  if (email.value === '') {
    failures.push({ input: 'login_email', msg: 'Pole wymagane!' });
  } else if (email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1) {
    failures.push({ input: 'login_email', msg: 'Nieprawidłowe dane!' });
  }
  if (password.value === '') {
    failures.push({ input: 'login_password', msg: 'Pole wymagane!' });
  }

  return failures;
};

const rodo_show = function (ev) {
  document.getElementById('rodo_div').style.visibility = 'visible';
};

const rodo_hide = function (ev) {
  document.getElementById('rodo_div').style.visibility = 'hidden';
};

const rodo_check = function (ev) {
  rodo_hide();
  document.getElementById('rodo').checked = true;
};

document.addEventListener('DOMContentLoaded', init);
