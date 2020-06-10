import React, {Component} from 'react';
import { apiURL } from '../..';
import './Register.css';


class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            errorMessage: ''
        }
    }

    onRegisterClick = () => {
        fetch(`${apiURL}/register`, {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if (data.payload.username) {
                this.props.loadUser(data.payload)
                this.props.onRouteChange('home')
            }
        })
        .catch(err => console.log(err) )
        
    }

    getInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }


    render(){
        return(
            <div className='mt6'>
            <article className="br3 b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-near-white">
            <main className="pa4 black-80">
            <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 tc">Sign Up</legend>
            
            <div className="mt3">
            <label className="db fw6 lh-copy f6">Name</label>
            <input onChange = {this.getInput}
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name"  id="name" />
            </div>

            <div className="mt3">
            <label className="db fw6 lh-copy f6">Username</label>
            <input onChange = {this.getInput}
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="username"  id="username" />
            </div>
            <div className="mt3">
            <label className="db fw6 lh-copy f6" >Email</label>
            <input onChange = {this.getInput}
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email-address" />
            </div>
            <div className="mv3">
            <label className="db fw6 lh-copy f6">Password</label>
            <input onChange = {this.getInput}
            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="">
            <input onClick={this.onRegisterClick} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
            </div>
            <div className="lh-copy mt3">
            <p onClick={() => this.props.onRouteChange('login')} className="f6 link dim black db pointer">Login</p>
            </div>
            </div>
            </main>
            </article>
            </div>
       
        )
    }

}

export default Register;