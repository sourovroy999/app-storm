



const SingleProductReview = ({ review }) => {
    console.log(review);
    const { userName, userPhoto, description, rating, createdAt } = review

    const date = new Date(createdAt);

    const formattedDate = date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });


    const renderStars = (rating) => {
    const maxStars = 5;
    const filledStar = "★"; // Unicode filled star
    const emptyStar = "☆"; // Unicode empty star
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-400"}
          style={{ fontSize: "16px" }}
        >
          {i <= rating ? filledStar : emptyStar}
        </span>
      );
    }
    return stars;
  };



    return (
        <div

            className={`p-4 rounded-lg bg-base-200 my-2`}
        >


            <div className='flex gap-3'>
                <img
                    className='w-8 h-8 object-cover rounded-full'
                    src={userPhoto}
                    alt={userName}
                />
                <div>
                    <p className='font-semibold '>
                        {userName}
                    </p>
                    <p className='text-xs'>{formattedDate}</p>
                    <div className="mt-1">{renderStars(rating)}</div>
                    <div className='mt-2'>
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductReview;