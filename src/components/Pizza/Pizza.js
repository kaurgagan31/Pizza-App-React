import React from 'react';

import classes from './Pizza.module.css';

const pizza = (props) => {
    
    return (<div className={classes.Pizza}>
        <div><img className={classes.Image} src={require((`../../assets/${props.src}`))} alt=" Pizza "></img></div>
        <div className={classes.Content}>
            <h3>{props.name}</h3>
            <p className={classes.Price}>Price: {props.price} $</p>
        </div>
        <div className={classes.Content}>
            <div><h3> Select Size</h3></div>
            <select onChange={(event) => props.sizeHandler(event)}>
                <option value="Regular" >Regular</option>
                <option value="Medium" >Medium</option>
            </select>
        </div>
        <div className={classes.Content}>
            <div><h3> Select Crust</h3></div>
            <select onChange={(event) => props.crustHandler(event)}>
                <option value="New Hand Tossed" >New Hand Tossed</option>
                <option value="Cheese Burst" >Cheese Burst</option>
            </select>

        </div>
        <div className={classes.Customise} onClick={() => props.customiseItem(props.code)}>
            <button>Customise</button>
        </div>
        {props.items.find(o => o.name === props.name) !== undefined ?
            <div className={classes.ItemQty}> Added To Cart </div> :
            <button onClick={() => props.added(props.label)} className={classes.AddButton}>Add to Cart</button>}
    </div>);
};
export default pizza;
