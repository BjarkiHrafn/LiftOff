var request = require('request');
const db = '../../seed/seed.js'

console.log(db);
/*var data = request.get('https://basketball-fields.herokuapp.com/api/basketball-fields', {json: true}, (err, res, body) => {
    if(err) {return console.log(err);}
    return body;
});*/

module.exports = {
    basketballFields: data
};
