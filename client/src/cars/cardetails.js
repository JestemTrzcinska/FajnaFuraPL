const init = function(){
  let model = "";
  let brand = "błąd!";
  let year = "błąd!";
  let sits = "błąd!";
  let doors = "błąd!";
  let typeDrive = "błąd!";
  let typeTransmission = "błąd!";
  let airConditioning = "błąd!";
  let typeFuel = "błąd!";
  let engine = "błąd!";
  let averageRange = "błąd!";
  let averageConsumption = "błąd!";
  let category = "błąd!";

  let carid = new URLSearchParams(window.location.search).get('carid');
  axios.get('http://localhost:5000/api/cars/'+carid)
  .then((response) => {
    brand = response.data.brand;
    model = response.data.model;
    year = response.data.year;
    sits = response.data.sits;
    doors = response.data.doors;
    typeDrive = response.data.typeDrive;
    typeTransmission = response.data.typeTransmission;
    airConditioning = response.data.airConditioning;
    typeFuel = response.data.typeFuel;
    engine = response.data.engine;
    averageRange = response.data.averageRange;
    averageConsumption = response.data.averageConsumption;
    category = response.data.category;

    document.getElementById('det_typeTransmission').innerText = typeTransmission;
    document.getElementById('det_averageRange').innerText = averageRange;
    document.getElementById('det_airConditioning').innerText = airConditioning;
    document.getElementById('det_sits').innerText = sits;
    document.getElementById('det_doors').innerText = doors;
    document.getElementById('det_typeFuel').innerText = typeFuel;
    document.getElementById('det_year').innerText = year;
    document.getElementById('det_typeDrive').innerText = typeDrive;
    document.getElementById('det_engine').innerText = engine;
    document.getElementById('det_averageConsumption').innerText = averageConsumption;
    document.getElementById('det_name').innerText = brand+" "+model;
    document.getElementById('det_photo_front').src = "../../img/"+brand+"_"+model+"_"+category+"_front.jpg";
    document.getElementById('det_photo_rear').src = "../../img/"+brand+"_"+model+"_"+category+"_rear.jpg";
  }, (error) => {
    document.getElementById('det_typeTransmission').innerText = typeTransmission;
    document.getElementById('det_averageRange').innerText = averageRange;
    document.getElementById('det_airConditioning').innerText = airConditioning;
    document.getElementById('det_sits').innerText = sits;
    document.getElementById('det_doors').innerText = doors;
    document.getElementById('det_typeFuel').innerText = typeFuel;
    document.getElementById('det_year').innerText = year;
    document.getElementById('det_typeDrive').innerText = typeDrive;
    document.getElementById('det_engine').innerText = engine;
    document.getElementById('det_averageConsumption').innerText = averageConsumption;
    document.getElementById('det_name').innerText = brand+" "+model;
  });

  document.getElementById('date_check').addEventListener('click', date_send);
  document.getElementById('date_submit').addEventListener('click', submit_send);
}

const date_send = function(ev){
  //Czyszczenie poprzednich błędów
  document.getElementById('date_from').classList.remove('error');
  document.getElementById('date_to').classList.remove('error');

  let fails = date_validate();

  if(fails.length === 0){
    let carid = new URLSearchParams(window.location.search).get('carid');
    axios.post('http://localhost:5000/api/cars/isavailable', {
      _id: carid,
      dateStart: document.getElementById('date_from').value,
      dateEnd: document.getElementById('date_to').value
    })
    .then((response) => {
      if(response.data.isAvailable){
        document.getElementById('available').style.color = "green";
        document.getElementById('available').innerHTML = " Dostępny";
      }
      else{
        document.getElementById('available').style.color = "red";
        document.getElementById('available').innerHTML = " Niedostępny";
      }
    }, (error) => {
      document.getElementById('available').style.color = "red";
      document.getElementById('available').innerHTML = " Niedostępny";
    });
  }
  else{
    //Wyświetlenie błędów (ramki + wiadomości)
    fails.forEach(function(obj){
      let field = document.getElementById(obj.input);
      field.classList.add('error');
    })
  }
}

const date_validate = function(ev){
  let failures = [];
  let date_from = document.getElementById('date_from');
  let date_to = document.getElementById('date_to');

  var today = new Date();
  var day = String(today.getDate()).padStart(2, '0');
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var year = today.getFullYear();

  today = year + '-' + month + '-' + day;

  if(date_from.value === ""){
    failures.push({input:'date_from', msg:'Pole wymagane!'})
  }
  else if(date_from.value < today){
    failures.push({input:'date_from', msg:'Nieprawidłowe dane!'})
  }
  if(date_to.value === ""){
    failures.push({input:'date_to', msg:'Pole wymagane!'})
  }
  else if(date_to.value <= today){
    failures.push({input:'date_to', msg:'Nieprawidłowe dane!'})
  }
  else if(date_to.value <= date_from.value){
    failures.push({input:'date_to', msg:'Nieprawidłowe dane!'})
  }

  return failures;
}

const submit_send = function(ev){
  //Czyszczenie poprzednich błędów
  document.getElementById('date_from').classList.remove('error');
  document.getElementById('date_to').classList.remove('error');

  let fails = date_validate();

  if(fails.length === 0){
    let carid = new URLSearchParams(window.location.search).get('carid');
    axios.post('http://localhost:5000/api/cars/isavailable', {
      _id: carid,
      dateStart: document.getElementById('date_from').value,
      dateEnd: document.getElementById('date_to').value
    })
    .then((response) => {
      if(response.data.isAvailable){
        let dateStart = document.getElementById('date_from').value;
        let dateEnd = document.getElementById('date_to').value;
        document.getElementById('available').style.color = "green";
        document.getElementById('available').innerHTML = " Dostępny";
        location = "../rents/rent.html?carid="+carid+"&from="+dateStart+"&to="+dateEnd;
      }
      else{
        document.getElementById('available').style.color = "red";
        document.getElementById('available').innerHTML = " Niedostępny";
      }
    }, (error) => {
      document.getElementById('available').style.color = "red";
      document.getElementById('available').innerHTML = " Niedostępny";
    });
  }
  else{
    //Wyświetlenie błędów (ramki + wiadomości)
    fails.forEach(function(obj){
      let field = document.getElementById(obj.input);
      field.classList.add('error');
    })
  }
}

document.addEventListener('DOMContentLoaded', init);
