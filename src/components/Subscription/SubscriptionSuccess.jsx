import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const SubscriptionSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);

    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (!sessionId) {
            setVerificationStatus('error');
            return;
        }

        const verifySubscription = async () => {
            try {
                // Wait for webhooks to process
                await new Promise(resolve => setTimeout(resolve, 2000));

                const { data } = await axiosSecure.get('/subscription/status');

                if (data.hasSubscription && data.status === 'active') {
                    setVerificationStatus('success');
                    setSubscriptionDetails(data);
                } else {
                    // Retry checking a few times if still not active
                    let retries = 3;
                    while (retries > 0 && data.status !== 'active') {
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        const { data: retryData } = await axiosSecure.get('/subscription/status');
                        if (retryData.hasSubscription && retryData.status === 'active') {
                            setVerificationStatus('success');
                            setSubscriptionDetails(retryData);
                            return;
                        }
                        retries--;
                    }
                    setVerificationStatus('pending');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setVerificationStatus('error');
            }
        };

        verifySubscription();
    }, [sessionId]); // axiosSecure removed from deps to avoid infinite re-renders

    const handleContinue = () => {
        navigate('/dashboard/my-profile');
    };

    const handleRetry = () => {
        window.location.reload();
    };

    if (verificationStatus === 'verifying') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="flex justify-center mb-4">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                        <h2 className="card-title justify-center">Verifying Your Subscription</h2>
                        <p className="text-base-content/70">
                            Please wait while we confirm your subscription...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="flex justify-center mb-4">
                            <div className="rounded-full bg-success/20 p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-success"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h2 className="card-title justify-center text-success mb-2">
                            Welcome to Premium! 🎉
                        </h2>

                        <p className="text-base-content/70 mb-4">
                            Your subscription has been successfully activated.
                        </p>

                        <div className="bg-base-200 rounded-lg p-4 mb-4">
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span>Plan:</span>
                                    <span className="font-semibold">Premium</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <span className="badge badge-success badge-sm">Active</span>
                                </div>
                                {subscriptionDetails?.currentPeriodEnd && (
                                    <div className="flex justify-between">
                                        <span>Next billing:</span>
                                        <span className="font-mono text-xs">
                                            {new Date(subscriptionDetails.currentPeriodEnd).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-left mb-4">
                            <h3 className="font-semibold mb-2">Your Premium Benefits:</h3>
                            <ul className="text-sm space-y-1">
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Priority Support
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Advanced Analytics
                                </li>
                            </ul>
                        </div>

                        <div className="card-actions justify-center">
                            <button
                                className="btn btn-primary btn-wide"
                                onClick={handleContinue}
                            >
                                Continue to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (verificationStatus === 'pending') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <div className="flex justify-center mb-4">
                            <div className="rounded-full bg-warning/20 p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-warning"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 14.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h2 className="card-title justify-center text-warning mb-2">
                            Subscription Processing
                        </h2>

                        <p className="text-base-content/70 mb-4">
                            Your payment was successful but your subscription is still being activated. This may take a few minutes.
                        </p>

                        <div className="alert alert-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                className="stroke-current shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                            <span className="text-sm">You'll receive an email confirmation shortly.</span>
                        </div>

                        <div className="card-actions justify-center space-x-2 mt-4">
                            <button
                                className="btn btn-outline"
                                onClick={handleRetry}
                            >
                                Check Again
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleContinue}
                            >
                                Continue to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body text-center">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-error/20 p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-error"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>

                    <h2 className="card-title justify-center text-error mb-2">
                        Verification Failed
                    </h2>

                    <p className="text-base-content/70 mb-4">
                        We couldn't verify your subscription. Please try again or contact support.
                    </p>

                    <div className="card-actions justify-center space-x-2">
                        <button
                            className="btn btn-outline"
                            onClick={handleRetry}
                        >
                            Try Again
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleContinue}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSuccess;
