import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Logout extends React.Component {
  componentDidMount() {
    this.props.logoutDetails();
  }
  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    logoutDetails: (val) => dispatch({ type: "LOGOUT_DETAILS", payload: val })
  };
};
export default connect(null, mapDispatchToProps)(Logout);
