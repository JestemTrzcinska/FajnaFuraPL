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
    
    let temp = $(el).text()+"cat";
    $("#"+temp).addClass("activecat");
};

$(".categorybutton").each(function(){
    $(this).click(function(){
        changecars($(this));
    });
});