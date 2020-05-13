import React, { Component } from 'react';
import data from '../../json/pizzaList';
import Pizza from '../../components/Pizza/Pizza';

const pizzas = data.pizzas;

class PizzaListing extends Component {

    componentDidMount() {
    }

    addToCartHandler = (index) => {
        console.log(index);
        const pizza = {
            ...pizzas
        };
        const valueAtIndex1 = pizza[index];
        console.log(valueAtIndex1);
    }


    render() {
        return pizzas.map((pizza, index) => {
            return (
                <Pizza
                    key={index}
                    label={index}
                    name={pizza.name}
                    price={pizza.price}
                    image={pizza.src}
                    added={this.addToCartHandler}
                />
            );
        });
    }

}

export default PizzaListing;