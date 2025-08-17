import { useNavigate, useParams } from "react-router";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import Container from "../../shared/Container";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

import { Button, Dialog, DialogPanel } from '@headlessui/react';
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Tabs from "./Tabs";
import useUpvote from "../../../hooks/useUpvote";
import useUpvoteStatus from "../../../hooks/useUpvoteStatus";
import { BiSolidUpvote } from "react-icons/bi";

const ProductDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();

  // Fetch product details
  const { data: product = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });

  // Report mutation
  const { mutateAsync: reportMutate } = useMutation({
    mutationFn: async (reportDetails) => {
      const { data } = await axiosSecure.put('/products/reports', reportDetails);
      return data;
    },
    onSuccess: () => toast.success('Your Report has been sent'),
    onError: () => toast.error('Failed to submit report')
  });

  const { upvoteProduct } = useUpvote(refetch);
  const { data: upvoteData } = useUpvoteStatus(product._id);

  const handleUpvote = async () => {
    if (!user) {
      navigate('/login', { state: { fromUpvote: product._id } });
      return;
    }
    try {
      await upvoteProduct(product._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReportContent = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error('You must be logged in to report content.');
      return;
    }
    const message = e.target.message.value.trim();
    if (!message) return;
    await reportMutate({
      productId: id,
      reports: [{ reportedBy: user.email, message, reportedAt: new Date().toISOString() }]
    });
    setIsOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!product || product.status === 'pending' || product.status === 'rejected')
    return <p>This product is not available.</p>;

  return (
    <Container>
      <div className="mt-6 max-w-3xl mx-auto space-y-6">
        {/* Header: Logo + Name + Tagline + Upvote */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-4 items-center">
            <img src={product.logo} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-2xl text-gray-900 dark:text-gray-100">{product.name}</p>
                {product.status === 'featured' && (
                  <span className="px-2 py-1 text-sm rounded-md bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400">{product.tagline}</p>
            </div>
          </div>

          {/* Upvote Button */}
          <button
            disabled={user?.email === product.creator_email}
            onClick={handleUpvote}
            className={`flex items-center gap-2 btn btn-sm px-4 py-2 rounded-md shadow-md transition-colors duration-200
              ${upvoteData?.hasUpvoted ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}
              hover:bg-blue-600 hover:text-white`}
          >
            <BiSolidUpvote /> {upvoteData?.hasUpvoted ? 'Upvoted' : 'Upvote'} {upvoteData?.totalUpvotes || 0}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="text-gray-700 dark:text-gray-300">{product.description}</div>

        {/* Tabs */}
        <Tabs product={product} />

        {/* Report */}
        <div>
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-md bg-red-400 dark:bg-red-600 px-4 py-2 text-white hover:bg-red-500 dark:hover:bg-red-700 transition"
          >
            Report Content
          </Button>

          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
                <form onSubmit={handleReportContent} className="space-y-3">
                  <label className="block text-gray-700 dark:text-gray-200">Describe the Issue</label>
                  <textarea
                    name="message"
                    autoFocus
                    rows={4}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Please tell us about your report"
                  />
                  <button type="submit" className="btn w-full bg-red-500 hover:bg-red-600 text-white">Submit Report</button>
                </form>
              </DialogPanel>
            </div>
          </Dialog>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
