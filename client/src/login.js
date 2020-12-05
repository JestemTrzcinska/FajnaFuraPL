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
  document.getElementById('register_email').classList.remove('error');
  document.getElementById('register_password').classList.remove('error');
  document.getElementById('register_password2').classList.remove('error');
  document.getElementById('name').classList.remove('error');
  document.getElementById('surname').classList.remove('error');
  document.getElementById('phone').classList.remove('error');
  document.getElementById('rodo').classList.remove('error');

  let fails = register_validate();

  if(fails.length === 0){
    document.getElementById('form_register').submit();
  }
  else{
    fails.forEach(function(obj){
      let field = document.getElementById(obj.input);
      field.classList.add('error');
    })
  }
}

const login_send = function(ev){
  let email = document.getElementById('login_email').classList.remove('error');
  let password = document.getElementById('login_password').classList.remove('error');

  let fails = login_validate();

  if(fails.length === 0){
    document.getElementById('form_login').submit();
  }
  else{
    fails.forEach(function(obj){
      let field = document.getElementById(obj.input);
      field.classList.add('error');
    })
  }
}

const register_validate = function(ev){
  let failures = [];
  let email = document.getElementById('register_email');
  let password = document.getElementById('register_password');
  let password2 = document.getElementById('register_password2');
  let name = document.getElementById('name');
  let surname = document.getElementById('surname');
  let phone = document.getElementById('phone');
  let rodo = document.getElementById('rodo');

  if(email.value === "" || email.value.indexOf("@") == -1){
    failures.push({input:'register_email', msg:'Pole wymagane!'})
  }
  if(password.value.length < 6){
    failures.push({input:'register_password', msg:'Hasło za krótkie!'})
  }
  if(password2.value.length < 6){
    failures.push({input:'register_password2', msg:'Hasło za krótkie!'})
  }
  if(password.value != password2.value){
    failures.push({input:'register_password2', msg:'Hasła są różne'})
  }
  if(name.value === "" || !name.value.match(/[a-z]/i)){
    failures.push({input:'name', msg:'Pole wymagane!'})
  }
  if(surname.value === "" || !surname.value.match(/[a-z]/i)){
    failures.push({input:'surname', msg:'Pole wymagane!'})
  }
  if(phone.value === ""){
    failures.push({input:'phone', msg:'Pole wymagane!'})
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

  if(email.value === "" || email.value.indexOf("@") == -1){
    failures.push({input:'login_email', msg:'Pole wymagane!'})
  }
  if(password.value === ""){
    failures.push({input:'login_password', msg:'Pole wymagane!'})
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

document.addEventListener('DOMContentLoaded', init);
