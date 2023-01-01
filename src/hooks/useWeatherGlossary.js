import { useEffect, useState } from "react";
import { getWeatherGlossary } from "../api/getWeatherGlossary";

export const useWeatherGlossary = () => {
  const [glossary, setGlossary] = useState([]);

  useEffect(() => {
    let ignore = false;
    const localWeatherGlossary = localStorage.getItem("weatherGlossary");

    localWeatherGlossary
      ? setGlossary(JSON.parse(localWeatherGlossary))
      : (async function () {
          const glossaryData = await getWeatherGlossary();
          if (!ignore) {
            // remove first element (it's empty)
            glossaryData.shift();
            // set localStorage
            localStorage.setItem(
              "weatherGlossary",
              JSON.stringify(glossaryData)
            );
            // set state
            setGlossary(glossaryData);
          }
        })();

    return () => (ignore = true);
  }, []);

  return glossary;
};
