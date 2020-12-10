var objUsers = [
  { // Object @ 0 index
    email: "konrad@fura.pl",
    password: "12345678"
  },
  { // Object @ 1 index
    email: "jakub@fura.pl",
    password: "12345678"
  },
  { // Object @ 2 index
    email: "maciej@fura.pl",
    password: "12345678"
  },
  { // Object @ 3 index
    email: "patrycja@fura.pl",
    password: "12345678"
  },
  { // Object @ 4 index
    email: "mateusz@fura.pl",
    password: "12345678"
  }
]

const init = function(){
  document.getElementById('register_submit').addEventListener('click', register_send);
  document.getElementById('login_submit').addEventListener('click', login_send);
}

const register_send = function(ev){
  //Czyszczenie poprzednich błędów
  document.getElementById('name').classList.remove('error');
  document.getElementById('name').parentElement.classList.remove('error-msg2');
  document.getElementById('surname').classList.remove('error');
  document.getElementById('surname').parentElement.classList.remove('error-msg2');
  document.getElementById('register_email').classList.remove('error');
  document.getElementById('register_email').parentElement.classList.remove('error-msg2');
  document.getElementById('phone').classList.remove('error');
  document.getElementById('phone').parentElement.classList.remove('error-msg2');
  document.getElementById('register_password').classList.remove('error');
  document.getElementById('register_password').parentElement.classList.remove('error-msg2');
  document.getElementById('register_password2').classList.remove('error');
  document.getElementById('register_password2').parentElement.classList.remove('error-msg2');
  document.getElementById('rodo').classList.remove('error');
  document.getElementById('rodo').parentElement.classList.remove('error-msg2');

  //Potwierdzenie opuszczenia strony
  window.onbeforeunload = function (e) {
    var message = "Strona prosi o potwierdzenie decyzji jej opuszczenia",
    e = e || window.event;
    if (e) {
      e.returnValue = message;
    }
    return message;
  };

  let fails = register_validate();

  if(fails.length === 0){
    window.onbeforeunload = 0;
    document.getElementById('form_register').submit();
  }
  else{
    //Wyświetlenie błędów (ramki + wiadomości)
    fails.forEach(function(obj){
      let field = document.getElementById(obj.input);
      field.classList.add('error');
      field.parentElement.classList.add('error-msg2');
      field.parentElement.setAttribute('data-errormsg', obj.msg);
    })
  }
}

const login_send = function(ev){
  //Czyszczenie poprzednich błędów
  document.getElementById('login_email').classList.remove('error');
  document.getElementById('login_email').parentElement.classList.remove('error-msg2');
  document.getElementById('login_password').classList.remove('error');
  document.getElementById('login_password').parentElement.classList.remove('error-msg2');

  let fails = login_validate();

  if(fails.length === 0){
    window.onbeforeunload = 0;
    document.getElementById('form_login').submit();
  }
  else{
    //Wyświetlenie błędów (ramki + wiadomości)
    fails.forEach(function(obj){
      let field = document.getElementById(obj.input);
      field.classList.add('error');
      field.parentElement.classList.add('error-msg2');
      field.parentElement.setAttribute('data-errormsg', obj.msg);
    })
  }
}

const register_validate = function(ev){
  let failures = [];
  let name = document.getElementById('name');
  let surname = document.getElementById('surname');
  let email = document.getElementById('register_email');
  let phone = document.getElementById('phone');
  let password = document.getElementById('register_password');
  let password2 = document.getElementById('register_password2');
  let rodo = document.getElementById('rodo');

  if(name.value === ""){
    failures.push({input:'name', msg:'Pole wymagane!'})
  }
  else if(!name.value.match(/[a-z]/i)){
    failures.push({input:'name', msg:'Nieprawidłowe dane!'})
  }
  if(surname.value === ""){
    failures.push({input:'surname', msg:'Pole wymagane!'})
  }
  else if(!surname.value.match(/[a-z]/i)){
    failures.push({input:'surname', msg:'Nieprawidłowe dane!'})
  }
  if(email.value === ""){
    failures.push({input:'register_email', msg:'Pole wymagane!'})
  }
  else if(email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1){
    failures.push({input:'register_email', msg:'Nieprawidłowe dane!'})
  }
  else{
    for(var i = 0; i < objUsers.length; i++) {
      if(email.value == objUsers[i].email) {
        failures.push({input:'register_email', msg:'Email zajęty!'})
      }
    }
  }
  if(phone.value === ""){
    failures.push({input:'phone', msg:'Pole wymagane!'})
  }
  if(password.value.length < 6){
    failures.push({input:'register_password', msg:'Hasło za krótkie!'})
  }
  if(password2.value.length < 6){
    failures.push({input:'register_password2', msg:'Hasło za krótkie!'})
  }
  if(password.value != password2.value){
    failures.push({input:'register_password2', msg:'Hasła są różne!'})
  }
  if(!rodo.checked){
    failures.push({input:'rodo', msg:'Pole wymagane!'})
  }

  return failures;
}

const login_validate = function(ev){
  let failures = [];
  let email = document.getElementById('login_email');
  let password = document.getElementById('login_password');

  if(email.value === ""){
    failures.push({input:'login_email', msg:'Pole wymagane!'})
  }
  else if(email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1){
    failures.push({input:'login_email', msg:'Nieprawidłowe dane!'})
  }
  if(password.value === ""){
    failures.push({input:'login_password', msg:'Pole wymagane!'})
  }

  if(failures.length != 0){
    return failures;
  }

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

  return failures;
}

const rodo_show = function(ev){
  document.getElementById('rodo_div').style.visibility = "visible";
}

const rodo_hide = function(ev){
  document.getElementById('rodo_div').style.visibility = "hidden";
}

const rodo_check = function(ev){
  rodo_hide();
  document.getElementById('rodo').checked = true;
}

document.addEventListener('DOMContentLoaded', init);
