import { createContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext(null);
export const ThemeDispatchContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  let defaultTheme = localStorage.getItem("theme");
  if (!defaultTheme) defaultTheme = "light";
  const [theme, themeDispatch] = useReducer(themeReducer, defaultTheme);

  useEffect(() => {
    // save theme preference in localStorage
    localStorage.setItem("theme", theme);
    // add theme class to App container
    const app = document.getElementById("App");
    app.className = `theme-${theme}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={themeDispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};

export function themeReducer(theme, action) {
  switch (action.type) {
    case "changedTheme": {
      return action.theme;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
