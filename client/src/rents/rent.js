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
  document.getElementById('summ_price').innerText = "100 zł";

  document.getElementById('rent_send').addEventListener('click', rent_send);
  document.getElementById('rent_cancel').addEventListener('click', rent_cancel);
  document.getElementById('rent_done_but').addEventListener('click', rent_done);
};

const rent_send = function(ev) {
  console.log("rent_send");
  document.getElementById('date_summary').style.display = "none";
  document.getElementById('rent_car').style.display = "none";
  document.getElementById('rent_done_div').style.display = "block";
};

const rent_cancel = function(ev) {
  let carid = new URLSearchParams(window.location.search).get('carid');
  location.replace("../cars/cardetails.html?carid="+carid);
};

const rent_done = function(ev) {
  location.replace('../profile/profil.html');
};

document.addEventListener('DOMContentLoaded', init);
