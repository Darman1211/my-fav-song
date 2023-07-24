import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [token, setToken] = useState("");

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

  const LoginButton = () => {
    let client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    let scope = "playlist-modify-private";
    let redirect_uri = "http://localhost:3000";

    console.log("client id", client_id);

    let spotify_url = "https://accounts.spotify.com/authorize";
    spotify_url += "?response_type=token";
    spotify_url += "&client_id=" + encodeURIComponent(client_id);
    spotify_url += "&scope=" + encodeURIComponent(scope);
    spotify_url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

    return <a href={spotify_url}>LOG IN WITH SPOTIFY</a>;
  };

  return (
    <div className="bg-dark_main min-h-screen">
      {token ? <a href="#">LOG OUT</a> : <LoginButton />}
    </div>
  );
}

export default App;
