document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a location!</p>";
    weatherDiv.classList.add("active");
    return;
  }

  try {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      weatherDiv.innerHTML = `<p>❌ ${data.error.message}</p>`;
      weatherDiv.classList.add("active");
      return;
    }

    const { temp_c, condition, humidity, wind_kph } = data.current;
    const { name, country } = data.location;

    // Background gradient by temperature
    const body = document.body;
    if (temp_c < 15)
      body.style.background = "linear-gradient(135deg, #cfd9df, #e2ebf0)";
    else if (temp_c < 30)
      body.style.background = "linear-gradient(135deg, #fdfbfb, #ebedee)";
    else
      body.style.background = "linear-gradient(135deg, #ffe259, #ffa751)";

    weatherDiv.innerHTML = `
      <img src="${condition.icon}" alt="Weather icon">
      <div class="temp">${temp_c}°C</div>
      <div class="condition">${condition.text}</div>
      <div class="details">
        📍 ${name}, ${country} <br>
        💧 Humidity: ${humidity}% <br>
        🌬 Wind: ${wind_kph} km/h
      </div>
    `;
    weatherDiv.classList.add("active");
  } catch (error) {
    weatherDiv.innerHTML = `<p>⚠️ Error fetching data</p>`;
    weatherDiv.classList.add("active");
  }
}
