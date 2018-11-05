const Schema = require("mongoose").Schema;

module.exports = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  planetId: {type: Schema.Types.ObjectId, required: true}
});
