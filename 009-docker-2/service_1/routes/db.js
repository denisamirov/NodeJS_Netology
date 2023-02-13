module.exports = function db(bookId) {

    fetch(`http:/localhost:3000/counter/${bookId}`)
  .then((response) => response.json())
  .then((data) => console.log(data)); }



