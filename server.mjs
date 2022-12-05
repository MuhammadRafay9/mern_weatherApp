import express from 'express';
import path from 'path';
import cors from 'cors';
import request from 'request';

const app = express()
const port = process.env.PORT || 5001;

app.use(cors());

app.get('/abc', (req, res) => {
    console.log("request ip: ", req.ip);
    res.send('Hello World! ' + new Date().toString());
})

app.get('/weather/:cityName', (req, res) => {
  
  const requestOptions = {
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.cityName}&appid=184ae4d8dfeddc69b4b96699c3d202ab&units=metric`,
      method: 'GET',
      json: {},
      qs: {
        offset: 20
      }
    };
    request(requestOptions, (err, response, body) => {
      if (err) {
        res.send(err);
      } else if (response.statusCode === 200) {
        res.send(body);
      } else {
        res.send(response.statusCode);
      }
    });

})


app.get('/time', (req, res) => {
    console.log("request ip: ", req.ip);
    res.send('Hello World! ' + new Date().toString());
})

const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})