import { Button } from "@headlessui/react";
import { Link } from "react-router";

import {  Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ReportedSingleProduct = ({reportedProduct, refetch}) => {

      console.log(reportedProduct);

const { ProductDetails, productId, reports } = reportedProduct || {};


    console.log(ProductDetails);
    


          const [isReportModalOpen, setIsReportModalOpen] = useState(false);

      // let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
       const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

       const axiosSecure=useAxiosSecure()


   function openReportModal() {
        setIsReportModalOpen(true)
    }

    function closeReportModal() {
        setIsReportModalOpen(false)
    }

 // Delete modal functions  
    function openDeleteModal(){
        setIsDeleteModalOpen(true)
    }
    
    function closeDeleteModal(){
        setIsDeleteModalOpen(false)
    }



  

     const {mutateAsync}=useMutation({
        mutationFn:async id=>{
            const {data}=await axiosSecure.delete(`products/delete/${id}`)
            return data;
        },
        onSuccess:async (data)=>{
            console.log(data);
            refetch()
            closeDeleteModal()
            toast.success('Product Deleted')
        }

    })

      //delete a single product
    const handleDeleteProduct=async(id)=>{
        console.log('delete', id);
        try {
            await mutateAsync(id)
        } catch (error) {
            console.log(error);
            
            
        }

       
        

    }
    
      const {
    
    name,
    tagline,
    status,
    description,
    thumbnail,
    screenshots,
    tags,
    logo,
    launchDate,
    votes,
    comments,
    creator_name,
    creator_email
} = ProductDetails ;

    return (
        <>
              <tr>
                
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={logo}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{name}</div>
        
                    </div>
                  </div>
                </td>
        
                <td>
                    <Link to={`/products/${productId}`}>
                    
          <Button
               
                className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
              >
                Review
              </Button>
              </Link>
                </td>
        
        
                <td>
                    {/* {status} */}
                    {reports.length}
                </td>
                <td>
                     <button onClick={openReportModal} className="btn">Report details</button>
                   
                </td>
                
                <th>
                  
            
                    <button className="btn" onClick={openDeleteModal}>Delete</button>



                </th>
              </tr>
       
       {/* delete modal */}
       {/* headless ui dialogue */}
            <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal} as="div" className="relative z-10 focus:outline-none" >
        <div className="fixed  inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl  p-6  bg-black duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              Are You Sure You want to delete '{name}'?
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
              once you delete
               You can not revert this.
              </p>



              <div className="mt-4 flex gap-3">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                //   onClick={close}
                onClick={()=>handleDeleteProduct(productId)}
                  
                >
                  Delete
                </Button>

                <button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"  onClick={closeDeleteModal}>Cancel</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* reports dialogue */}

              <Dialog open={isReportModalOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeReportModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full space-y-5  max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Report details of {name}
                

              </DialogTitle>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={logo}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{name}</div>
        
                    </div>
                  </div>
                  <hr />

                  <div className="max-h-64 overflow-y-auto pr-2">
                    {
                        reports.map(report=> <div className="flex flex-col gap-2 p-4 rounded-2xl bg-gray-700 my-4">
                            <p>

                                Reported by: {report.reportedBy}
                            </p>
                            <p>

                                Message: {report.message}
                            </p>
                            <p>

                                Reported At: {new Date(report.reportedAt).toLocaleString()}
                            </p>
                        </div>)
                    }
                    
                  </div>
              
              <div className="flex justify-center">
                 
                    <button onClick={close} className="btn w-sm">CLose</button>
              
                
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
            
        </>
    );
};

export default ReportedSingleProduct;