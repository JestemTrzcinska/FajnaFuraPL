const init = function(){
  document.getElementById('date_check').addEventListener('click', date_send);
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
  else if(date_to.value < today){
    failures.push({input:'date_to', msg:'Nieprawidłowe dane!'})
  }
  else if(date_to.value < date_from.value){
    failures.push({input:'date_to', msg:'Nieprawidłowe dane!'})
  }

  return failures;
}

document.addEventListener('DOMContentLoaded', init);
