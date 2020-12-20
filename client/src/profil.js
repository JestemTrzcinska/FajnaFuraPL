"use strict";

let changecars = function(el) {
    $(".categorybutton").each(function() {
        if($(this).hasClass("activebut")){
            $(this).removeClass("activebut");
        }
    });
    $(el).addClass("activebut");

    $(".category").each(function() {
        if($(this).hasClass("activecat"))
            $(this).removeClass("activecat");
    });
    
    let temp = $(el).text();
    if(temp=="Dane konta")
        $("#Dane_kontacat").addClass("activecat");
    else if(temp=="Dane wypożyczenia")
        $("#Dane_wypozyczeniacat").addClass("activecat");
    else if(temp=="Dane personalne")
        $("#Dane_personalnecat").addClass("activecat");
};

$(".categorybutton").each(function(){
    $(this).click(function(){
        changecars($(this));
    });
});