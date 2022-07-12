import { useEffect, useState } from "react";

function App() {

  const [latLong, setLatLong] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [foreCast, setForeCast] = useState([]);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function getWeatherData(latLon){
    fetch(process.env.REACT_APP_API_URL +`&lat=${latLon.lat}&lon=${latLon.long}`)
    .then(res=>res.json())
    .then(data=>setWeatherData(data.data[0]));
    getForeCast(latLon);
  }
  
  function getForeCast(latLon){
    const URL = process.env.REACT_APP_FORECAST_URL + `&lat=${latLon.lat}&lon=${latLon.long}`;
    fetch(URL)
    .then(res=>res.json())
    .then(data=>setForeCast(data.data));
  }

  function getLatLong(){
      navigator.geolocation.getCurrentPosition(position => {
      setLatLong({lat: position.coords.latitude, long: position.coords.longitude});
      getWeatherData({lat: position.coords.latitude, long: position.coords.longitude});
    });
  }
  useEffect(()=>{
    getLatLong();
  }, []);

  return (
    <div className="h-full p-10 text-white">
      <div className="flex flex-col justify-around">
        <div className="text-2xl">{weatherData?.city_name}</div>
        <div className="p-5 flex flex-row justify-start align-end w-full">
          <div className="text-4xl">{weatherData?.app_temp}<span><sup>o</sup>C</span></div>
          <div><img className="md:w-[60px] md:h-[60px] w-2/3" alt={weatherData?.weather?.description} src={`https://www.weatherbit.io/static/img/icons/${weatherData?.weather?.icon}.png`}></img></div>
        </div>
        <div className="flex flex-row">
          <div className="text-xl m-2">{weatherData?.weather?.description}</div>
        <div className="text-xl m-2">{weatherData?.datetime}</div>
        </div>
      </div>
      <div className="w-full">
        <table className="table-auto">
          <thead>
            <tr>
              <td className="text-center text-xl">Day</td>
              <td className="text-center text-xl">Temp</td>
              <td className="text-center text-xl">Weather</td>
            </tr>
          </thead>
          <tbody>
            {foreCast?.slice(1,6).map((item, index)=>{
              return <tr key={index}>
                <td className="m-2 text-left md:text-center">{days[new Date(item.datetime).getDay()]}</td>
                <td className="m-2 text-center">{item.temp} <span><sup>o</sup>C</span></td>
                <td className="m-2 flex flex-row justify-around "><img alt={item?.weather.description} width="60" height="60" src={`https://www.weatherbit.io/static/img/icons/${item?.weather?.icon}.png`} /><div className="text-left md:text-left">{item.weather.description}</div></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
