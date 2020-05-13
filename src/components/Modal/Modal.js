import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';

const modal = props => {
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
                              
                                <p className={classes.ItemPrice}>Price: {item.price} $</p>
                            </div>
                            );
                        })} 
                    </div>

        </div>
    </Aux>
    );
};


export default modal;