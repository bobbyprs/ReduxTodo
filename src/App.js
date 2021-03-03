import React from "react";
import "./styles.css";
import Header from "./components/header";
import { Route, Switch } from "react-router-dom";
import TodosList from "./components/TodosList";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import visibilityFilter from "./components/visibilityFilter";
import Error from "./components/Error";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }
  handleError = (val) => {
    this.setState({ error: val });
  };
  render() {
    return (
      <div className="App">
        {!this.state.error && <Header />}
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/todolist" component={TodosList} />
          <Route exact path="/visibilityfilter" component={visibilityFilter} />
          <Route exact path="/logout" component={Logout} />
          <Route
            render={(props) => (
              <Error {...props} handleError={this.handleError} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
