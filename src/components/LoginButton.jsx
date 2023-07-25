import React from 'react';

const LoginButton = () => {
    let client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    let scope = "playlist-modify-private";
    let redirect_uri = "http://localhost:3000";

    let spotify_url = "https://accounts.spotify.com/authorize";
    spotify_url += "?response_type=token";
    spotify_url += "&client_id=" + encodeURIComponent(client_id);
    spotify_url += "&scope=" + encodeURIComponent(scope);
    spotify_url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

    return <a href={spotify_url} className='login-btn'>LOG IN WITH SPOTIFY</a>;
}

export default LoginButton