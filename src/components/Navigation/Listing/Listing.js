import React, { useState, useEffect } from 'react';
import classes from './Listing.module.css';
import Cart from '../Cart/Cart';
import data from '../../../json/pizzaList';
import Pizza from '../../Pizza/Pizza';
import Modal from '../../Modal/Modal';

const pizzas = data.pizzas;
const initialCustomPizzaData = {
    key: "",
    size: "Regular",
    crust: "New Hand Tossed",
    toppings: "No"
};
const Listing = props => {

/** Initializing the useState variable */
    const [cartItems, setCartItem] = useState([]);
    const [toggleToppings, setToggleToppings] = useState(false);
    const pizzaItems = useState(pizzas)[0];
    const [customiseData, setCustomiseData] = useState([]);
    const [modalToggle, setModalToggle] = useState(false);
    const [customisePizzaData, setCustomisePizzaData] = useState(initialCustomPizzaData);
    let modalShow = null;
    
    /** Function to add pizza to cart */
    const addToCartHandler = (index) => {
        const pizza = {
            ...pizzas
        };
        const pizzaValue = pizza[index];
        const outputData = addOutputData(
            pizzaValue.name, 
            customisePizzaData.size, 
            customisePizzaData.crust,
            pizzaValue.price,
            pizzaValue.qty,
            pizzaValue.src,
            'NO',
            pizzaValue.key
             );
        setCustomisePizzaData(initialCustomPizzaData);
        setCartItem([...cartItems, outputData]);
    }

    /** Function to add pizza item quantity to cart */
    const addQuantityHandler = (item) => {
        let qty = item.qty;
        let data = cartItems.findIndex(o => o.key === item.key);
        let cartItem = [...cartItems];
        if (data > -1) {
            cartItem[data].qty = qty + 1;
            cartItem[data].price = (qty + 1) * item.price;
        }
        setCartItem(cartItem);
    }

    /** Function to remove pizza item quantity to cart */
    const removeQuantityHandler = (item) => {
        if (item.qty === 1) {
            let data = cartItems.findIndex(o => o.key === item.key);
            let cartItem = [...cartItems];
            if (data > -1) {
                cartItem.splice(data, 1);
            }
            setCartItem(cartItem);
        } else {
            let qty = item.qty;
            let data = cartItems.findIndex(o => o.key === item.key);
            let cartItem = [...cartItems];
            if (data > -1) {
                cartItem[data].qty = qty - 1;
                cartItem[data].price = item.price - ((item.price / qty) * (qty - 1));
            }
            setCartItem(cartItem);
        }
    }

    /** Function Open modal window for customisation  */
    const customiseItemHandler = (e) => {
        let customDataIndex = pizzaItems.findIndex(o => o.key === e);
        const pizzaValue = pizzaItems[customDataIndex];
        setModalToggle(true);
        setCustomiseData([...customiseData, pizzaValue]);
        setCustomisePizzaData({ ...customisePizzaData, key: e });
    }

    /** Function to add item to cart from modal window */
    const addToCartFromModalHandler = () => {
        let customData = { ...customisePizzaData };
        let item = pizzaItems.find(o => o.key === customData.key);
        let crust = item.crust;
        let customItem = crust.find(c => c.type === customData.crust);
        customItem = customItem.price;
        let priceItem = customItem.find(p => p.type === customData.size);
        let ifExistCartItem = cartItems.find(i => i.key === customisePizzaData.key);
        if (ifExistCartItem !== undefined) {
            if (ifExistCartItem.crust === customisePizzaData.crust &&
                ifExistCartItem.size === customisePizzaData.size &&
                ifExistCartItem.toppings === customisePizzaData.toppings) {
                let data = cartItems.findIndex(o => o.key === ifExistCartItem.key);
                let cartItem = [...cartItems];
                if (data > -1) {
                    cartItem[data].qty = ifExistCartItem.qty + 1;
                    cartItem[data].price = (ifExistCartItem.qty + 1) * ifExistCartItem.price;
                }
                setCartItem(cartItem);
                setCustomiseData([]);
                setModalToggle(!modalToggle);
                setCustomisePizzaData(initialCustomPizzaData);
            } else {
                let toppingsPrice = customisePizzaData.toppings !== "No" ? 35 : 0;
                const outputData = addOutputData(
                    item.name, 
                    customisePizzaData.size, 
                    customisePizzaData.crust,
                    parseInt(priceItem.value) + toppingsPrice,
                    1,
                    item.src,
                    customisePizzaData.toppings,
                    customisePizzaData.key.concat(cartItems.length)
                     );
                setCartItem([...cartItems, outputData]);
                setCustomiseData([]);
                setModalToggle(!modalToggle);
                setCustomisePizzaData(initialCustomPizzaData);
            }
        } else {
            let toppingsPrice = customisePizzaData.toppings !== "No" ? 35 : 0;
            const outputData = addOutputData(
                item.name, 
                customisePizzaData.size, 
                customisePizzaData.crust,
                parseInt(priceItem.value) + toppingsPrice,
                item.qty,
                item.src,
                customisePizzaData.toppings,
                customisePizzaData.key
                 );
            setCartItem([...cartItems, outputData]);
            setCustomiseData([]);
            setModalToggle(!modalToggle);
            setCustomisePizzaData(initialCustomPizzaData);
        }
    }

    /** Function to add/remove toppings */
    const onCustomiseHandler = (type, value) => {
        const toggleState = !toggleToppings;
        setToggleToppings(toggleState);
        setCustomisePizzaData({ ...customisePizzaData, toppings: toggleState ? 'Yes' : 'No' });
    }

    /** Function to handle size */
    const sizeHandler = (event) => {
        setCustomisePizzaData({ ...customisePizzaData, size: event.target.value });
    }

    /** Function to handle crust */
    const crustHandler = (event) => {
        setCustomisePizzaData({ ...customisePizzaData, crust: event.target.value });
    }

    /** Function to show/hide the modal */
    const modalHandler = (e) => {
        e.preventDefault();
        setModalToggle(!modalToggle);
        setCustomiseData([]);
    }

    /** Function to return the output data to add into the cart */
    const addOutputData = (name, size, crust, price, qty, src, toppings, key) => {
        let outputData = {};
        outputData['name'] = name;
        outputData['size'] = size;
        outputData['crust'] = crust;
        outputData['price'] = price;
        outputData['qty'] = qty;
        outputData['src'] = src;
        outputData['toppings'] = toppings;
        outputData['key'] = key;

        return outputData;
    }

    /** Logic to check the modal and show/hide */
    if(modalToggle === true) {
        modalShow = <Modal
        show={modalToggle}
        modalClosed={modalHandler}
        data={customiseData}
        sizeHandler={sizeHandler}
        crustHandler={crustHandler}
        addToCartFromModal={addToCartFromModalHandler}
        changedProperty={onCustomiseHandler}
    />
    }

    return (
        <div >
            <div className={classes.Listing}>
                <h3>Best Sellers</h3>
                <hr />
                {
                    pizzaItems.map((pizza, index) => (
                        <Pizza
                            key={index}
                            label={index}
                            name={pizza.name}
                            code={pizza.key}
                            price={pizza.price}
                            src={pizza.src}
                            items={cartItems}
                            added={addToCartHandler}
                            customiseItem={customiseItemHandler}
                            removedQty={removeQuantityHandler}
                            addedQty={addQuantityHandler}
                            sizeHandler={sizeHandler}
                            crustHandler={crustHandler}
                        />
                    ))
                }
               {modalShow}
            </div>
            <div>
                <Cart
                    items={cartItems}
                    removedQty={removeQuantityHandler}
                    addedQty={addQuantityHandler}
                />
            </div>
        </div>
    );
}

export default Listing;
