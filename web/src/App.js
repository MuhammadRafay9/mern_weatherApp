import logo from './logo.svg';
import './App.css';
import * as ReactBootstrap from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react"
import axios from "axios";


let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:5001`;
}



function App() {

  const [weatherData, setWeatherData] = useState(null)
  const [cityDetail, setCityDetail] = useState(null)
  const [cityName, setCityName] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();

    axios.get(`${baseUrl}/weather/${cityName}`)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(err => {
        console.log("error: ", err);
      })
  }

  return (
    <ReactBootstrap.Container>
      <ReactBootstrap.Row className='mainRow'>

        <ReactBootstrap.Col lg={12} className='mainCol'>
          <ReactBootstrap.Form onSubmit={submitHandler}>
            <ReactBootstrap.Col xs={12} md={12} lg={12} className='Firstcol'>

              <ReactBootstrap.InputGroup className="mb-3">
                <ReactBootstrap.Form.Control
                  className='form-control' type="text" name="text-1542372332072" id="text-1542372332072" required="required" placeholder="City Name" onChange={(e) => { setCityName(e.target.value) }}
                />

                <label >City Name</label>
              </ReactBootstrap.InputGroup>
              <ReactBootstrap.Col xs={12} md={6} lg={3} className='Secondcol' >

                <ReactBootstrap.Button variant="primary" type="submit">
                  Submit
                </ReactBootstrap.Button>
              </ReactBootstrap.Col>
            </ReactBootstrap.Col>


          </ReactBootstrap.Form>
        </ReactBootstrap.Col>

        {(weatherData !== null) ?

          <ReactBootstrap.Col lg={12} className="secondmain">
            <ReactBootstrap.Col xs={6} className="tabl">
              <ReactBootstrap.Card style={{ width: '18rem' }}>
                <ReactBootstrap.ListGroup variant="flush">
                  <ReactBootstrap.ListGroup.Item>City: {weatherData?.city?.name} , {weatherData?.city?.country} </ReactBootstrap.ListGroup.Item>
                  <ReactBootstrap.ListGroup.Item>Temperature: {Math.round(weatherData?.list?.[0]?.main?.temp)}°C</ReactBootstrap.ListGroup.Item>
                  <ReactBootstrap.ListGroup.Item>min: {Math.round(weatherData?.list?.[0]?.main?.temp_min)}°C</ReactBootstrap.ListGroup.Item>
                  <ReactBootstrap.ListGroup.Item>max: {Math.round(weatherData?.list?.[0]?.main?.temp_max)}°C</ReactBootstrap.ListGroup.Item>

                </ReactBootstrap.ListGroup>
              </ReactBootstrap.Card>
            </ReactBootstrap.Col>
          </ReactBootstrap.Col>
          : null}

      </ReactBootstrap.Row>
    </ReactBootstrap.Container>

  );
}

export default App;
