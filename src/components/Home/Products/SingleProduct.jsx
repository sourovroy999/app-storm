
import { FaRegComment } from "react-icons/fa6";
import { Link } from "react-router";

const SingleProduct = ({product}) => {
    const {
  _id,
  // name,
  tagline,
  // description,
  // thumbnail,
  // screenshots,
  tags,
  // launchDate,
  // maker: { name: makerName, avatar: makerAvatar },
  // votes,
  // comments
} = product;

    return (
        <>
        <Link to={`/products/${_id}`}>
              <li  className="list-row hover:bg-base-200">

    <div><img className="size-10 rounded-box" src={product?.logo}/></div>
    <div>
      <div>{product?.name}</div>
      <div className="text-xs uppercase font-semibold opacity-60">{tagline}</div>
      {/* tags */}
      <div className="flex gap-2 my-2">
        {
            tags.map(tag=><p>{tag}</p>)
        }
      </div>
    </div>
    <button className="btn btn-square btn-ghost">
    <FaRegComment className="size-[1.2em]"/>

    </button>
    <button className="btn btn-square btn-ghost">
      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
    </button>

    
  </li>
  </Link>

        </>
    );
};

export default SingleProduct;