import React from 'react';
import { Field, reduxForm} from 'redux-form';
// import { connect } from 'react-redux';
// import { createStream } from '../../actions';

class StreamForm extends React.Component {

  renderError ({touched, error}) {
    if(touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }

    //Do some semantic ui changes to allow errors to show up
  };
  
  renderInput = ({ input, label, meta }) => { //coverts to arrow Func because of error of "this" undefined

    //meta cames from the "validate"
    return (
      <div className="form">
        <label>{label}</label>
        <input {...input} autoComplete="off"/>

        <div>{this.renderError(meta)}</div>
      </div>

      // <input
      //   onChange={formProps.input.onChange}
      //   value={formProps.input.value}
      // />
    );
  };
  
  onSubmit = (formvalues) => {
    // this.props.createStream(formvalues);
    this.props.onSubmit(formvalues);
  };
  
  render () {

    return (
      <form className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" label="Enter Title" component={this.renderInput}/>
        <Field name="description" label="Enter Description" component={this.renderInput}/>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  //errors."something" will be base on Field name
  const errors = {};

  if(!formValues.title) {
    errors.title = 'You must Enter a Title';
  }

  if (!formValues.description) {
    errors.description = 'You must Enter a Description';
  }

  return errors;
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
// export default connect(null, {
//   createStream
// })(reduxForm({
//   form: 'streamCreate',
//   validate
// })(StreamForm));