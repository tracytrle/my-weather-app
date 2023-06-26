import React, { useState, useEffect } from "react";

const api = {
  key: "21f1c642683f22afdf9f9ae7d96f1b48",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      console.log("searching");
      if (!searchCity) return;

      console.log("city: ", searchCity);
      setLoading(true);

      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        console.log("url: ", url);
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setErrMessage("");
          setWeatherInfo(
            JSON.stringify(
              `${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`
            )
          );
        } else {
          setErrMessage(data.message);
        }
      } catch (err) {
        setErrMessage(err.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setvalue of searchInput after submit
    setSearchCity(searchInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      <br />
      {loading ? (
        <div> Loading...</div>
      ) : (
        <>
          {errMessage ? (
            <div style={{ color: "red" }}> {errMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
