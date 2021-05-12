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
        let firstname;
        let secondname;
        let email;
        let password;
        if(this.state.isLogin){
            email = this.emailEl.current.value;
            password = this.passwordEl.current.value;
            if(email.trim().length === 0 || password.trim().length === 0){
                return;
            }
            requestBody = {
                query: loginQuery(),
                variables: {
                    email,
                    password
                }
            }
        }else {
            firstname = this.firstnameEl.current.value;
            secondname = this.secondnameEl.current.value;
            email = this.emailEl.current.value;
            password = this.passwordEl.current.value;
            if((this.state.isLogin || email.trim().length === 0 || password.trim().length === 0 || firstname.trim().length === 0|| secondname.trim().length === 0)){
                return;
            }
            requestBody = {
                query: registerQuery(),
                variables: {
                    firstname,
                    secondname,
                    email,
                    password
                }
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
            localStorage.setItem("token",resData.data.register.token)
            localStorage.setItem("userId",resData.data.register.userId)
            localStorage.setItem("tokenExpiration",resData.data.register.tokenExpiration)
            this.context.login(resData.data.register.token,resData.data.register.userId,resData.data.register.tokenExpiration)
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div className="container main_container">
                <div className="authForm ui container">
                    <form className="ui form" onSubmit={this.submitHandler}>
                        <h1 className="customHeader">{this.state.isLogin ? "Sign in" : "Sign up"}</h1>
                        <div id="authRow">
                            {!this.state.isLogin ? (<div className="firstAuthColumn">
                                <div className="field">
                                    <label htmlFor="firstNameInput">First name</label>
                                    <input type="text" autoComplete="off" id="firstNameInput" ref={this.firstnameEl} autoFocus="autofocus"/>
                                </div>
                                <div className="field">
                                    <label htmlFor="secondNameInput">Second name</label>
                                    <input type="text" autoComplete="off" id="secondNameInput" ref={this.secondnameEl}/>
                                </div>
                            </div>) : null}
                            <div className="secondAuthColumn">
                                <div className="field">
                                    <label htmlFor="emailInput">Email</label>
                                    <input type="email" autoComplete="off" id="emailInput" ref={this.emailEl}  autoFocus="autofocus"/>
                                </div>
                                <div className="field ui">
                                    <label htmlFor="passwordInput">Password</label>
                                    <input type="password" id="passwordInput" ref={this.passwordEl}/>
                                </div>
                            </div>
                        </div>
                        <div className="field" style={{textAlign: "center"}}>
                            {this.state.isLogin ? (<Fragment>
                                <p>Don't have account?
                                    <button
                                        className="transparentBtn"
                                        type="button"
                                        onClick={this.switchModelHandler}
                                    >Sign up</button>
                                </p>
                            </Fragment>) : (<p>Have account?
                                <button
                                    className="transparentBtn"
                                    type="button"
                                    onClick={this.switchModelHandler}
                                >Sign in</button>
                            </p>)}
                        </div>
                        <div className="field" style={{textAlign:"center"}}>
                            <button type="submit" className="ui blue basic button" >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;
