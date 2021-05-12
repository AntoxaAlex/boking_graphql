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
            return{...prev,isModalOpened:{...prev.isModalOpened, [name]:false},newEvent:{
                    id:"",
                    title: "",
                    imageUrl: "",
                    description: "",
                    price: 0,
                    date: ""
                }}
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
        const title = this.state.newEvent.title;
        const description = this.state.newEvent.description;
        const imageUrl = this.state.newEvent.imageUrl;
        const price = parseFloat(this.state.newEvent.price);
        const date = this.state.newEvent.date;

        console.log(typeof price)

        e.preventDefault();
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: createEvent(),
                variables: {
                    title,
                    description,
                    imageUrl,
                    price,
                    date
                }
            }),
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ this.context.token
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error("Failed")
            }
            if(this.state.isComponentActive){
                this.getAllEvents();
                this.setState(prev=>{
                    return{...prev,isModalOpened:{...prev.isModalOpened, newEvent:false},newEvent:{
                            id:"",
                            title: "",
                            imageUrl: "",
                            description: "",
                            price: 0,
                            date: ""
                        }}
                })
            }
        }).then(resData=>{
            console.log(resData.data)
            if(this.state.isComponentActive){
                this.getAllEvents()
            }
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    submitChanges = (e) => {
        const id = this.state.newEvent.id;
        const title = this.state.newEvent.title;
        const description = this.state.newEvent.description;
        const imageUrl = this.state.newEvent.imageUrl;
        const price = parseFloat(this.state.newEvent.price);
        const date = this.state.newEvent.date;
        e.preventDefault();
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: editEvent(),
                variables: {
                    id,
                    title,
                    imageUrl,
                    description,
                    price,
                    date
                }
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
                    return{...prev,events:resData.data.editEvent,isModalOpened:{...prev.isModalOpened,editEvent:false},newEvent:{
                            id:"",
                            title: "",
                            imageUrl: "",
                            description: "",
                            price: 0,
                            date: ""
                        }}
                    })
                    this.getAllEvents()
                }
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    bookingEvent = (id) => {
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: bookEvent(),
                variables: {
                    id
                }
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
                this.getAllEvents()
            }
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    cancelYourBooking = (id) => {
        fetch("http://localhost:4000/graphql",{
            method:"POST",
            body:JSON.stringify({
                query: cancelBooking(),
                variables: {
                    id
                }
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
                this.getAllEvents()
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
                query: removeEvent(),
                variables: {
                    id
                }
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
            if(this.state.isComponentActive) {
                this.setState(prev => {
                    return {...prev, events: resData.data.deleteEvent}
                })
            }
            this.getAllEvents()
        }).catch(err=>{
            if(this.state.isComponentActive) console.log(err)
        })
    }

    render() {
        return (
            <div className="container main_container">
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
                                                type: "newEvent",
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
                                                type: "editEvent",
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
                                </Fragment>
                            )
                        }
                    }}
                </AuthContext.Consumer>
                <div id="eventsGrid" className="ui stackable four column grid">
                    {this.state.events.length >0 && this.state.events.map(event=>{
                        return(
                            <div key={event._id} className="column">
                                <div className="ui card centered">
                                    <div className="ui slide masked reveal image">
                                        <img alt="" src={event.imageUrl}/>
                                    </div>
                                    <div className="content">
                                        <div style={{textAlign:"center"}}>
                                            <button className="header-button" type="button" onClick={()=>this.showEvent(event)}><h3>{event.title}</h3></button>
                                        </div>
                                        <div className="meta">
                                            <span className="date">Date: {event.date}</span>
                                        </div>
                                        <div className="description">
                                            {event.description.length > 100 ? event.description.slice(0,100) + "..." : event.description}
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        <span className="right floated">
                                            <div className="ui labeled button" tabIndex="0">
                                                {this.context.userId !== event.creator._id && this.context.token && <Fragment>
                                                    {event.bookings.filter(booking=>this.context.userId === booking.user._id).length > 0 ?
                                                        <div className="ui red button" onClick={()=>this.cancelYourBooking(event._id)}>Cancel</div>:
                                                            <div className="ui green button" onClick={()=>this.bookingEvent(event._id)}>Book</div>
                                                            }
                                                </Fragment>}
                                                <p className="ui basic green left pointing label">
                                                    {event.bookings.length}
                                                </p>
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
                <div className="newEventBtnDiv">
                    <div className="newEventBtnDiv">
                        <button
                            className="transparentBtn"
                            type="button"
                            onClick={()=>this.openModal("newEvent")}
                        >
                            Create your event
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events;