import React from 'react';

import classes from './Cart.module.css';

const cart = (props) => {
    let sum = 0;
    return (
        <div className={classes.Cart}>
            <h4 className={classes.title}>Your Cart</h4>
            {props.items.length >= 1 ?
                <div> {props.items.map((item, key) => {
                    return (
                        <div className={classes.OuterItem} key={key}>
                            <img className={classes.Image} src={require((`../../../assets/${item.src}`))} alt=" Pizza "></img> <span className={classes.ItemName}>{item.name}</span>
                            <div className={classes.Type}>
                                <h6> Size: {item.size}</h6>
                                <h6> Crust: {item.crust}</h6>
                                <h6> Toppings: {item.toppings}</h6>
                            </div>
                            <div>
                                <button onClick={() => props.removedQty(item)} className={classes.RemoveButton}> - </button>
                                <span className={classes.Qty}>{item.qty}</span>
                                <button onClick={() => props.addedQty(item)} className={classes.AddButton}> + </button>
                            </div>
                            <p className={classes.ItemPrice}>Price: {item.price} $</p>
                        </div>
                    );
                })}
                    <p className={classes.SubTotal}>Subtotal :  {
                        props.items.map((item, key) => {
                            sum += parseInt(item.price);
                            if (props.items.length === key + 1) {
                                return sum;
                            }
                        })} $
                    </p>
                </div>
                : 'YOUR CART IS EMPTY......'}
        </div>);
}

export default cart;
