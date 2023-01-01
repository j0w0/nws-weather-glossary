import { useContext } from "react";
import { ThemeContext, ThemeDispatchContext } from "../../context/ThemeProvider";

export default function Header({}) {
    const theme = useContext(ThemeContext);
    const themeDispatch = useContext(ThemeDispatchContext);

    const themeMode = theme === "light" ? `Dark` : `Light`;
    const iconClass = theme === "light" ? `fa-moon` : `fa-sun`;

    const handleThemeChange = () => {
      themeDispatch({
        type: "changedTheme",
        theme: theme === "light" ? "dark" : "light",
      });
    };

    return (
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
    )
}