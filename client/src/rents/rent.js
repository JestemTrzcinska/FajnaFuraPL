const init = function () {
  document.getElementById('summ_car_name').innerText = "Ford Focus";
  let url_from = new URLSearchParams(window.location.search).get('from');
  let url_to = new URLSearchParams(window.location.search).get('to');
  document.getElementById('summ_date_from').innerText = url_from;
  document.getElementById('summ_date_to').innerText = url_to;
  document.getElementById('summ_price').innerText = "100 zł";

  document.getElementById('rent_send').addEventListener('click', rent_send);
  document.getElementById('rent_cancel').addEventListener('click', rent_cancel);
};

const rent_send = function(ev) {
  console.log("Naciśnięto zatwierdzenie wypożyczenia");
}

const rent_cancel = function(ev) {
  location.replace("../cars/cardetails.html?carid=5fdf5a8acee0960da8aafda2");
}

document.addEventListener('DOMContentLoaded', init);
