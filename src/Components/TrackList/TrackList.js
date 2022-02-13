import React from "react";
import './TrackList.css';
import { Track } from "../Track/Track";


export class TrackList extends React.Component {
    render () {
        console.log(this.props.tracks, 'this.props.tracks')
        return (
            <div className="TrackList">
               {this.props?.tracks?.map?.((track, index) => {
                   return <Track track={track} key={track.id} onAdd={this.props.onAdd} />
               })}
            </div>
        )
    }
}
