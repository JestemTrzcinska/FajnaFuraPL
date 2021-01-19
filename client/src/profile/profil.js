'use strict';


const init = function () {
  document
    .getElementById('credit_submit')
    .addEventListener('click', credit_send);
};

const headers = {
  'x-auth-token': localStorage.getItem('token'),
};
axios
  .get('http://localhost:5000/api/users', {
    headers: headers,
  })
  .then((response) => {
    document.getElementById('firstName').innerText = response.data.firstName;
    document.getElementById('lastName').innerText = response.data.lastName;
    document.getElementById('drivingLicense').innerText =
      response.data.drivingLicense;
    document.getElementById('email').innerText = response.data.email;
    if (response.data.address != null)
      if (response.data.address.apartment != null)
        document.getElementById('address').innerHTML =
          response.data.address.street +
          ' ' +
          response.data.address.building +
          '/' +
          response.data.address.apartment +
          '<br>' +
          response.data.address.zipCode +
          ' ' +
          response.data.address.city +
          '<br>' +
          response.data.address.country;
      else
        document.getElementById('address').innerHTML =
          response.data.address.street +
          ' ' +
          response.data.address.building +
          '<br>' +
          response.data.address.zipCode +
          ' ' +
          response.data.address.city +
          '<br>' +
          response.data.address.country;
    else document.getElementById('address').innerText = 'nie podano';
    document.getElementById('credit').innerText = response.data.credit + ' zł';
  })
  .catch((err) => {
    console.log(err);
  });

let changecars = function (el) {
  $('.categorybutton').each(function () {
    if ($(this).hasClass('activebut')) {
      $(this).removeClass('activebut');
    }
  });
  $(el).addClass('activebut');

  $('.category').each(function () {
    if ($(this).hasClass('activecat')) $(this).removeClass('activecat');
  });

  let temp = $(el).text();
  if (temp == 'Dane konta') $('#Dane_kontacat').addClass('activecat');
  else if (temp == 'Historia wypożyczeń')
    $('#Dane_wypozyczeniacat').addClass('activecat');
  else if (temp == 'Dane personalne')
    $('#Dane_personalnecat').addClass('activecat');
  else if (temp == 'Dodaj środki') $('#Dodaj_srodkicat').addClass('activecat');
};

$('.categorybutton').each(function () {
  $(this).click(function () {
    changecars($(this));
  });
});

axios
  .get('http://localhost:5000/api/users/history', {
    headers: headers,
  })
  .then((response) => {
    loadhistory(response.data);
  })
  .catch((err) => {
    console.log(err);
  });

let loadhistory = function (data) {
  data.forEach(function (entry) {
    let newentry = $('.historyprototype').clone();
    $(newentry)
      .find('td:nth-child(1)')
      .text(entry.car.brand + ' ' + entry.car.model);
    let datefrom = entry.dateFrom.split('T')[0];
    $(newentry).find('td:nth-child(2)').text(datefrom);
    let dateto = entry.dateTo.split('T')[0];
    $(newentry).find('td:nth-child(3)').text(dateto);
    $(newentry).find('td:nth-child(4)').text(entry.status.name);
    $(newentry).removeClass('historyprototype');
    $('#Dane_wypozyczeniacat tbody').append(newentry);
  });
};

const credit_send = async function (ev) {
  const headers = {
    'x-auth-token': localStorage.getItem('token'),
  };
  await axios
    .post(
      'http://localhost:5000/api/users/credit',
      {
        credit: document.getElementById('credit_input').value,
      },
      {
        headers: headers,
      }
    )
    .then(
      (response) => {
        console.log('POST wysłany pomyślnie');
        console.log(response);
        //changecars($("#dane_konta2 li:first-child"))

        //lepiej użyć tego aby saldo mogło się odświeżyć w profilu
        location.replace('profil.html');
      },
      (error) => {
        console.log(error);
      }
    );
};

const changePassword = async function (params) {
  const headers = {
    'x-auth-token': localStorage.getItem('token'),
  };
  await axios
    .post(
      'http://localhost:5000/api/users/changePassword',
      {
        password: document.getElementById('password_input').value, // Konrad
        password2: document.getElementById('password2_input').value, // Konrad
      },
      {
        headers: headers,
      }
    )
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
};

document.addEventListener('DOMContentLoaded', init);
