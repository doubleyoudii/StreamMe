import React from 'react';
// import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  
  onSubmit = (formvalues) => {
    this.props.createStream(formvalues);
  };
  
  render () {

    return (
      <div>
        <h3>Create Stream</h3>
        <StreamForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
}


// const StreamCreate = () => {
//   return <div>StreamCreate</div>
// }

export default connect(null, {
  createStream
})(StreamCreate);