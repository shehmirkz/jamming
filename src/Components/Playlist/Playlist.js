import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);

  }
  handleNameChange (event) {
    this.props.onNameChange(event.target.value);
  }


  render() {
    const { playListTracks, onRemove, } = this.props;
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
        <TrackList
          tracks={playListTracks}
          onRemove={onRemove}
          isRemoval={true}
        />
        <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
