import React from 'react';
import MenuItem from '../MenuItem';

const ModeratorMenu = () => {
    return (
        <div>
            <MenuItem label={'ProductReviewQueue'} address={'product-review-queue'}/>

            <MenuItem label={'ReportedContent'} address={'reported-content'}/>
            
        </div>
    );
};

export default ModeratorMenu;