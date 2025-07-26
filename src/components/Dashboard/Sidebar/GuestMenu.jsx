import React from 'react';
import MenuItem from './Menu/MenuItem';

const GuestMenu = () => {
    return (
        <div>
            <MenuItem label={'My Profile'} address={'my-profile'}/>
            <MenuItem label={'Add Product'} address={'add-product'}/>
            <MenuItem label={'My Products'} address={'my-products'}/>
        </div>
    );
};

export default GuestMenu;