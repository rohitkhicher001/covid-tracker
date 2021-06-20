import "./App.css";
import { useState } from "react";

function App() {
  const [confirmedcase, setConfirmed] = useState("");
  const [status, setStatus] = useState("");
  const [death, setDeath] = useState("");
  const [recovered, setRecovered] = useState("");
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");

  async function api(search) {
    const url = "https://covid2019-api.herokuapp.com/v2/current";
    const response = await fetch(url);
    const jsonData = await response.json();
    var found = false;
    for (var i = 0; i < Object.keys(jsonData.data).length; i++) {
      // console.log(jsonData.data[i].location);
      const country = jsonData.data[i].location.toLowerCase();
      if (search === country) {
        found = true;
        if (jsonData.data[i].confirmed === 0) {
          setConfirmed("0");
        } else {
          setConfirmed(jsonData.data[i].confirmed);
        }

        if (jsonData.data[i].deaths === 0) {
          setDeath("0");
        } else {
          setDeath(jsonData.data[i].deaths);
        }

        if (jsonData.data[i].recovered === 0) {
          setRecovered("0");
        } else {
          setRecovered(jsonData.data[i].recovered);
        }

        if (jsonData.data[i].active === 0) {
          setActive("0");
        } else {
          setActive(jsonData.data[i].active);
        }

        console.log(jsonData.data[i].confirmed);
      } else {
        console.log("country not found");
      }
    }
    if (found === true) {
      setStatus("");
    } else {
      setStatus("Country not found");
      setConfirmed(null);
      setDeath(null);
      setRecovered(null);
      setActive(null);
    }
  }
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <div className="card-search">
        <div>
          <input
            className="input"
            type="text"
            onChange={handleChange}
            value={search}
          />

          <button
            className="btns btn-primary"
            onClick={() => {
              api(search);
            }}
          >
            search
          </button>
        </div>
        <div className="contents">
          {search ? <h3>{search}</h3> : <h3>Enter country name</h3>}
          {status && search ? <p>{status}</p> : <p></p>}
          {search && confirmedcase ? (
            <p>confirmed cases: {confirmedcase}</p>
          ) : (
            <p></p>
          )}
          {search && death ? <p>deaths: {death}</p> : <p></p>}
          {search && recovered ? <p>recovered: {recovered}</p> : <p></p>}
          {search && active ? <p>active: {active}</p> : <p></p>}
        </div>
      </div>
    </div>
  );
}

export default App;
