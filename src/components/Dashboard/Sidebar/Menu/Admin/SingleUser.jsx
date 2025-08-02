import React from 'react';

const SingleUser = ({user}) => {
    const{email, name, photoURL, role}=user
    return (
        <>
        {/* row 1 */}
      <tr>
      
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={photoURL}
                  alt={name} />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
             
            </div>
          </div>
        </td>
        <td>
         {email}
          
        </td>
        <td>{role}</td>
        <th>
          <button className="btn btn-ghost btn-xs">Change Role</button>
        </th>
      </tr>
            
        </>
    );
};

export default SingleUser;