import React from 'react';

import classes from './Pizza.module.css';

const pizza = (props) => (
    <div className={classes.Pizza}>
        <div><img className={classes.Image} src={require((`../../assets/${props.image}`))} alt=" Pizza "></img></div>
        <div className={classes.Content}>
            <h3>{props.name}</h3>
            <p className={classes.Price}>Price: {props.price} $</p>
    </div>
    <div className={classes.Customise} onClick={() => props.customiseItem(props.code)}>
            <button>Customise</button>
    </div>
    { props.items.find(o => o.name === props.name) !== undefined ?
          <div> {props.items.filter(o => o.name === props.name).map((item, key) => {
            return (
                <div className={classes.ItemQty} key={key}>
                    <div>
                        <button onClick={() => props.removedQty(item)} > - </button> 
                        <span className={classes.Qty}>{item.qty}</span>
                        <button onClick={() => props.addedQty(item)} > + </button>
                    </div>
                </div>
            );
        })}
        </div> :
   <button onClick={() => props.added(props.label)} className={classes.AddButton}>Add to Cart</button> }
    
    </div>
           

);

export default pizza;