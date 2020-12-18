const init = function(){
  document.getElementById('date_submit').addEventListener('click', date_send);
}

const date_send = function(ev){
  //Czyszczenie poprzednich błędów
  document.getElementById('date_from').classList.remove('error');
  document.getElementById('date_to').classList.remove('error');

  let fails = date_validate();

  if(fails.length === 0){
    document.getElementById('form_cardetails2').submit();
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
  console.log(date_from.value);
  console.log(Date.now());

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

  //if(failures.length != 0){
  //  return failures;
  //}

  /* Przyda się później przy sprawdzaniu z bazy
  var success = 0;
  for(var i = 0; i < objUsers.length; i++) {
    if(email.value == objUsers[i].email && password.value == objUsers[i].password) {
      alert(email.value + " zalogowany/zalogowana")
      success = 1;
    }
  }

  if(!success){
    alert("Złe dane logowania!");
    failures.push({input:'login_email', msg:'Błędne dane!'})
    failures.push({input:'login_password', msg:'Błędne dane!'})
  }
  */

  return failures;
}

document.addEventListener('DOMContentLoaded', init);
