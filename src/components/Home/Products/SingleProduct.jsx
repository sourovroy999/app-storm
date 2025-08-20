import { FaRegComment } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import useUpvote from "../../../hooks/useUpvote";
import useUpvoteStatus from "../../../hooks/useUpvoteStatus";
import useAuth from "../../../hooks/useAuth";
import { BiSolidUpvote } from "react-icons/bi";

const SingleProduct = ({product, refetch}) => {
    const {
  _id,
  name,
  tagline,
  // description,
  // thumbnail,
  // screenshots,
  tags,
  // launchDate,
  // maker: { name: makerName, avatar: makerAvatar },
  // votes,
  // comments
  logo,
  creator_email
} = product;

const navigate = useNavigate();
const {user} = useAuth();

const { upvoteProduct, isUpvoting } = useUpvote(refetch);
const { data, isloading } = useUpvoteStatus(_id);

const handleUpvote = async () => {
    if (!user) {
      navigate('/login', { state: { fromUpvote: product._id } });
      return;
    }
    try {
      await upvoteProduct(product._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <li className="flex justify-between items-start md:items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm border border-transparent dark:border-gray-700/50 bg-white dark:bg-gray-900">
        
        {/* Product info link */}
        <Link to={`/products/${_id}`} className="flex gap-4 flex-1 items-center cursor-pointer group">
          <img
            src={logo || "/placeholder-logo.png"}
            alt={name}
            className="w-16 h-16 object-cover rounded-lg   transition-all"
          />
          <div>
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {name}
            </div>
            <div className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
              {tagline}
            </div>
            <div className="flex gap-2 mt-1 flex-wrap">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full border border-blue-200 dark:border-blue-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* Buttons */}
        <div className="flex md:gap-2 mt-3 md:mt-0">
          
          {/* Comment */}
          <button className="btn btn-square btn-ghost text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
            <FaRegComment className="text-lg" />
          </button>

          {/* Upvote */}
          <button
            disabled={user?.email === creator_email}
            onClick={(e) => {
              e.stopPropagation();
              handleUpvote(_id);
            }}
            className={`flex items-center gap-2 btn px-3 py-1 font-medium transition-all rounded-2xl duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              data?.hasUpvoted
                ? "bg-blue-500 dark:bg-blue-600 text-white shadow-md hover:bg-blue-600 dark:hover:bg-blue-700"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-600"
            } transform hover:scale-105`}
          >
            <BiSolidUpvote className="text-lg" />
            {data?.totalUpvotes || 0}
          </button>

          {/* Heart / Favorite */}
          <button className="btn btn-square btn-ghost text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-colors group">
            <svg 
              className="size-[1.2em] group-hover:scale-110 transition-transform" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
            >
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </g>
            </svg>
          </button>
        </div>
      </li>
    </>
  );
};

export default SingleProduct;