import { render } from "@testing-library/react";
import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: "My Playlist",
      playListTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
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
    
    tracks = tracks.filter((curentTrack) => curentTrack.id !== track.id);
    this.setState({
      playListTracks: tracks,
    });
  }

  updatePlaylistName (name) {
    this.setState({playlistName: name});
  }

  savePlayList () {
    const trackuris = this.state.playListTracks.map(track => track.uri) 
    Spotify.savePlaylist(this.state.playlistName, trackuris).then(() => {
      this.setState({
        playlistName: 'New Play List',
        playListTracks: []
      })
    })
  }

  search(term) {
    console.log('Seacrh is being')
    Spotify.search(term).then(SearchResults => {
      this.setState({ SearchResults: SearchResults })
    })
  };



  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlayList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
