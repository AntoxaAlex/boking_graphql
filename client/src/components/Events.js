import React,{Fragment,Component} from "react"
import Modal from "./Modal";
import NewEventForm from "./modalComponents/NewEventForm";
import ShowEvent from "./modalComponents/ShowEvent";
import AuthContext from "../context/auth_context"
import {getAllEvents,createEvent,bookEvent,cancelBooking,editEvent,removeEvent} from "../queries";

class Events extends Component{

    static contextType = AuthContext

    getAllEvents = () => {
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: getAllEvents()
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + AuthContext.token
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed")
            }
            if(this.state.isComponentActive) return res.json();
        }).then(resData=>{
            if(this.state.isComponentActive){
                this.setState(prevState=>{
                    return {
                        ...prevState,
                        events: resData.data.events
                    }
                })
            }
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err);
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            isComponentActive:false,
            isModalOpened:{
                newEvent: false,
                showEvent: false,
                editEvent:false
            },
            events:[],
            newEvent:{
                id:"",
                title: "",
                imageUrl: "",
                description: "",
                price: 0,
                date: ""
            },
            showEvent:null
        }
    }
    componentDidMount() {
        this.setState(prev=>{
            return{...prev,isComponentActive:true}
        })
        this.getAllEvents()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getAllEvents()
    }
    componentWillUnmount() {
        this.setState(prev=>{
            return{...prev,isComponentActive:false}
        })
    }


    openModal = (name) => {
        this.setState(prev=>{
            return{...prev,isModalOpened:{...prev.isModalOpened, [name]:true}}
        })
    }
    closeModal = (name) => {
        this.setState(prev=>{
            return{...prev,isModalOpened:{...prev.isModalOpened, [name]:false}}
        })
    }

    changeValue = (e) => {
        const {name,value} = e.target;
        this.setState(prevState=>{
            return{...prevState,newEvent:{
                ...prevState.newEvent,
                    [name]:value
                }}
        })
    }

    showEvent = (event) => {
        this.setState(prev=>{
            return{...prev,showEvent:event}
        })
        this.openModal("showEvent")
    }

    submitForm = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: createEvent(
                    this.state.newEvent.title,
                    this.state.newEvent.description,
                    this.state.newEvent.imageUrl,
                    this.state.newEvent.price,
                    this.state.newEvent.date
                    )
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ this.context.token
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed")
            }
            if(this.state.isComponentActive) return res.json();
        }).then(resData=>{
            if(this.state.isComponentActive){
                this.setState(prev=>{
                    return{...prev,events:resData.data.createEvent,isModalOpened:{...prev.isModalOpened, newEvent:false},newEvent:{
                            id:"",
                            title: "",
                            imageUrl: "",
                            description: "",
                            price: 0,
                            date: ""
                        }}
                })
            }
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    submitChanges = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: editEvent(
                    this.state.newEvent.id,
                    this.state.newEvent.title,
                    this.state.newEvent.imageUrl,
                    this.state.newEvent.description,
                    this.state.newEvent.price,
                    this.state.newEvent.date
                )
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ this.context.token
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed")
            }
            if(this.state.isComponentActive) return res.json();
        }).then(resData=>{
            this.setState(prev=>{
                if(this.state.isComponentActive){
                    return{...prev,events:resData.data.editEvent,isModalOpened:{...prev.isModalOpened,editEvent:false},newEvent:{
                            id:"",
                            title: "",
                            imageUrl: "",
                            description: "",
                            price: 0,
                            date: ""
                        }}
                }
            })
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    bookingEvent = (id) => {
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: bookEvent(id)
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ this.context.token
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed")
            }
            if(this.state.isComponentActive) return res.json();
        }).then(resData=>{
            if(this.state.isComponentActive){
                this.setState(prev=>{
                    return{...prev,events:resData.data.bookEvent}
                })
            }
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    cancelYourBooking = (eventId) => {
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: cancelBooking(eventId)
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ this.context.token
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed")
            }
            if(this.state.isComponentActive) return res.json();
        }).then(resData=>{
            if(this.state.isComponentActive){
                this.setState(prev=>{
                    return{...prev,events:resData.data.cancelBooking}
                })
            }
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    openEditModal = (event) => {
        const {
            title,
            imageUrl,
            description,
            price,
            date
        } = event
        this.setState(prev=>{
            return{...prev,isModalOpened:{...prev.isModalOpened,editEvent:true},newEvent:{
                    id:event._id,
                    title,
                    imageUrl,
                    description,
                    price,
                    date
                }}
        })
    }

    removeEvent = (id) => {
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: removeEvent(id)
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ this.context.token
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed")
            }
            if(this.state.isComponentActive) return res.json();
        }).then(resData=>{
            this.setState(prev=>{
                if(this.state.isComponentActive){
                    return{...prev,events:resData.data.deleteEvent}
                }
            })
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    render() {
        return (
            <Fragment>
                <AuthContext.Consumer>
                    {(context)=>{
                        if(context.token){
                            return(
                                <Fragment>
                                    {this.state.isModalOpened.newEvent &&
                                    <Modal
                                        closeModal={()=>this.closeModal("newEvent")}
                                    >
                                        <NewEventForm
                                            inputData={{
                                                title:this.state.newEvent.title,
                                                imageUrl: this.state.newEvent.imageUrl,
                                                description: this.state.newEvent.description,
                                                price: this.state.newEvent.price,
                                                date: this.state.newEvent.date,
                                                changeValue:(e)=>this.changeValue(e),
                                                submitForm: (e)=>this.submitForm(e)
                                            }}
                                        />
                                    </Modal>}
                                    {this.state.isModalOpened.editEvent &&
                                    <Modal
                                        closeModal={()=>this.closeModal("editEvent")}
                                    >
                                        <NewEventForm
                                            inputData={{
                                                title:this.state.newEvent.title,
                                                imageUrl: this.state.newEvent.imageUrl,
                                                description: this.state.newEvent.description,
                                                price: this.state.newEvent.price,
                                                date: this.state.newEvent.date,
                                                changeValue:(e)=>this.changeValue(e),
                                                submitForm: (e)=>this.submitChanges(e)
                                            }}
                                        />
                                    </Modal>}
                                    {this.state.isModalOpened.showEvent &&
                                    <Modal
                                        closeModal={()=>this.closeModal("showEvent")}
                                    >
                                        <ShowEvent
                                            inputData={{
                                               title:this.state.showEvent.title,
                                                imageUrl: this.state.showEvent.imageUrl,
                                                description: this.state.showEvent.description,
                                                price: this.state.showEvent.price,
                                                date: this.state.showEvent.date,
                                                creator: this.state.showEvent.creator,
                                                bookings:this.state.showEvent.bookings
                                            }}
                                        />
                                    </Modal>
                                    }
                                    <div className="newEventBtnDiv">
                                        <button
                                            className="newEventBtn ui green basic button"
                                            type="button"
                                            onClick={()=>this.openModal("newEvent")}
                                        >
                                            Create your event
                                        </button>
                                    </div>
                                </Fragment>
                            )
                        }
                    }}
                </AuthContext.Consumer>
                <div className="ui stackable four column grid">
                    {this.state.events.length >0 && this.state.events.map((event,i)=>{
                        return(
                            <div key={event._id} className="column">
                                <div className="ui card centered">
                                    <div className="ui slide masked reveal image">
                                        <img src={event.imageUrl}/>
                                    </div>
                                    <div className="content">
                                        <div style={{textAlign:"center"}}>
                                            <button className="header-button" type="button" onClick={()=>this.showEvent(event)}><h3>{event.title}</h3></button>
                                        </div>
                                        <div className="meta">
                                            <span className="date">Date: {event.date}</span>
                                        </div>
                                        <div className="description">
                                            {event.description}
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        <span className="right floated">
                                            <div className="ui labeled button" tabIndex="0">
                                                {this.context.userId !== event.creator._id && <Fragment>
                                                    {event.bookings.filter(booking=>this.context.userId === booking.user._id).length > 0 ?
                                                        <div className="ui red button" onClick={()=>this.cancelYourBooking(event._id)}>Cancel</div>:
                                                            <div className="ui green button" onClick={()=>this.bookingEvent(event._id)}>Book</div>
                                                            }
                                                </Fragment>}
                                                <a className="ui basic green left pointing label">
                                                    {event.bookings.length}
                                                </a>
                                            </div>
                                        </span>
                                        <span>
                                            <i className="user icon"/>
                                            {this.context.userId === event.creator._id ? <span >You are creator</span> : <Fragment>{event.creator.firstname}</Fragment>}
                                        </span>
                                    </div>
                                    {this.context.userId === event.creator._id && <div className="extra content">
                                        <div className="eventBtnsDiv">
                                            <button type="button" className="ui yellow basic button" onClick={()=>this.openEditModal(event)}>
                                                <i className="edit icon" style={{margin:"auto"}}/>
                                            </button>
                                            <button type="button" className="ui red basic button" onClick={()=>{this.removeEvent(event._id)}}>
                                                <i className="close icon" style={{margin:"auto"}}/>
                                            </button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Fragment>
        )
    }
}

export default Events;