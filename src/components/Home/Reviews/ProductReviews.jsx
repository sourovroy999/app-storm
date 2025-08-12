import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SingleProductReview from './SingleProductReview';

const ProductReviews = ({productId}) => {

    const axiosSecure=useAxiosSecure()

    const{data: reviewsData,isError, refetch, isLoading}=useQuery({
        queryKey:['product-reviews'],
        queryFn:async()=>{
            const {data}=await axiosSecure.get(`/product-review/${productId}`)
            
            return data
        },
       
        


    })

    if(isLoading) return <div>Loading...</div>

    console.log(reviewsData);

    const {reviews}=reviewsData;

    console.log(reviews);
    
    

    return (
        <div>
            {
                reviews.map(review=> <SingleProductReview key={review._id} review={review}/>)
            }
            
        </div>
    );
};

export default ProductReviews;