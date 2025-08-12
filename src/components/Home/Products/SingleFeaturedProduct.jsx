import { FaRegComment } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router"; // Use 'react-router-dom' for correct behavior

import { BiSolidUpvote } from "react-icons/bi";
import useAuth from "../../../hooks/useAuth";
import useUpvote from "../../../hooks/useUpvote";
import useUpvoteStatus from "../../../hooks/useUpvoteStatus";


const SingleFeaturedProduct = ({ product, refetch, showTrendingBadge }) => {

  const { user } = useAuth()
  const { state } = useLocation();




  const {
    _id,
    name,
    status,
    tagline,
    description,
    creator_email,
    thumbnail,
    tags = [],
  } = product;



  const { upvoteProduct, isUpvoting } = useUpvote(refetch)

  const navigate = useNavigate()


  const { data, isloading } = useUpvoteStatus(_id)


  const handleUpvote = async () => {
    if (!user) {
      navigate('/login', { state: { fromUpvote: _id } })
      return
    }

    try {

      await upvoteProduct(_id)

    } catch (error) {

      console.error('Error handling upvote:', error);
    }



  }



  return (
    // <Link to={`/products/${_id}`}>
    <li className=" rounded-xl p-4 shadow-sm hover:shadow-md transition  flex flex-col gap-3 h-full">
      {/* Thumbnail & name */}
      <div className="flex items-center gap-3">
        <img
          className="w-12 h-12 rounded-lg object-cover"
          src={product?.logo || thumbnail}
          alt={`${name} logo`}
        />
        <div>
          <h3 className="text-base font-semibold">{name}
            {status === 'featured' && (
              <div className="badge badge-soft badge-primary ml-2">
                featured
              </div>
            )}
            {showTrendingBadge && (
              <div className="badge badge-soft badge-primary ml-2">
                trending
              </div>
            )}



          </h3>
          <p className="text-xs uppercase text-gray-500">{tagline}</p>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs mt-2">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 px-2 py-1 rounded-full text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-sm  line-clamp-3">{description}</p>

      {/* Bottom actions */}
      <div className="flex items-center justify-between mt-auto pt-2 text-sm  text-gray-500">
        <button disabled={user?.email === creator_email} onClick={() => handleUpvote(_id)} className={`flex btn items-center gap-2 ${data?.hasUpvoted ? 'bg-blue-400 text-white' : ''}`}>
          <BiSolidUpvote /> {data?.hasUpvoted ? 'Upvoted' : 'Upvote'} {data?.totalUpvotes}

        </button>

        <Link to={`/products/${_id}`}>

          <button className="btn"> Details</button>
        </Link>


        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          {/* <span>{votes.length}</span> */}
        </div>
      </div>
    </li>
    // </Link>
  );
};

export default SingleFeaturedProduct;