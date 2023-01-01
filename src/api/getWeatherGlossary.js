export const getWeatherGlossary = async () => {
  return await fetch("https://api.weather.gov/glossary")
    .then((response) => response.json())
    .then((data) => data.glossary);
};
