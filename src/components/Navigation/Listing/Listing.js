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
        customisePizzaData: {
            key: "",
            size: "Regular",
            crust: "New Hand Tossed",
            toppings: "No"
        },
        toggleToppings: false,
        pizzaItems: pizzas,
        customiseData: [],
        modalToggle: false
    }

    addToCartHandler = (index) => {
        const outputData = {};
        const pizza = {
            ...pizzas
        };
        const pizzaValue = pizza[index];
        outputData['name'] = pizzaValue.name;
        outputData['size'] = this.state.customisePizzaData.size;
        outputData['crust'] = this.state.customisePizzaData.crust;
        outputData['price'] = pizzaValue.price;
        outputData['qty'] = pizzaValue.qty;
        outputData['src'] = pizzaValue.src;
        outputData['toppings'] = "No";
        outputData['key'] = pizzaValue.key;
        this.setState({
            cartItems: [...this.state.cartItems, outputData],
            customisePizzaData: {
                key: "",
                size: "Regular",
                crust: "New Hand Tossed",
                toppings: "No"
            }
        });
    }
    addQuantityHandler = (item) => {
        let qty = item.qty;
        let data = this.state.cartItems.findIndex(o => o.key === item.key);
        let cartItem = [...this.state.cartItems];
        if (data > -1) {
            cartItem[data].qty = qty + 1;
            cartItem[data].price = (qty + 1) * item.price;
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
                cartItem[data].price = item.price - ((item.price / qty) * (qty - 1));
            }
            this.setState({
                cartItems: cartItem
            });
        }
    }
    CustomiseItemHandler = (e) => {
        let customDataIndex = this.state.pizzaItems.findIndex(o => o.key === e);
        const pizzaValue = this.state.pizzaItems[customDataIndex];
        this.setState({
            modalToggle: true
        })
        this.setState({
            customiseData: [...this.state.customiseData, pizzaValue]
        });
        this.setState({
            customisePizzaData: { ...this.state.customisePizzaData, key: e }
        });
    }

    addToCartFromModalHandler = () => {
        let customData = { ...this.state.customisePizzaData };
        let item = this.state.pizzaItems.find(o => o.key === customData.key);
        let crust = item.crust;
        let customItem = crust.find(c => c.type === customData.crust);
        customItem = customItem.price;
        let priceItem = customItem.find(p => p.type === customData.size);
        let ifExistCartItem = this.state.cartItems.find(i => i.key === this.state.customisePizzaData.key);
        if (ifExistCartItem !== undefined) {
            if (ifExistCartItem.crust == this.state.customisePizzaData.crust &&
                ifExistCartItem.size == this.state.customisePizzaData.size &&
                ifExistCartItem.toppings == this.state.customisePizzaData.toppings) {
                let data = this.state.cartItems.findIndex(o => o.key === ifExistCartItem.key);
                let cartItem = [...this.state.cartItems];
                if (data > -1) {
                    cartItem[data].qty = ifExistCartItem.qty + 1;
                    cartItem[data].price = (ifExistCartItem.qty + 1) * ifExistCartItem.price;
                }
                this.setState({
                    cartItems: cartItem,
                    modalToggle: !this.state.modalToggle,
                    customiseData: [],
                    customisePizzaData: {
                        key: "",
                        size: "Regular",
                        crust: "New Hand Tossed",
                        toppings: "No"
                    }
                });
            } else {
                let toppingsPrice = this.state.customisePizzaData.toppings !== "No" ? 35 : 0;
                let outputData = {};
                outputData['name'] = item.name;
                outputData['size'] = this.state.customisePizzaData.size;
                outputData['crust'] = this.state.customisePizzaData.crust;
                outputData['price'] = parseInt(priceItem.value) + toppingsPrice;
                outputData['qty'] = 1;
                outputData['src'] = item.src;
                outputData['toppings'] = this.state.customisePizzaData.toppings;
                outputData['key'] = this.state.customisePizzaData.key.concat(this.state.cartItems.length);
                this.setState({
                    cartItems: [...this.state.cartItems, outputData]
                });
                this.setState({
                    modalToggle: !this.state.modalToggle,
                    customiseData: [],
                    customisePizzaData: {
                        key: "",
                        size: "Regular",
                        crust: "New Hand Tossed",
                        toppings: "No"
                    }
                })
            }
        } else {
            let toppingsPrice = this.state.customisePizzaData.toppings !== "No" ? 35 : 0;
            let outputData = {};
            outputData['name'] = item.name;
            outputData['size'] = this.state.customisePizzaData.size;
            outputData['crust'] = this.state.customisePizzaData.crust;
            outputData['price'] = parseInt(priceItem.value) + toppingsPrice;
            outputData['qty'] = item.qty;
            outputData['src'] = item.src;
            outputData['toppings'] = this.state.customisePizzaData.toppings;
            outputData['key'] = this.state.customisePizzaData.key;
            this.setState({
                cartItems: [...this.state.cartItems, outputData]
            });
            this.setState({
                modalToggle: !this.state.modalToggle,
                customiseData: [],
                customisePizzaData: {
                    key: "",
                    size: "Regular",
                    crust: "New Hand Tossed",
                    toppings: "No"
                }
            })
        }
    }

    onCustomiseHandler = (type, value) => {
        const toggleState = !this.state.toggleToppings;
        this.setState({
            toggleToppings: toggleState,
        });
        this.setState({
            customisePizzaData: { ...this.state.customisePizzaData, [type]: toggleState ? 'Yes' : 'No' }
        });
    }

    sizeHandler = (event) => {
        let sizeValue = event.target.value;
        this.setState({
            customisePizzaData: { ...this.state.customisePizzaData, ['size']: sizeValue }
        })
    }

    crustHandler = (event) => {
        this.setState({
            customisePizzaData: { ...this.state.customisePizzaData, ['crust']: event.target.value }
        })
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
                        this.state.pizzaItems.map((pizza, index) => (
                            <Pizza
                                key={index}
                                label={index}
                                name={pizza.name}
                                code={pizza.key}
                                price={pizza.price}
                                src={pizza.src}
                                items={this.state.cartItems}
                                added={this.addToCartHandler}
                                customiseItem={this.CustomiseItemHandler}
                                removedQty={this.removeQuantityHandler}
                                addedQty={this.addQuantityHandler}
                                sizeHandler={this.sizeHandler}
                            />
                        ))
                    }
                    <Modal
                        show={this.state.modalToggle}
                        modalClosed={this.modalHandler}
                        data={this.state.customiseData}
                        sizeHandler={this.sizeHandler}
                        crustHandler={this.crustHandler}
                        addToCartFromModal={this.addToCartFromModalHandler}
                        changedProperty={this.onCustomiseHandler}
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
