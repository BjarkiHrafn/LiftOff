const EventEmitter = require("events");
const {Planets, Coordinate } = require('./database');

class PlanetService extends EventEmitter {
  constructor() {
    super();
      this.events = {
        GET_ALL_PLANETS: "GET_ALL_PLANETS",
        GET_PLANET_COORDINATES: "GET_PLANET_COORDINATES",
        ADD_COORDINATES_ON_PLANET: "ADD_COORDINATES_ON_PLANET"
      };
  }
  getAllPlanets() {
    
    Planets.find({}, (err, planet) => {
      if(err) {
        this.emit(this.events.GET_ALL_PLANETS, -1);
      } else {
        this.emit(this.events.GET_ALL_PLANETS, planet);
      }
      
    })
  }
  
  getCoordinatesOfPlanet(id) {
    
    Coordinate.find({planetId:id}, (err, coordinates) => {
      if(err) {
        if(err.name === "CastError") {
          this.emit(this.events.GET_PLANET_COORDINATES, -2);
        } else {
          this.emit(this.events.GET_PLANET_COORDINATES, -1);
        }
        
      } else if(coordinates === null) {
        this.emit(this.events.GET_PLANET_COORDINATES);
      } else {
        this.emit(this.events.GET_PLANET_COORDINATES, coordinates);
      }
    })
  }

  addCoordinatesToPlanet(id, body) {
    console.log("inside");
    
    Planets.findById(id, (err, planet) => {
      if(err) {
        if(err.name === "CastError") {
          this.emit(this.events.ADD_COORDINATES_ON_PLANET, -2);
        } else {
          this.emit(this.events.ADD_COORDINATES_ON_PLANET, -1);
        }
        
      } else if(planet === null) {
        this.emit(this.events.ADD_COORDINATES_ON_PLANET, -2);
      } else {
        Coordinate.create(
          {
            latitude: body.latitude,
            longitude: body.longitude,
            planetId: id
          }, (err, newCoord) => {
            if(err) {
              if(err.name === "CastError") {
                this.emit(this.events.ADD_COORDINATES_ON_PLANET, -2);
              } else {
                this.emit(this.events.ADD_COORDINATES_ON_PLANET, -1);
              }
              
            } else {
              this.emit(this.events.ADD_COORDINATES_ON_PLANET, newCoord);
            }
          }
        );

      }
    });
  }
  
};


module.exports = PlanetService;
