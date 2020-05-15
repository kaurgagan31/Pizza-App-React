import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';

class Modal extends Component {
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <div className={classes.SubTotal}>  {
                        this.props.data.map((item, key) => {
                            return (
                                <div className={classes.OuterItem} key={key}>
                                    <img className={classes.Image} src={require((`../../assets/${item.src}`))} alt=" Pizza "></img> <span className={classes.ItemName}>{item.name}</span>
                                    <div className={classes.Content}>
                                        <div><h3> Select Size</h3></div>
                                        <select onChange={(event) => this.props.sizeHandler(event)}>
                                        <option value="" >Select Size</option>
                                            <option value="Regular" >Regular</option>
                                            <option value="Medium" >Medium</option>
                                        </select>
    
                                    </div>
                                    <div className={classes.Content}>
                                        <div><h3> Select Crust</h3></div>
                                        <select onChange={(event) => this.props.crustHandler(event)}>
                                        <option value="" >Select Crust</option>
                                            <option value="New Hand Tossed" >New Hand Tossed</option>
                                            <option value="Cheese Burst" >Cheese Burst</option>
                                        </select>
    
                                    </div>
                                    <div className={classes.Content}>
                                        
                                        {/* <div onClick={() => this.props.changedProperty('toppings', 'Yes')} className={classes.Size}>Add Toppings @ 35 $</div> */}
    
                                        <input type="checkbox" onChange={() => this.props.changedProperty('toppings', 'Yes')} /> Add Toppings @ 35 $<br />
    
                                    </div>
                                    <button onClick={() => { this.props.addToCartFromModal() }}>Add to Cart</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Aux>
        );
    }

}


export default Modal;