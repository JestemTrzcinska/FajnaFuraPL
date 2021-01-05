"use strict";

axios.get('http://localhost:5000/api/cars').then(response => {
    readcars(response.data);
}).catch(err => {
    console.log(err);
});

let readcars = function(data){
    let cnt = 0;
    data.forEach(function(car){
        $("#"+car.category+"list").html($("#"+car.category+"list").html()+"| "+car.brand+" "+car.model+" |");
        cnt++;
    })
};