const container = document.querySelector(".container-2");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = `f01892d39863aadb69eee803499508a9`;
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  weatherBox.classList.remove("fadeIn");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "600px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.style.scale = "1";
        error404.style.opacity = "1";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temp");
      const description = document.querySelector(".weather-box .descrip");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "image-weather/Clear.png";
          break;

        case "Rain":
          image.src = "image-weather/Rainy.png";
          break;

        case "Snow":
          image.src = "image-weather/Snow.png";
          break;

        case "Clouds":
          image.src = "image-weather/Cloudy.png";
          break;

        case "Haze":
          image.src = "image-weather/Mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fade-in");
      weatherDetails.classList.add("fade-in");
      container.style.height = "500px";
      console.log(json);
    });
});
