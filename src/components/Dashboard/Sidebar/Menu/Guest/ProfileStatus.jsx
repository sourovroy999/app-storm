
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";


const ProfileStatus = ({ email }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (email) {
      axiosSecure.get(`/user/${email}`).then(res => setUser(res.data));
    }
  }, [email, axiosSecure]);

  if (!user) return null;

  return (
    <div>
    
      <h3>Membership: {user.membership === "premium" ? "Premium" : "Free"}</h3>
      <span>Status: {user.status === "verified" ? "Verified" : "Unverified"}</span>
    </div>
  );
};

export default ProfileStatus;