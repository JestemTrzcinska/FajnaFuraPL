axios.get('http://localhost:5000/api/cars').then(response => {
    console.log(response);
}).catch(err => {
    console.log(err);
}); 

