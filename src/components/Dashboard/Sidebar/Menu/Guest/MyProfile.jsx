import useAuth from '../../../../../hooks/useAuth';
import SubscribtionPage from './SubscribtionPage';
// delete these file later [to do--->>>>>]
import ProfileStatus from './ProfileStatus';
import MembershipStatus from '../../../../Subscription/MembershipStatus';
import useSubscription from '../../../../../hooks/useSubscription';
import LoadingSpinner from '../../../../Spinner/LoadingSpinner';

const MyProfile = () => {
    const { user } = useAuth();
    const { data, isLoading, isError } = useSubscription();

    if (isLoading) return <LoadingSpinner />;
    if (isError) return (
        <div className="max-w-2xl mx-auto p-6 ">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <p className="font-medium">Error loading membership</p>
            </div>
        </div>
    );

    const isPremium = data?.membership === "premium";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 
         transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-slate-900/30 overflow-hidden border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 px-6 py-8 text-white">
                        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
                        <p className="text-blue-100 dark:text-blue-200">Manage your account and subscription</p>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Profile Information */}
                            <div className="flex-1">
                                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 border border-slate-200 dark:border-slate-600 transition-colors duration-300">
                                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">Profile Information</h2>
                                    
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                                        <div className="relative">
                                            <img 
                                                src={user?.photoURL} 
                                                alt="Profile" 
                                                className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-600 shadow-lg dark:shadow-slate-900/50"
                                            />
                                          
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-600 dark:text-slate-300 font-medium min-w-[60px]">Name:</span>
                                                    <span className="text-slate-800 dark:text-slate-100 font-semibold">{user?.displayName}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-600 dark:text-slate-300 font-medium min-w-[60px]">Email:</span>
                                                    <span className="text-slate-800 dark:text-slate-100">{user?.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Membership Status Card */}
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-600 shadow-sm dark:shadow-slate-900/20 transition-colors duration-300">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Membership Status</h3>
                                            <div className="flex items-center gap-2">
                                                <span 
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
                                                        isPremium 
                                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700' 
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                                                    }`}
                                                >
                                                    {data?.membership || "free"}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {isPremium && (
                                            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 transition-colors duration-300">
                                                <p className="text-green-800 dark:text-green-300 font-medium flex items-center gap-2">
                                                    <span className="text-xl">🎉</span>
                                                    You have premium access!
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Subscription Section */}
                            <div className={`flex-1 lg:max-w-md ${isPremium ? 'hidden' : ''}`}>
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800 transition-colors duration-300">
                                    
                                    
                                    <SubscribtionPage />
                                    {/* <ProfileStatus email={user?.email}/> */}
                                    {/* <EnhancedSubscriptionPage/> */}
                                    {/* <CheckOutForm/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;