import React,{Fragment} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/auth_context"

const Navbar = () => {
    return(
        <AuthContext.Consumer>
            {(context) => (
                <header>
                    <div id="main-navbar" className="ui pointing blue  top fixed small menu">
                        <div className="header item">
                            <i className="hand peace outline icon"/>
                            MyEvents
                        </div>
                        <Link className={context.token ? "active item" : "item"} to="/events">
                            Events
                        </Link>
                        <div className="right menu">
                            {context.token ? <div className="item">
                                <button className="transparentBtn" type="button" onClick={context.logout}><i className="icon sign-out"/></button>
                            </div> : (<Fragment>
                                <div className="item">
                                    <Link className="transparentBtn" to="/auth"><i className="icon sign-in"/></Link>
                                </div>
                            </Fragment>)
                            }
                        </div>

                    </div>
                </header>
            )}
        </AuthContext.Consumer>
    )
}

export default Navbar