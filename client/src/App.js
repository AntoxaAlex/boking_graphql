import React, {Component, Fragment} from "react"
import {BrowserRouter as Router, Route,Redirect,Switch} from "react-router-dom"

//Stylesheets
import 'semantic-ui-css/semantic.min.css'

//Context
import AuthContext from "./context/auth_context"

//Components
import Auth from "./components/Auth";
import Events from "./components/Events";
import Navbar from "./components/Navbar";


class App extends Component{
    state = {
        token:null,
        userId:null
    }
    login = (token,userId,tokenExpiration) => {
        this.setState({
            token: token,
            userId: userId,
            tokenExpiration: tokenExpiration
        })
    }
    logout = () => {
        localStorage.clear()
        this.setState({
            token: null,
            userId: null,
            tokenExpiration: null
        })
    }

    componentDidMount() {
        if(localStorage.getItem("token") && localStorage.getItem("userId") && localStorage.getItem("tokenExpiration")){
            this.login(localStorage.getItem("token"),localStorage.getItem("userId"),localStorage.getItem("tokenExpiration"))
        }
    }

    render() {
        return (
            <Router>
                <AuthContext.Provider value={{token: this.state.token,userId:this.state.userId,tokenExpiration: null,login:this.login,logout:this.logout}}>

                    <Navbar/>
                    <Switch>
                        <Fragment>
                            {!this.state.token && <Redirect from="/" to="/auth" exact/>}
                            {this.state.token && <Redirect from="/" to="/events" exact/>}
                            {this.state.token && <Redirect from="/auth" to="/events" exact/>}
                            {!this.state.token && <Route path="/auth" component={Auth}/>}
                            <Route path="/events" component={Events}/>
                        </Fragment>
                    </Switch>
                </AuthContext.Provider>
            </Router>
        );
    }
}

export default App;
