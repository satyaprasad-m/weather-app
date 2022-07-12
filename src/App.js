import { useEffect, useState } from "react";
function App() {

  const [latLong, setLatLong] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [foreCast, setForeCast] = useState([]);

  function getWeatherData(latLon){
    console.log(latLon);
    // fetch(process.env.REACT_APP_API_URL +`&lat=${latLon.lat}&lon=${latLon.long}`)
    // .then(res=>res.json())
    // .then(data=>setWeatherData(data.data[0]));
    // getForeCast(latLon);
  }
  
  function getForeCast(latLon){
    const URL = process.env.REACT_APP_FORECAST_URL + `&lat=${latLon.lat}&lon=${latLon.long}`;
    console.log(latLong);
    // fetch(URL)
    // .then(res=>res.json())
    // .then(data=>setForeCast(data.data));
  }

  function getLatLong(){
    if(localStorage.latLong){ 
      setLatLong(JSON.parse(localStorage.latLong));
      const latLon = JSON.parse(localStorage.latLong);
      console.log(latLon);
      getWeatherData(latLon);
    }else{
      navigator.geolocation.getCurrentPosition(position => {
      setLatLong({lat: position.coords.latitude, long: position.coords.longitude});
      localStorage.setItem('latLong', JSON.stringify(latLong));
      console.log({lat: position.coords.latitude, long: position.coords.longitude});
    });
   }
  }
  useEffect(()=>{
    getLatLong();
  }, []);

  return (
    <div className="w-full h-full p-10 text-white">
      <div className="flex flex-col justify-between">
        <div className="text-2xl">{weatherData?.city_name}</div>
        <div className="flex flex-row align-center w-full">
          <div className="text-4xl">{weatherData?.app_temp}<span><sup>o</sup>C</span></div>
          <div className="text-xl">{weatherData?.weather?.description}</div>
          <div><img className="md:w-[60px] md:h-[60px] w-full h-full" src={`https://www.weatherbit.io/static/img/icons/${weatherData?.weather?.icon}.png`}></img></div>
        </div>
      </div>
      <div className="w-full">
        <table className="table-auto">
          <thead>
            <tr>
              <td className="m-2 p-1 text-center">Date</td>
              <td className="m-2 p-1 text-center">Temperature</td>
              <td className="m-2 p-1 text-center">Weather</td>
            </tr>
          </thead>
          <tbody>
            {foreCast?.slice(0,6).map((item, index)=>{
              return <tr key={index}>
                <td className="m-2 text-center">{item.datetime}</td>
                <td className="m-2 text-center">{item.temp}</td>
                <td className="flex flex-row justify-around m-2 md:text-center text-ellipsis"><img alt={item?.weather.description} width="60" height="60" src={`https://www.weatherbit.io/static/img/icons/${item?.weather?.icon}.png`} /><div className="text-center">{item.weather.description}</div></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
