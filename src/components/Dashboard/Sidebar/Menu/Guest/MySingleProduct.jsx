

// import { FaRegComment } from "react-icons/fa6";
// import { Link } from "react-router";

// const MySingleProduct = ({product}) => {
//     const {
//   _id,
//   // name,
//   tagline,
//   // description,
//   // thumbnail,
//   // screenshots,
//   tags,
//   // launchDate,
//   // maker: { name: makerName, avatar: makerAvatar },
//   // votes,
//   // comments
// } = product;

//     return (
//         <>
//         <Link to={`/products/${_id}`}>
//               <li  className="list-row hover:bg-base-200">

//     <div><img className="size-10 rounded-box" src={product?.logo}/></div>
//     <div>
//       <div>{product?.name}</div>
//       <div className="text-xs uppercase font-semibold opacity-60">{tagline}</div>
//       {/* tags */}
//       <div className="flex gap-2 my-2">
//         {
//             tags.map(tag=><p>{tag}</p>)
//         }
//       </div>
//     </div>
//     <div>
//         status
//         <br />
//         {product.status}
//     </div>

    
//   </li>
//   </Link>

//         </>
//     );
// };

// export default MySingleProduct;



import React from 'react';

const MySingleProduct = ({product}) => {

        const {
  _id,
  name,
  tagline,
  // description,
  // thumbnail,
  // screenshots,
  tags,
  logo,
  status,

  // launchDate,
  // maker: { name: makerName, avatar: makerAvatar },
  // votes,
  // comments
} = product;

    return (
        <>
         <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={logo}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>

            </div>
          </div>
        </td>

        <td>
{tagline}
        </td>


        <td>{status}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
            
        </>
    );
};

export default MySingleProduct;