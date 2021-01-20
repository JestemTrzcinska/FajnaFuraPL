"use strict";

axios.get('http://localhost:5000/api/cars').then(response => {
    readcars(response.data);
}).catch(err => {
    console.log(err);
});

let readcars = function(data){
    let arr = [0,0,0,0,0];
    data.forEach(function(car){
        $("#"+car.category+"list").html($("#"+car.category+"list").html()+"| "+car.brand+" "+car.model+" |");
        switch(car.category){
            case 'Kombi':
                arr[0] = car.dayPrice;
                break;
            case 'Hatchback':
                arr[1] = car.dayPrice;
                break;
            case 'Sedan':
                arr[2] = car.dayPrice;
                break;
            case 'SUV':
                arr[3] = car.dayPrice;
                break;
            case 'Coupe':
                arr[4] = car.dayPrice;
                break;
        }
    
    });

    $("table tr:not(:first-child) td:nth-child(2)").each(function(index){
        $(this).text(arr[index] + " zł");
    });
    $("table tr:not(:first-child) td:nth-child(3)").each(function(index){
        $(this).text((arr[index]*30) + " zł");
    });

        
};