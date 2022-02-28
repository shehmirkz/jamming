import React from "react";
import { TrackList } from "../Components/TrackList/TrackList";

const clientId = "9a264854382a43f2a8efb58ef0403684";
const redirectUri = "http://localhost:3000";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

    console.log(accessTokenMatch, 'checking accessTokenMatch')

    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    console.log(expiresInMatch, 'expiresInMatch')

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];

        console.log(accessToken, 'checking accessToken')

      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
         return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },

  savePlaylist (name, trackUris) {
    if(!name || !trackUris.length) {
        return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.json()
    ).then (jsonResponse => {
        userId = jsonResponse.id;
        console.log('Checking User Id', jsonResponse)

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
        {
            headers: headers,
            method: 'POST',
            body: JSON.stringify( { name: name })
        }).then(response => response.json()
        ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify( { uris: trackUris } )
            })
        })
    })
    
  }



};

export default Spotify;
