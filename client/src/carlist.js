"use strict";

let buttons = document.querySelectorAll(".categorybutton");
let sections = document.querySelectorAll(".category");

window.onload() = function(){
    buttons.forEach(function(element){
        element.addEventListener('click', changecars(element));
    });
};

function changecars(el){
    buttons.forEach(function(element) {
        if(element.classList.contains("activebut")){
            element.classList.remove("activebut");
        }
    });
    el.classList.add("activebut");

    sections.forEach(function(element) {
        if(element.classList.contains("activecat"))
            element.classList.remove("activecat");
    });
    
    let temp = el.innerHTML+"cat";
    document.getElementById(temp).classList.add("activecat");
}