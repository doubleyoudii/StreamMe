import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

  componentDidMount() {
    this.props.fetchStreams();
  };

  renderAdmin (stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      )
    }
  }

  renderList () {
    return this.props.streams.map((el) => {
      return (
        <div className="item" key={el.id}>
          {this.renderAdmin(el)}        
          <i className="large middle aligned icon camera"/>
          <div className="content">
            <Link to={`/streams/${el.id}`} className="header">
              {el.title}
            </Link>
            <div className="description">
              {el.description}
            </div>

          </div>
        </div>
      )
    })
  }

  renderCreate () {
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  render () {
    // console.log(this.props.streams);
    return (
      <div>
        <h2>Stream List</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
      
    )
  } 
}

const mapStateToProps = (state) => {
  //state.streams in an object therefore we need to convert it to an array
  return { 
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

// const StreamList = () => {
//   return <div>StreamList</div>
// }

export default connect(mapStateToProps, {fetchStreams})(StreamList);