import { useEffect, useState } from "react";
import countriesService from "./services/countries";

function App() {
  const [resultCountries, setResultCountries] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length > 0) {
      countriesService.filter()
        .then(response => {
          onSearch(response);
        });
    } else {
      setResultCountries([]);
    }
  }, [value]);

  const onSearch = (countries) => {
    const listCountries = countries.filter(i => 
      i.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setResultCountries(listCountries);
  };

  const handlerSearch = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const showCountry = function(e, data){
    e.preventDefault();
    setResultCountries(resultCountries.filter(i => i.cca3 === data.cca3))
  }

  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      <header>
        <form>
          <label htmlFor="inputSearch">find countries</label>
          <input 
            type="text" 
            name="inputSearch" 
            id="inputSearch" 
            placeholder="Search..." 
            onChange={handlerSearch}
          />
        </form>
          </header>
      
      {
  value.length > 0 ? (
    resultCountries.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : resultCountries.length === 1 ? (
      resultCountries.map(i => (
        <div key={i.cca3}>
          <h1>{i.name.common}</h1>
            <p>Capital {i.capital}</p>
            <p>Area {i.area}</p>
          <h2>Languages</h2>
          <ul>
            {
              Object.entries(i.languages).map(([code, lang]) =>
                <li key={code}>{lang}</li>
              )
            }
          </ul>
          <img src={i.flags.png} alt={i.flags.alt} />
        </div>
      ))
    ) : (
      resultCountries.map(i => (
        <p key={i.cca3}>{i.name.common} <button onClick={(e)=> showCountry(e, i)}>Show</button></p>
      ))
    )
  ) : null // si no hay texto, no mostramos nada
  }

    </div>
  );
}

export default App;
