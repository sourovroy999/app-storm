import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Rating } from 'react-simple-star-rating';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

// Custom CSS to enforce horizontal layout and prevent blinking
const styles = `
  .rating-container {
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: center;
    gap: 4px;
  }
  .rating-container .star-svg {
    display: inline-block !important;
    margin-right: 4px;
    transition: none !important; /* Disable transitions to prevent blinking */
  }
  .rating-container .filled-icons,
  .rating-container .empty-icons {
    display: inline-block !important;
    transition: none !important; /* Disable transitions to prevent blinking */
  }
  /* Disable hover effect visually */
  .rating-container .star-svg:hover {
    transform: none !important;
    fill: currentColor !important;
  }
`;

const ReviewForm = ({productId}) => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    console.log(`Rated: ${rate}`); 
  };

  const axiosSecure=useAxiosSecure()
  const queryClient=useQueryClient();

  const postReview= async(reviewData)=>{
    const{data}=await axiosSecure.post('/submit-review', reviewData);
    return data
  }

    const {mutateAsync, isPending}=useMutation({
        mutationKey:['review-product'],
        mutationFn: postReview,
        onSuccess: ()=>{
            toast.success('Review Submitted')
                // queryClient.invalidateQueries({ queryKey: ["product-reviews", productId] });
                    queryClient.invalidateQueries(['product-reviews', productId]);


        },
        onError:()=>{
            toast.error('Failed to submit review')
        }
    })


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error('Please select a rating.');
      return;
    }
    // Add API call or other logic here
    const form=e.target
    // const description=form.description.value;
    const userName=form.userName.value;
    const email=user?.email
    const userPhoto=user?.photoURL

    // console.log(description);
    // console.log('Form submitted:', { rating, description, userName , email, userPhoto});

    const reviewData={
        productId,
        userName,
        email,
        userPhoto,
        description,
        rating
    }

    console.log(reviewData);


    try{
        await mutateAsync(reviewData)
        setDescription("");
        setRating(0)
    }catch(err){
        console.error(err)
    }
    
    
    



  };

  return (
    <div>
      {/* Inject custom CSS */}
      <style>{styles}</style>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl  p-4 rounded-md border border-gray-200 shadow-sm space-y-4 my-5"
      >
        {/* Top Section - Image & Name */}
        <div className="flex flex-row items-center gap-4">
          <img
            src={user?.photoURL || user?.photo || 'https://i.ibb.co/8pngNMR/images-2.jpg'}
            alt="reviewer avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <label className="block text-xs text-gray-500">Reviewer Name</label>
            <input
            name='userName'
              readOnly
              value={user?.displayName || user?.name || ''}
              placeholder="Your name"
              className="w-48 px-3 py-2  rounded border-gray-300 text-sm"
            />
          </div>
        </div>

        {/* Review Description */}
        <div>
          <label className="block text-xs text-gray-500">Review Description</label>
          <textarea
          name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full mt-1 px-3 py-2 rounded border border-gray-300  text-sm"
            placeholder="Write your honest review..."
          />
        </div>

        {/* Rating */}
        <div className="rating-container">
          <label className="block text-xs  mb-1">Rating</label>
          <div className="flex flex-row items-center gap-2">
            <Rating
              onClick={handleRating}
              initialValue={rating}
              iconsCount={5}
              size={30}
              fillColor="#ff9900"
              emptyColor="#cccccc"
              allowFraction={false} // Restrict to integer ratings
              allowHover={true} // Disable hover effect
              style={{ display: 'inline-flex', flexDirection: 'row' }}
              transition={false} // Disable transitions in the component
            />
            <p className="text-sm">Your rating: {rating || 'Not selected'}</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
        disabled={isPending}
          type="submit"
          className="w-full bg-blue-600  py-2 rounded hover:bg-blue-700 text-sm font-medium"
        >
          {isPending ? "Submitting..." : "Submit Review"}

        </button>
      </form>
    </div>
  );
};

export default ReviewForm;