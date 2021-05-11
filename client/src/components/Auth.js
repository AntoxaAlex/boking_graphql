import React,{Component,createRef,Fragment} from "react"
import {loginQuery,registerQuery} from "../queries";
import AuthContext from "../context/auth_context"

class Auth extends Component {

    state = {
        isLogin: true
    }

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.firstnameEl = createRef();
        this.secondnameEl = createRef();
        this.emailEl = createRef();
        this.passwordEl = createRef();
    }

    switchModelHandler = () => {
        this.setState(prevState=>{
            return {isLogin: !prevState.isLogin}
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let requestBody;
        let firstName;
        let secondName;
        let email;
        let password;
        if(this.state.isLogin){
            email = this.emailEl.current.value;
            password = this.passwordEl.current.value;
            if(email.trim().length === 0 || password.trim().length === 0){
                return;
            }
            requestBody = {
                query: loginQuery(email,password)
            }
        }else {
            firstName = this.firstnameEl.current.value;
            secondName = this.secondnameEl.current.value;
            email = this.emailEl.current.value;
            password = this.passwordEl.current.value;
            if((this.state.isLogin && email.trim().length === 0 || password.trim().length === 0 || firstName.trim().length === 0|| secondName.trim().length === 0)){
                return;
            }
            requestBody = {
                query: registerQuery(firstName,secondName,email,password)
            }
        }

        console.log(requestBody)
        fetch("http://localhost:4000/graphql",{
            method: "POST",
            body:JSON.stringify(requestBody),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed")
            }
            return res.json();
        }).then(resData=>{
            this.context.login(resData.data.login.token,resData.data.login.userId,resData.data.login.tokenExpiration)
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <form className="ui form" onSubmit={this.submitHandler}>
                <div className="ui container">
                    <h1 className="customHeader">{this.state.isLogin ? "Sign in" : "Sign up"}</h1>
                    {!this.state.isLogin ? (<Fragment>
                        <div className="field">
                            <label htmlFor="firstNameInput">First name</label>
                            <input type="text" autoComplete="off" id="firstNameInput" ref={this.firstnameEl}/>
                        </div>
                        <div className="field">
                            <label htmlFor="secondNameInput">Second name</label>
                            <input type="text" autoComplete="off" id="secondNameInput" ref={this.secondnameEl}/>
                        </div>
                    </Fragment>) : null}
                    <div className="field">
                        <label htmlFor="emailInput">Email</label>
                        <input type="email" autoComplete="off" id="emailInput" ref={this.emailEl}/>
                    </div>
                    <div className="field ui container">
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" id="passwordInput" ref={this.passwordEl}/>
                    </div>
                    <div className="field">
                        {this.state.isLogin ? (<Fragment>
                            <p>You don't have an account?
                                <button
                                    type="button"
                                    onClick={this.switchModelHandler}
                                >Sign up</button>
                            </p>
                        </Fragment>) : (<p>You have an account?
                            <button
                                type="button"
                                onClick={this.switchModelHandler}
                            >Sign in</button>
                        </p>)}
                    </div>
                    <div className="field">
                        <button type="submit" className="ui blue basic button" >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Auth;
