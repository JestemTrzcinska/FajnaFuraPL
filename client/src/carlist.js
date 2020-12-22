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


axios.get('http://localhost:5000/api/cars').then(response => {
    readcars(response.data);
}).catch(err => {
    console.log(err);
});

let readcars = function(data){
    data.forEach(function(car){
        let newdiv = $("div#carbox.prototype").clone();
        $(newdiv).find("h2").text(car.brand + " " + car.model);
        $(newdiv).removeClass("prototype");
        $(newdiv).find("a").attr("href", "cardetails.html?carid="+car._id);
        $(newdiv).find("img").attr("src", "http://localhost:5000/img/"+car.brand+"_"+car.model+"_"+car.category+"_front.jpg");
        $("#"+car.category+"cat").append(newdiv);
    })
};

let cartype = new URLSearchParams(window.location.search).get('cartype');
if(cartype){
    changecars($("#"+cartype+"but"));
}