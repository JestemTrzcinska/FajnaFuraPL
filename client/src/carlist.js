"use strict";

let buttons = $(".categorybutton");
let sections = $(".category");

let changecars = function(el) {
    $(buttons).each(function() {
        if($(this).hasClass("activebut")){
            $(this).removeClass("activebut");
        }
    });
    $(el).addClass("activebut");

    $(sections).each(function() {
        if($(this).hasClass("activecat"))
            $(this).removeClass("activecat");
    });
    
    let temp = $(el).html()+"cat";
    $("#"+temp).addClass("activecat");
};

buttons.each(function(){
    $(this).click(changecars($(this)));
});