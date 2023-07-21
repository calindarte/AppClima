
import { Container} from "@mui/material";
import { useState } from "react";
import WeatherForm from "./assets/components/WeatherForm";
import WeatherInfo from "./assets/components/WeatherInfo";
import WeatherTitle from "./assets/components/WeatherTitle";
import WeatherAttribution from "./assets/components/WeatherAttribution";

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

export default function App() {
  
  const [city, setCity] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setLoading(true);

    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };

      const res = await fetch(API_WEATHER + city);
      const data = await res.json();

      if (data.error) {
        throw { message: data.error.message };
      }

      console.log(data);

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      });
    } catch (error) {
      console.log(error);
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <WeatherTitle/>
      <WeatherForm city={city} onCityChange={setCity} onSubmit={onSubmit} error={error} loading={loading} />

      {weather.city && <WeatherInfo weather={weather} />}

      <WeatherAttribution/>
    </Container>
  );
}
