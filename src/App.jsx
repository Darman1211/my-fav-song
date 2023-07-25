import { useEffect, useState } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [dataSong, setDataSong] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (hash && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const handleChangeInput = ({ target }) => {
    setQuerySearch(target.value);
  } 

  const handleClick = () => {
    try {
      let url = 'https://api.spotify.com/v1/search?q='+querySearch+'&type=track,artist';

      axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        },
      }).then(res => {
        setDataSong(res.data.tracks.items);
      })
    } catch (error) {
      console.log(error);
    } finally {
      console.log('data song -->', dataSong);
    }
  }

  return (
    <>
      {!token ? (
        <div className="App">
          <LoginButton />
        </div>
      ) : (
        <div className="container">
          <div className="container-top">
            <div className="container-search-song">
              <input
                type="text"
                value={querySearch}
                onChange={(e) => handleChangeInput(e)}
                placeholder="Type to search..."
              />
              <button onClick={() => handleClick()}>Search</button>
            </div>
            <a href="#" className="logout-btn">LOG OUT</a>
          </div>
          <div className="song-list">
            Song List
          </div>
        </div>
      )}
    </>
  );
}

export default App;
