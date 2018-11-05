
const mongoose = require("mongoose");
const planet = require('../schemas/planet');
const coordinate = require('../schemas/coordinate');
const conString = process.env.STRING_THAT_IS_A_URL_TO_MONGODB || "mongodb://abc123:abc123@ds151523.mlab.com:51523/lift-off";
const connection = mongoose.createConnection(
  conString,
  {useNewUrlParser: true}
);

module.exports = {
    Planets: connection.model("Planet", planet),
    Coordinate: connection.model("Coordinate", coordinate)
};
