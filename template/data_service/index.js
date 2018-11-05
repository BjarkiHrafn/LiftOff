const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.get('/api/planets', (res, req) => {
    return ;
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
