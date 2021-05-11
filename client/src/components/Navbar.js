import React,{Fragment} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/auth_context"

const Navbar = () => {
    return(
        <AuthContext.Consumer>
            {(context) => (
                <header>
                    <div className="ui pointing red menu">
                        <div className="header item">
                            MyEvents
                        </div>
                        <Link className="active item" to="/events">
                            Events
                        </Link>
                        {context.token && <Link className="item" to="/bookings">
                            Bookings
                        </Link>}
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