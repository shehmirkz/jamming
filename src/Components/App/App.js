import { render } from "@testing-library/react";
import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [
        { name: "name1", artist: "artist1", album: "album1", id: 1 },
        { name: "name2", artist: "artist2", album: "album2", id: 2 },
        { name: "name3", artist: "artist3", album: "album3", id: 3 },
      ],
      playlistName: "My Playlist",
      playListTracks: [
        {
          name: "playlistname1",
          artist: "playlistartist1",
          album: "playlistalbum1",
          id: 4,
        },
        {
          name: "playlistname2",
          artist: "playlistartist2",
          album: "playlistalbum2",
          id: 5,
        },
        {
          name: "playlistname3",
          artist: "playlistartist3",
          album: "playlistalbum3",
          id: 6,
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({
      playListTracks: tracks,
    });
  }

  removeTrack(track) {
    let tracks = this.state.playListTracks;
    tracks = track.filter((curentTrack) => curentTrack.id !== track.id);
    this.setState({
      playListTracks: tracks,
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
