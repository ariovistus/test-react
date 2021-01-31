import React from 'react';
import classes from './ConfirmationItem.scss'


const ConfirmationItem = props => {

    return (
        <div
            className={classes.itemWrapper}>
            <span className={classes.itemName}>
                { props.label }:
            </span>
            <span className={classes.itemValue}>
                { props.value }
            </span>
        </div>
    );
};

export default ConfirmationItem;

