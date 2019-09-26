import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  // state = { isSignIn: null}; //not needed because we transfer to redux

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: `714327066497-di56q657b3oike8d98opknspim3f7629.apps.googleusercontent.com`,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance(); //this will cause the pop up
        // this.setState({isSignIn: this.auth.isSignedIn.get()});
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    }); 
  }

  onAuthChange = (isSignedIn) => {
    // this.setState({ isSignIn: this.auth.isSignedIn.get()})
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  renderAuth () {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignIn} className="ui green google button">
          <i className="google icon" />
            Sign In with Google
        </button>
      )
    }
  }

  render () {
    return (
      <div>{this.renderAuth()}</div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);