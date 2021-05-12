import React from 'react';

const ShowEvent = ({inputData}) => {
    const{
        title,
        imageUrl,
        description,
        price,
        date,
        creator,
        bookings
    } = inputData
    return (
        <div style={{padding:"15px"}}>
            <div style={{textAlign: "center",marginBottom: "10px"}}>
                <h2>{title}</h2>
            </div>
            <div className="ui stackable two column grid showContentDiv">
                <div className="column">
                    <img src={imageUrl} alt=""/>
                </div>
                <div className="column">
                    <p>{description}</p>
                </div>
            </div>
            <div className="ui stackable two column grid showContentDiv">
                <div className="column">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center", padding:"10px"}}>
                        <h3 style={{margin:"0"}}>$ {price}</h3>
                        <h3 style={{margin:"0"}}>{date}</h3>
                    </div>
                    <ul id="bookingsList">
                        <li><i className="user green icon"/>{creator.firstname + " " + creator.secondname}</li>
                        {bookings.map(booking => {
                            return(
                                <li key={booking._id}><i className="user icon"/>{booking.user.firstname + " " + booking.user.secondname}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShowEvent;
