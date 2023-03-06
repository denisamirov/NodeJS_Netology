const records = function() {
  fetch(`http://localhost:3000/users`, 
      {method: 'get'})
.then((data) => console.log(data))}
  
  exports.findById = function (id, cb) {
    process.nextTick(function () {
      const idx = id - 1
      if (records[idx]) {
        cb(null, records[idx])
      } else {
        cb(new Error('User ' + id + ' does not exist'))
      }
    })
  }
  
  exports.findByUsername = function (username, cb) {
    process.nextTick(function () {
      console.log(records)
      let i = 0, len = records.length
      for (; i < len; i++) {
        const record = records[i]
        if (record.username === username) {
          return cb(null, record)
        }
      }
      return cb(null, null)
    })
  }
  
  exports.verifyPassword = (user, password) => {
    return user.password === password
  }