import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  render() {
    const { playListTracks, onRemove, } = this.props;
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} />
        <TrackList
          tracks={playListTracks}
          onRemove={onRemove}
          isRemoval={true}
        />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
