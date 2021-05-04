import React, { Component } from 'react'
import './App.css';
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import Login from './components/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import PrivateApp from './components/PrivateApp';




class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    console.log(authedUser)
    return (
      <Router>
        <LoadingBar />
        <div className='App'>
          {authedUser === null ?(
            <Route
              render={() => (
                <Login />
              )}
            />)
            : (
              <PrivateApp/>
            )
          }
        </div>
      </Router>

    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App);
