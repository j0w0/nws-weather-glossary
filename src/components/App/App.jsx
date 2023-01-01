import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import Header from '../Header/Header';
import InputFilter from '../InputFilter/InputFilter';
import GlossaryList from '../GlossaryList/GlossaryList';

function App() {
  const theme = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (value) => setSearchTerm(value);

  return (
    <div id="App" className={theme}>
      <div className="container py-3">
        <Header />

        <InputFilter
          searchTerm={searchTerm}
          onInputChange={handleInputChange}
        />

        <GlossaryList searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;
