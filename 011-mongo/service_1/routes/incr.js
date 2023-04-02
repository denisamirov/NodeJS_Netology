module.exports = function incr(bookID) {
    fetch(`http://counter:4000/counter/${bookID}/incr`, 
        {method: 'post'})
  }