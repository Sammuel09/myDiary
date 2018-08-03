import promise from "bluebird";

const options = {
    promiseLib: Promise
};

const pgp = require('pg-promise')(options);
var db = pgp("postgres://hgmgxmsc:W7B91ZAT2qrttR7Qs8_5iXb2CKEAD5At@baasu.db.elephantsql.com:5432/hgmgxmsc")

// db.one('SELECT $1 AS value', 123)
//   .then(function (data) {
//     console.log('DATA:', data.value)
//   })
//   .catch(function (error) {
//     console.log('ERROR:', error)
//   })

  export default db;