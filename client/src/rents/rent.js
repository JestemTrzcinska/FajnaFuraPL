const init = function () {
  let brand = "";
  let model = "błąd!";
  let category = "błąd!";

  let carid = new URLSearchParams(window.location.search).get('carid');

  axios.get('http://localhost:5000/api/cars/'+carid)
  .then((response) => {
    brand = response.data.brand;
    model = response.data.model;
    category = response.data.category;

    document.getElementById('summ_car_name').innerText = brand+" "+model;
    document.getElementById('summ_photo').src = "../../img/"+brand+"_"+model+"_"+category+"_front.jpg";
  }, (error) => {
    document.getElementById('summ_car_name').innerText = brand+" "+model;
  });

  let url_from = new URLSearchParams(window.location.search).get('from');
  let url_to = new URLSearchParams(window.location.search).get('to');
  document.getElementById('summ_date_from').innerText = url_from;
  document.getElementById('summ_date_to').innerText = url_to;

  axios.get('http://localhost:5000/api/rents/cost/?id='+carid+'&dateStart='+url_from+'&dateEnd='+url_to)
  .then((response) => {
    document.getElementById('summ_price').innerText = response.data.rentCost+" zł";
  }, (error) => {
    document.getElementById('summ_price').innerText = "błąd!";
  });

  document.getElementById('rent_send').addEventListener('click', rent_send);
  document.getElementById('rent_cancel').addEventListener('click', rent_cancel);
  document.getElementById('rent_done_but').addEventListener('click', rent_done);
  document.getElementById('rent_error_but').addEventListener('click', rent_cancel);
};

const rent_send = function(ev) {
  let carid = new URLSearchParams(window.location.search).get('carid');
  let url_from = new URLSearchParams(window.location.search).get('from');
  let url_to = new URLSearchParams(window.location.search).get('to');

  const headers = {
    'x-auth-token': localStorage.getItem('token')
  }
  axios.post('http://localhost:5000/api/rents', {
    carID: carid,
    dateFrom: url_from,
    dateTo: url_to,
    status: "Nieopłacona",
  }, {
    headers: headers
  })
  .then((response) => {
    document.getElementById('date_summary').style.display = "none";
    document.getElementById('rent_car').style.display = "none";
    document.getElementById('rent_done_div').style.display = "block";
  }, (error) => {
    document.getElementById('date_summary').style.display = "none";
    document.getElementById('rent_car').style.display = "none";
    document.getElementById('rent_error_div').style.display = "block";
  });
};

const rent_cancel = function(ev) {
  history.back();
};

const rent_done = function(ev) {
  location.replace('../profile/profil.html');
};

document.addEventListener('DOMContentLoaded', init);
