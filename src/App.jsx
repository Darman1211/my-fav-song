import { useEffect, useState } from "react";
import useStateRef from "react-usestateref";
import "./App.css";
import LoginButton from "./components/LoginButton";
import axios from "axios";
import SongList from "./components/SongList";

function App() {
  const [token, setToken] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [dataSong, setDataSong, dataSongRef] = useStateRef([]);
  const [loading, setLoading] = useState(false);

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

  const handleClick = async () => {
    try {
      setLoading(true);
      let url = 'https://api.spotify.com/v1/search?q='+querySearch+'&type=track,artist';

      await axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        },
      }).then(res => {
        setDataSong(res.data.tracks.items);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
      console.log('data song -->', dataSongRef.current);
    }
  }

  const handleClickLogout = () => {
    localStorage.clear();
    setToken("");
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
            <a className="logout-btn" onClick={() => handleClickLogout()}>LOG OUT</a>
          </div>
          {loading ? "Loading..." 
          : 
            dataSongRef.current.length < 1 ? ""
          :
            <SongList dataSong={dataSongRef.current} />
          } 
        </div>
      )}
    </>
  );
}

export default App;
