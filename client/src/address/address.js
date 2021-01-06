//import 'regenerator-runtime/runtime';

const init = function () {
  document.getElementById('address_submit').addEventListener('click', address_send);
  document.getElementById('address_cancel').addEventListener('click', address_cancel);
};

const address_send = async function (ev) {
  //Czyszczenie poprzednich błędów
  document.getElementById('street').classList.remove('error');
  document.getElementById('street').parentElement.classList.remove('error-msg2');
  document.getElementById('building').classList.remove('error');
  document.getElementById('building').parentElement.classList.remove('error-msg2');
  document.getElementById('apartment').classList.remove('error');
  document.getElementById('apartment').parentElement.classList.remove('error-msg2');
  document.getElementById('zipCode').classList.remove('error');
  document.getElementById('zipCode').parentElement.classList.remove('error-msg2');
  document.getElementById('city').classList.remove('error');
  document.getElementById('city').parentElement.classList.remove('error-msg2');
  document.getElementById('country').classList.remove('error');
  document.getElementById('country').parentElement.classList.remove('error-msg2');

  //Potwierdzenie opuszczenia strony
  window.onbeforeunload = function (e) {
    var message = 'Strona prosi o potwierdzenie decyzji jej opuszczenia',
      e = e || window.event;
    if (e) {
      e.returnValue = message;
    }
    return message;
  };

  try {
    const res = await axios.post('http://localhost:5000/api/address', {
      street: document.getElementById('street').value,
      building: document.getElementById('building').value,
      apartment: document.getElementById('apartment').value,
      zipCode: document.getElementById('zipCode').value,
      city: document.getElementById('city').value,
      country: document.getElementById('country').value,
    });
    console.log(res);
    window.onbeforeunload = 0;
    location = "../profile/profil.html";
    /*localStorage.setItem('token', res.data.token);
    console.log(localStorage.getItem('token'));
    console.log(res.data.token);*/
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
    }
  }
};

const address_cancel = function (ev) {
  location = "../profile/profil.html";
}

document.addEventListener('DOMContentLoaded', init);
