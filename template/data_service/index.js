const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const Planets = require('./Service/planet');

app.use(bodyParser.json());



app.get('/api/planets', (req, res) => {
 
  
  const servIns = new Planets();
  console.log(servIns);
  servIns.on("GET_ALL_PLANETS", result => {
    if(result === null) {
      return res.status(404).semd();
    }
    return res.status(200).send(result);
  })
  servIns.getAllPlanets();
})

app.get('/api/planets/:planetId/coordinates', (req, res) => {
  
  const id = req.params.planetId;
  const servIns = new Planets();
  servIns.on("GET_PLANET_COORDINATES", result => {
    if(result === null) {
      return res.status(404).semd();
    } else if(result === -1) {
      return res.status(500).send();
    } else if(result === -2) {
      return res.status(400).send();
    }
    return res.status(200).send(result);
  })
  servIns.getCoordinatesOfPlanet(id);
})

app.post('/api/planets/:planetId/coordinates', (req, res) => {
  console.log("hello");
  
  const id = req.params.planetId;
  const {body} = req;
  const servIns = new Planets();
  servIns.on("ADD_COORDINATES_ON_PLANET", result => {
    if(result === -1) {
      return res.status(500).send();
    } else if(result === -2) {
      return res.status(400).send();
    }
    return res.status(200).send(result);
  })
  servIns.addCoordinatesToPlanet(id, body);

})
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
