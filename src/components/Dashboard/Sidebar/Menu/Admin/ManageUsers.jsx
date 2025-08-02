import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import SingleUser from "./SingleUser";


const ManageUsers = () => {

    const axiosSecure=useAxiosSecure()

    const{data:users=[], isLoading}=useQuery({
        queryKey:['all-users'],
        queryFn:async()=>{
            const{data}=await axiosSecure.get('/users')
            return data
        },
        onError:(err)=>{
            console.log(err);
            
        }

    })

    if(isLoading){
        return <p>Loading users...</p>
    }

    console.log(users);
    


    return (
        <div>
            ManageUsers: {users?.length}

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

      {
        users.map(user=> <SingleUser key={user._id} user={user}/>)
      }
   
    </tbody>
    
   
  </table>
</div>

{/* dialogue */}
        </div>
    );
};

export default ManageUsers;