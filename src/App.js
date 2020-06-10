import React, {Component} from 'react';
import './App.css';
import { apiURL } from './index';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import TextField from './components/TextField/TextField';
import Results from './components/Results/Results';
import UserInfo from './components/UserInfo/UserInfo';

const initialState = {
  route: 'login',
  isSigned:false,
  user: {
    name: '',
    username: '',
    tokens: ''
    },
  text1: '',
  text2: '',
  similarity: '',
  errorMessage: '',
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = initialState;
  }

  onRouteChange = (route) => {
    if (route === 'home') this.setState({isSigned: true})
    if (route === 'login') this.setState(initialState);

    this.setState({route: route})
  }

  errorDetected = (error) => {
    this.setState({errorMessage: error})
  }

  loadUser = (data) => {
    this.setState({
      user: {
        name: data.name,
        username: data.username,
        tokens: data.tokens
      }
    })
  }

  getTextFieldInput = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
 
  onCompareClick = () => {
    fetch(`${apiURL}/detect`, {
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.user.username,
        text1: this.state.text1,
        text2: this.state.text2,
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.Message){
      this.setState({similarity: data.Message})
      
      fetch(`${apiURL}/tokenCount`,{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: this.state.user.username })
      })
      .then(response => response.json())
      .then( data => this.setState(Object.assign(this.state.user, {tokens: data.payload})))

      }
    })
   

    
  }


  renderSwitch = (route) => {
    switch (route) {
      default:
        return ( <p>Error Loading Page</p>)

      case 'login':
        return (<Login onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} errorDetected={this.errorDetected}/>)
      
      case 'register':
        return (<Register onRouteChange = {this.onRouteChange} loadUser={this.loadUser}/>)


      case 'home':
        return (
          <div>
            
            <div className="nav">
              <Navigation onRouteChange={this.onRouteChange}/>
            </div>
            <div>
              <UserInfo user={this.state.user.name} tokens={this.state.user.tokens}/>
            </div>
            <div className="cf pa4 center">
              <div className="fl w-50 bg-near-white tc">
              <TextField field={1} textInput={this.getTextFieldInput}/>
              </div>
              <div className="fl w-50 bg-light-gray tc">
                <TextField field={2} textInput={this.getTextFieldInput}/>
              </div>
            </div>
            <div className='results'>
              <Results compare={this.onCompareClick} similarity={this.state.similarity}/>
            </div>
          </div>
        )
    }
  }


  render(){
    return (
      <div className="App">
       {this.renderSwitch(this.state.route)}
       { this.state.errorMessage ? <h3 className="error"> { this.state.errorMessage } </h3> : null}
      </div>
    )
  }
}


export default App;
