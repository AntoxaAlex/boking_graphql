import React from 'react';

const NewEventForm = ({inputData}) => {
    return (
        <form className="ui form" onSubmit={(e)=>inputData.submitForm(e)}>
            <div className="field">
                <label htmlFor="title">Title</label>
                <input type="text" autoComplete="off" id="title" name="title" value={inputData.title} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="field">
                <label htmlFor="imageUrl">Image url</label>
                <input type="text" autoComplete="off" id="imageUrl" name="imageUrl" value={inputData.imageUrl} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="field">
                <label htmlFor="description">Description</label>
                <input type="text" autoComplete="off" id="description" name="description" value={inputData.description} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="field">
                <label htmlFor="price">Price</label>
                <input type="number" autoComplete="off" id="price" name="price" value={inputData.price} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="field">
                <label htmlFor="date">Date</label>
                <input type="date" autoComplete="off" id="date" name="date" value={inputData.date} onChange={(e)=>inputData.changeValue(e)}/>
            </div>
            <div className="sbmtBtmDiv">
                <button className="ui blue basic button" type="submit">Confirm</button>
            </div>
        </form>
    );
};

export default NewEventForm;
