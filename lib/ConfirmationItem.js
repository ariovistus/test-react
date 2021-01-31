import React from 'react';
const classes = {
}


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

