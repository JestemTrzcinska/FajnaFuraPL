function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName('*');
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute('w3-include-html');
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = 'Page not found.';
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute('w3-include-html');
          includeHTML();
        }
      };
      xhttp.open('GET', file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
let count = 0;
let inv = null;
document.addEventListener('DOMContentLoaded', function () {
  includeHTML();
  inv = setInterval(setCurrentPage, 100);
});

function setCurrentPage() {
  let url = window.location.pathname;
  console.log(url);
  url = url.split('/');

  url = url[url.length - 2]+"/"+url[url.length - 1];
  url = url.split('.')[0];
  console.log(url);
  // console.log($("#cssmenu a[href='"+url+".html']").parent().html());
  $("#cssmenu a[href='../" + url + ".html']")
    .parent()
    .addClass('active');
  console.log(localStorage.getItem('token'));
  if(localStorage.getItem('token') != null) {
    document.getElementById('navbar_last_span').innerText = "Wyloguj się";
    $("#cssmenu a[href='../profile/profil.html']").css("display", "block");
  } else
    document.getElementById('navbar_last_span').innerText = "Zaloguj się/Zarejestruj się";
  if ((count = 5)) clearInterval(inv);
  count++;
}
