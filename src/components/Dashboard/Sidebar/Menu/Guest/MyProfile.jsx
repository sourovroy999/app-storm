
import useAuth from '../../../../../hooks/useAuth';
import SubscribtionPage from './SubscribtionPage';

// delete these file later [to do--->>>>>]
import ProfileStatus from './ProfileStatus';
import MembershipStatus from '../../../../Subscription/MembershipStatus';

import useSubscription from '../../../../../hooks/useSubscription';

const MyProfile = () => {
    const{user}=useAuth()

      const { data, isLoading, isError } = useSubscription();
   if (isLoading) return <p>Loading membership...</p>;
  if (isError) return <p>Error loading membership</p>;

    return (
        <>       
        <div className='max-w-2xl flex flex-col md:flex-row mx-auto justify-between'>
            <div>

            <img src={user?.photoURL} alt="" />
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
             <div>
      <h2>
        Membership Status:{" "}
        <span style={{ color: data?.membership === "premium" ? "green" : "red" }}>
          {data?.membership || "free"}
        </span>
      </h2>
      {data?.membership === "premium" && <p>🎉 You have premium access!</p>}
    </div>


            </div>

            <div className={`${data?.membership === "premium" && 'hidden'}`}>

            <SubscribtionPage/>

            {/* <ProfileStatus email={user?.email}/> */}
            {/* <EnhancedSubscriptionPage/> */}
            {/* <CheckOutForm/> */}

            </div>
            
        </div>
        </>
    );
};

export default MyProfile;