import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useState } from "react"
import "./index.css"

const Weather = () => {

    const [weatherData, setWeatherData] = useState(null)

    const formik = useFormik({
        initialValues: {
            cityName: '',

        },
        validationSchema:
            yup.object({
                cityName: yup
                    .string('Enter your city')

            }),

        onSubmit: (values) => {

            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${values.cityName}&units=metric&appid=a87b897713922e0dae12cddf4a37b07f`)
                .then(response => {
                    console.log("response: ", response.data);

                    setWeatherData(response.data);
                })
                .catch(err => {
                    console.log("error: ", err);
                })
        },
    });


    return (
        <div>
            <div className='weather_app'>
                <div className='nav_div'>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            placeholder='Enter City Name'
                            className='input'
                            fullWidth
                            id="cityName"
                            label="cityName"
                            value={formik.values.cityName}
                            onChange={formik.handleChange}
                        />
                        {
                            (formik.touched.cityName && formik.errors.cityName) ?
                                <span style={{ color: "red" }}>{formik.errors.cityName}</span> : null
                        }
                        <button type="submit"> Submit </button>
                    </form>
                </div>
            </div>


            {(weatherData === null) ? null :
                <div className='main'>
                    <div className='left'>
                        <div className='city'>{(weatherData?.name)}</div>
                        <div className='temp'>{(weatherData?.main?.temp)}°C</div>
                        min_Temp: {Math.round(weatherData?.main?.temp_min)}°C
                        <br />
                        max_Temp: {Math.round(weatherData?.main?.temp_max)}°C
                        <br />
                    </div>
                    <div className='right'>
                        Feels like: {(weatherData?.main?.feels_like)}°C
                        <br />
                        Humidity: {(weatherData?.main?.humidity)}%
                        <br />
                        Visiblity: {(weatherData?.name)}
                        <br />
                        Wind speed: {(weatherData?.wind.speed)} MP/H
                    </div>
                </div>

            }
        </div >
    );
}

export default Weather