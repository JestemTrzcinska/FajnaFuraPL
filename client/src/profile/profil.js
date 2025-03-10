'use strict';

if(localStorage.getItem('token') == "" || !localStorage.getItem('token')){
  location.replace('../auth/login.html');
}

const init = function () {
  document.getElementById('credit_submit').addEventListener('click', credit_send);
  document.getElementById('chngpsswd_submit').addEventListener('click', changePassword);
  //document.getElementById('infoAfter_submit').addEventListener('click', updateInfoAfter);
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
  else if (temp == 'Zmień hasło') $('#Zmien_haslocat').addClass('activecat');
  else if (temp == 'Dodaj komentarz(test)') $('#Dodaj_komentarzcat').addClass('activecat');
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
  var today = new Date();
  var day = parseInt(String(today.getDate()).padStart(2, '0'));
  var month = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
  var year = parseInt(today.getFullYear());
  let count = 0;

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

    let dday = parseInt(dateto.split("-")[2]);
    let dmonth = parseInt(dateto.split("-")[1]);
    let dyear = parseInt(dateto.split("-")[0]);
    if(!entry.infoAfter && ( (dyear == year && ( (dday <= day && dmonth == month) || dmonth < month) ) || dyear < year ) ) {
      console.log(entry.infoAfter);
      let newentry = $('.commentprototype').clone();
      $(newentry).find('#infoAfter_id').attr('value', entry._id);
      $(newentry).find('#infoAfter_id').attr('id', 'infoAfter_id'+count);
      $(newentry).find('#infoAfter_input').attr('id', 'infoAfter_input'+count);
      $(newentry).find('#infoAfter_submit').attr('id', 'infoAfter_submit'+count);
      $(newentry).removeClass('commentprototype');
      $(newentry).removeClass('comment');
      $(newentry).addClass('comment'+count);
      $(newentry).find('#infoAfter_submit'+count).click(function(){
        updateInfoAfter(this);
      });
      $('#Dane_wypozyczeniacat tbody').append(newentry);
      count++;
    }
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
        oldPassword: document.getElementById('chngpsswd_oldpassword').value,
        password: document.getElementById('chngpsswd_password').value,
        password2: document.getElementById('chngpsswd_password2').value,
      },
      {
        headers: headers,
      }
    )
    .then(
      (response) => {
        console.log('POST wysłany pomyślnie');
        console.log(response);
        location.replace('profil.html');
      },
      (error) => {
        console.log(error);
        if (error.response.data.errors)
          document.getElementById('chngpsswd_error').innerText =
            error.response.data.errors[0].msg;
      }
    );
};

const updateInfoAfter = async function (el) {
  let str = $(el).attr('id');
  str = str.substring(str.length - 1);
  const headers = {
    'x-auth-token': localStorage.getItem('token'),
  };
  await axios
    .post(
      'http://localhost:5000/api/rents/updateinfoAfter',
      {
        id: $("#infoAfter_id"+str).attr('value'),
        infoAfter: document.getElementById('infoAfter_input'+str).value,
      },
      {
        headers: headers,
      }
    )
    .then(
      (response) => {
        console.log('POST wysłany pomyślnie');
        console.log(response);
        //location.replace('profil.html');
        $('.comment'+str).html("<td colspan='4'>Komentarz został dodany</td>");
      },
      (error) => {
        console.log(error);
        if (error.response.data.errors)
          console.log(error.response.data.errors[0].msg);
      }
    );
};

document.addEventListener('DOMContentLoaded', init);
