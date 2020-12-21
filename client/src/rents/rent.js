const init = function () {
  axios
    .post('/rent.html', {
      firstName: document.getElementById('date_from').value,
      lastName: document.getElementById('date_to').value,
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  document.getElementById('date_summary').innerHTML = `
  ${JSON.stringify(res.date, null, 2)}`;
};

document.addEventListener('DOMContentLoaded', init);
