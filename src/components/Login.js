import React, { Component } from 'react'
import '../App.css';
import logo from '../logo.svg'
import { Container, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'


class Login extends Component {
    state = {
        value: '',
        errorMsg: '',
    }
    handleChange = (e, {value}) => {

      this.setState({value})
    }
    handleSubmit = (e) => {
      const authedUser = this.state.value
      const {dispatch} = this.props
      
      e.preventDefault()
      if(authedUser !== ''){
          dispatch(setAuthedUser(authedUser))
      }else{
        this.setState({errorMsg: 'You must Choose a Username'})

      }
    }
    render() {
        const {value} = this.state
        const {users} = this.props
        const { errorMsg} = this.state;

        return (
            <Container className='center'>
                <img src={logo} className='App-logo' alt="logo" />
                <h2>
                    Would You Rather Game
                    </h2>
                <h4>Sign In</h4>
                <p className='error'>{errorMsg}</p>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Dropdown
                          placeholder='Select user'
                          fluid
                          selection
                          options={ users.map(user => {
                            return {
                              key: user.id,
                              text: user.name,
                              value: user.id,
                              image: { avatar: true, src: user.avatarURL }
                            }
                          })}
                          onChange={this.handleChange}
                          value={value}
                      />
                      <Form.Button content='Login' positive  fluid/>
                  </Form>
            </Container>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users: Object.values(users),
    }
}

export default connect(mapStateToProps)(Login)