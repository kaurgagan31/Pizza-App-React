import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';

const modal = React.memo(props => {
        return (
            <Aux>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    <div className={classes.SubTotal}>  {
                        props.data.map((item, key) => {
                            return (
                                <div className={classes.OuterItem} key={key}>
                                    <img className={classes.Image} src={require((`../../assets/${item.src}`))} alt=" Pizza "></img> <span className={classes.ItemName}>{item.name}</span>
                                    <div className={classes.Content}>
                                        <div><h3> Select Size</h3></div>
                                        <select onChange={(event) => props.sizeHandler(event)}>
                                        <option value="" >Select Size</option>
                                            <option value="Regular" >Regular</option>
                                            <option value="Medium" >Medium</option>
                                        </select>
    
                                    </div>
                                    <div className={classes.Content}>
                                        <div><h3> Select Crust</h3></div>
                                        <select onChange={(event) => props.crustHandler(event)}>
                                        <option value="" >Select Crust</option>
                                            <option value="New Hand Tossed" >New Hand Tossed</option>
                                            <option value="Cheese Burst" >Cheese Burst</option>
                                        </select>
    
                                    </div>
                                    <div className={classes.Content}>    
                                        <input type="checkbox" onChange={() => props.changedProperty('toppings', 'Yes')} /> Add Toppings @ 35 $<br />
    
                                    </div>
                                    <button onClick={() => { props.addToCartFromModal() }}>Add to Cart</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Aux>
        );
    });



export default modal;