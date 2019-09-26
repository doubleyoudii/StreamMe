import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render () {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    // console.log(this.props);   //this comes from mapStateToProps
    return (
    <div>
      <StreamForm 
      initialValues={_.pick(this.props.stream, 'title', 'description')} //automatically because this contains title and dectription
      onSubmit={this.onSubmit}
      />
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id]}
}
//the ownProps argument (second) contains the props pass down from the ROUTER
//this contains some parameters lke the clicked id

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);