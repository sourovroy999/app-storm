import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SingleUser = ({user, refetch}) => {

  const{email, name, photoURL, role}=user
  const axiosSecure=useAxiosSecure()

  const{mutateAsync}=useMutation({
    mutationFn:async (roleData)=>{
      console.log(roleData);
      
      const{data}=await axiosSecure.patch(`/update-role/${email}`, roleData)
      console.log(data);
      
      return data
    },
    onSuccess:()=>{
      toast.success('user updated')
      refetch()
    },
    onError:(err)=>{
      console.log(err);
      
    }

  })



  const handleStatus=async(newRole)=>{
    console.log('hi', newRole);
    const roleData={
      role: newRole
    }
      await mutateAsync(roleData)


    // try {
    //   // await axiosSecure.patch(`/update-role/${email}`, {role: newRole})
    //   // refetch()
    // } catch (error) {
    //   //
    //   console.log(error);
      
      
    // }

    
  }

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
        <td>
 <select onChange={(e)=>handleStatus(e.target.value)} defaultValue={role} className="select">
  {/* <option disabled={true}>Select A role</option> */}
  <option>moderator</option>
  <option>admin</option>
  <option>guest</option>
</select>         

        </td>
      </tr>
            
        </>
    );
};

export default SingleUser;