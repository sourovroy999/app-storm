
import useAuth from '../../../../../hooks/useAuth';
import SubscribtionPage from './SubscribtionPage';

import ProfileStatus from './ProfileStatus';

const MyProfile = () => {
    const{user}=useAuth()
    return (
        <>

        
        
        <div className='max-w-2xl flex flex-col md:flex-row mx-auto justify-between'>
            <div >

            <img src={user?.photoURL} alt="" />
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>

            </div>
            <div>

            <SubscribtionPage/>
            <ProfileStatus email={user?.email}/>
        

            {/* <EnhancedSubscriptionPage/> */}
            {/* <CheckOutForm/> */}
            </div>
            
        </div>
        </>
    );
};

export default MyProfile;