import { useState } from "react";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const searchWeather = async () => {
        try {
            if (city.trim() === "") {
                return;
            }
            setError("")
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83642865d215147fd3f3ab73cc439da8&units=metric`);
            const data = await response.json();
            if(data.cod === "404"){
                setError("City not found");
                setWeather(null);
                return ;
            }
            setWeather(data);
        }
        catch(error){
            setError("Something went wrong");
            setWeather(null);
        }
    }

    return (
        <div>
            <h1>Weather App</h1>
            <input type="text" placeholder="Search City" value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { searchWeather() } }} />
            <button onClick={searchWeather}>Search</button>

            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <h3>{weather.main.temp}</h3>
                    <p>Feels Like : {weather.main.feels_like}</p><br />
                    <p>Humidty : {weather.main.humidity}</p>
                    <p>Pressure : {weather.main.pressure}</p>
                </div>

            )}
            {error && (<p>{error}</p>)}
        </div>
    )
}

export default App;