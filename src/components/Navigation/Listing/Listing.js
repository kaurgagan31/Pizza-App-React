import React, { Component } from 'react';

import classes from './Listing.module.css';
import Cart from '../Cart/Cart';
import data from '../../../json/pizzaList';
import Pizza from '../../Pizza/Pizza';
import Modal from '../../Modal/Modal';

const pizzas = data.pizzas;

class Listing extends Component {

    state = {
        cartItems: [],
        customiseData: [],
        modalToggle: false
    }

    componentDidMount() {
    }

    addToCartHandler = (index) => {
        const pizza = {
            ...pizzas
        };
        const pizzaValue = pizza[index];
        this.setState({
            cartItems: [...this.state.cartItems, pizzaValue]
        });
    }
    addQuantityHandler = (item) => {
        let qty = item.qty;
        let data = this.state.cartItems.findIndex(o => o.key === item.key);
        let cartItem = [...this.state.cartItems];
        if (data > -1) {
            cartItem[data].qty = qty + 1;
            cartItem[data].price = (qty + 1) * item.base;
        }
        this.setState({
            cartItems: cartItem
        });
    }

    removeQuantityHandler = (item) => {
        if (item.qty === 1) {
            let data = this.state.cartItems.findIndex(o => o.key === item.key);
            let cartItem = [...this.state.cartItems];
            if (data > -1) {
                cartItem.splice(data, 1);
            }
            this.setState({
                cartItems: cartItem
            });
        } else {
            let qty = item.qty;
            let data = this.state.cartItems.findIndex(o => o.key === item.key);
            let cartItem = [...this.state.cartItems];
            if (data > -1) {
                cartItem[data].qty = qty - 1;
                cartItem[data].price = item.price - item.base;
            }
            this.setState({
                cartItems: cartItem
            });
        }

    }

    CustomiseItemHandler = (e) => {
        let customDataIndex = pizzas.findIndex(o => o.key === e);
        const pizzaValue = pizzas[customDataIndex];
        this.setState({
            modalToggle: true
        })
        this.setState({
            customiseData: [...this.state.customiseData, pizzaValue]
        });
    }

    modalHandler = (e) => {
        e.preventDefault();
        this.setState({
          modalToggle: !this.state.modalToggle
        })
        this.setState({
            customiseData: []
        });
      }


    render() {
        return (
            <div >
                <div className={classes.Listing}>
                    <h3>Best Sellers</h3>
                    <hr />
                    {
                        pizzas.map((pizza, index) => (
                            <Pizza
                                key={index}
                                label={index}
                                name={pizza.name}
                                code={pizza.key}
                                price={pizza.price}
                                image={pizza.src}
                                items={this.state.cartItems}
                                added={this.addToCartHandler}
                                customiseItem={this.CustomiseItemHandler}
                                removedQty={this.removeQuantityHandler}
                                addedQty={this.addQuantityHandler}
                            />
                        ))
                    }
                    <Modal
                    show={this.state.modalToggle} 
                    modalClosed={this.modalHandler}
                    data = {this.state.customiseData}
                    />

                </div>
                <div>
                    <Cart
                        items={this.state.cartItems}
                        removedQty={this.removeQuantityHandler}
                        addedQty={this.addQuantityHandler}
                    />
                </div>
            </div>
        );
    }

}

export default Listing;
