import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {

  constructor(props) {
    super(props)
    this.videoRef = React.createRef(); //take note!!!
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
    
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount () {
    this.player.destroy();
  }

  buildPlayer() {
    const { id } = this.props.match.params;

    if (this.player || !this.props.stream) {
      return;
    }

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }
  
  render () {

    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <video ref={this.videoRef} style={{width: '100%'}} controls/>
        <h3>{this.props.stream.title}</h3>
        <h5>{this.props.stream.description}</h5>
      </div>
    )
  }
}

const mapStateToProp = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]}
}

// const StreamShow = () => {
//   return <div>StreamShow</div>
// }

export default connect(mapStateToProp, { fetchStream })(StreamShow);