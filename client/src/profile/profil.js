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
    else if(temp=="Historia wypożyczeń")
        $("#Dane_wypozyczeniacat").addClass("activecat");
    else if(temp=="Dane personalne")
        $("#Dane_personalnecat").addClass("activecat");
    
};

$(".categorybutton").each(function(){
    $(this).click(function(){
        changecars($(this));
    });
});

axios.get('http://localhost:5000/api/users/history/5ff39f477e3e6d0898d2f10e').then(response => {
    loadhistory(response.data);
}).catch(err => {
    console.log(err);
});

let loadhistory = function(data){
    data.forEach(function(entry){
        let newentry = $(".historyprototype").clone();
        $(newentry).find("td:nth-child(1)").text(entry.car.brand + " " + entry.car.model);
        let datefrom = entry.dateFrom.split("T")[0];
        $(newentry).find("td:nth-child(2)").text(datefrom);
        let dateto = entry.dateTo.split("T")[0];
        $(newentry).find("td:nth-child(3)").text(dateto);
        $(newentry).find("td:nth-child(4)").text(entry.status.name);
        $(newentry).removeClass("historyprototype");
        $("#Dane_wypozyczeniacat tbody").append(newentry);
    })
}