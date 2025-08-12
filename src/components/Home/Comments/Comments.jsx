// Comments.jsx


const Comments = ({comment}) => {



    // console.log(comment);
    const {
        userName,
        userPhoto,
        commentText,
        createdAt
    } = comment;

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

    return (
        <div 
      
            className={`p-4 rounded-lg bg-base-200 `}
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
                    <div className='mt-2'>
                        {commentText}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Comments;