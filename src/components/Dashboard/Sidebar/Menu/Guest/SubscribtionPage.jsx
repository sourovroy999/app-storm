import useAxiosSecure from '../../../../../hooks/useAxiosSecure'; 


const SubscribtionPage = () => {

  const axiosSecure=useAxiosSecure()

  const handleSubscribe = async () => {
    try {
      const { data } = await axiosSecure.post(
        "/create-subscription");

      if (data?.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("No checkout URL returned from backend.");
      }
    } catch (err) {
      console.error("Error creating subscription:", err);
    }
  };

    return (
       <div className="card max-w-96 dark:from-blue-900/20 dark:to-purple-900/20 shadow-sm">
  <div className="card-body p-3 md:p-0">
    <span className="badge badge-xs badge-warning">Most Popular</span>
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Premium</h2>
      <span className="text-xl">$8/mo</span>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-xs">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Unlimited Product Upload</span>
      </li>
    
    </ul>
    <div className="mt-6">
      <button onClick={handleSubscribe} className="btn btn-primary btn-block">Subscribe</button>
    </div>
  </div>
</div>
    );
};

export default SubscribtionPage;