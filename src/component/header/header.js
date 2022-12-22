import React, {useEffect,useState} from 'react'
import './header.css'
function Header() {
    const [weather, setWeather] = useState([]);
    const [rightInput,setRightInput] = useState("");
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        fetch(`https://api.weatherapi.com/v1/current.json?key=19ef764b0d88464ba6a104343222212&q=${
            rightInput || 'belgium'}&aqi=no`)
        .then(res => res.json())
        .then(data => {
            setWeather(data)
            setLoading(false)
        })
    },[rightInput])
    useEffect(()=>{
        console.log(weather);
    },[weather])
  return (
    <>
    <div className='container'>
        <div className='hdrBox'>
        <input type="text" onChange={(e) => setRightInput(e.target.value)} placeholder="search here..." />
        <button onClick={() => setRightInput(rightInput)}>Get Forecast</button> 
        </div>
        {loading ? (
					<h1>Loading...</h1>
				) : weather?.location ? (
					<main className="mainBox">
						<div className="countryName">{weather.location?.name}</div>
						<div className="imgBox">
							<img src={weather.current?.condition?.icon} />
						</div>
						<p className="situation">{weather.current?.condition?.text}</p>
						<h1 className="temp_c">{weather.current?.temp_c}°</h1>
						<h3 className="dayTemp">{weather.current?.is_day}°</h3>
						<footer className="footerBox ">
							<span>wind on kph {weather.current?.wind_kph}</span>
							<span>wind on mph {weather.current?.wind_mph}</span>
						</footer>
                        </main>
				) : (
					<h1>Country is Missing</h1>
				)}
    </div>
    </>
  )
}

export default Header;