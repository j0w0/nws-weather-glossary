import { useState, useContext } from "react";
import { useWeatherGlossary } from "../../hooks/useWeatherGlossary";
import {
  ThemeContext,
  ThemeDispatchContext,
} from "../../context/ThemeProvider";

function App() {
  const theme = useContext(ThemeContext);
  const themeDispatch = useContext(ThemeDispatchContext);

  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const themeMode = theme === "light" ? `Dark` : `Light`;
  const iconClass = theme === "light" ? `fa-moon` : `fa-sun`;

  let glossary = useWeatherGlossary();

  // filter by search term
  glossary = glossary.filter((item, idx) => {
    const lowerCaseTerm = item.term.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (lowerCaseTerm.indexOf(lowerCaseSearchTerm) !== -1) return item;
  });

  // show first 10, or show all
  glossary = glossary.filter((item, idx) => {
    if (idx < 10 || showAll) return item;
  });

  const handleShowAllClick = () => setShowAll(!showAll);
  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleThemeChange = () => {
    themeDispatch({
      type: "changedTheme",
      theme: theme === "light" ? "dark" : "light",
    });
  };

  return (
    <div id="App" className={theme}>
      <div className="container py-3">
        <header className="site__header d-sm-flex justify-content-sm-between align-items-sm-center">
          <div>
            <h1 className="mb-0">Weather Glossary</h1>
            <p className="mt-0">from the National Weather Service API</p>
          </div>

          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={handleThemeChange}
          >
            {themeMode} Mode{" "}
            <span key={`fa-regular-${iconClass}`}>
              <i className={`fa-regular ${iconClass}`}></i>
            </span>
          </button>
        </header>

        <div className="form-row">
          <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                name="search"
                value={searchTerm}
                placeholder="Filter weather terms"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {glossary ? (
          <ol>
            {glossary.map(({ term, definition }, idx) => {
              return (
                <li key={`${term}-${idx}`}>
                  <strong>{term}</strong>
                  <br />
                  {definition}
                </li>
              );
            })}
          </ol>
        ) : (
          <>Loading...</>
        )}

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleShowAllClick}
        >
          {showAll ? "Hide" : "Show All"}
        </button>
      </div>
    </div>
  );
}

export default App;
