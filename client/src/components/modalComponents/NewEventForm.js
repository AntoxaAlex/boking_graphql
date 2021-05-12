import React from 'react';

const NewEventForm = ({inputData}) => {

    const {
        type,
        title,
        imageUrl,
        description,
        price,
        date
    } = inputData

    return (
        <form className="ui form" onSubmit={(e)=>inputData.submitForm(e)}>
            <div style={{textAlign: "center"}}>
                <h2>{type === "newEvent" ? "Create new" : "Edit " + title} event</h2>
            </div>
            <div className="field">
                <label htmlFor="title">Title</label>
                <input type="text" autoComplete="off" id="title" name="title" value={title} onChange={(e)=>inputData.changeValue(e)} autoFocus="autofocus"/>
            </div>
            <div className="field">
                <label htmlFor="imageUrl">Image url</label>
                <input type="text" autoComplete="off" id="imageUrl" name="imageUrl" value={imageUrl} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="field">
                <label htmlFor="description">Description</label>
                <textarea autoComplete="off" id="description" name="description" value={description} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="field">
                <label htmlFor="price">Price</label>
                <input type="number" autoComplete="off" id="price" name="price" value={price} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="field">
                <label htmlFor="date">Date</label>
                <input type="date" autoComplete="off" id="date" name="date" value={date} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="sbmtBtmDiv">
                <button className="ui blue basic button" type="submit">Confirm</button>
            </div>
        </form>
    );
};

export default NewEventForm;
