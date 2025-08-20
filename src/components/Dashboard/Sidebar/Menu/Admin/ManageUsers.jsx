
import SingleUser from "./SingleUser";
import useUsers from "../../../../../hooks/moderator/useUsers";


const ManageUsers = () => {



    const{users, isLoading, refetch}=useUsers()


    if(isLoading){
        return <p>Loading users...</p>
    }

    console.log(users);
    


    return (
        <div className="md:px-32">
            {/* ManageUsers: {users?.length} */}

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Email</th>
        <th>Current Role</th>
        <th>Change Role</th>
      </tr>
    </thead>
    <tbody>

      {
        users.map(user=> <SingleUser key={user._id} user={user} refetch={refetch}/>)
      }
   
    </tbody>
    
   
  </table>
</div>

{/* dialogue */}
        </div>
    );
};

export default ManageUsers;