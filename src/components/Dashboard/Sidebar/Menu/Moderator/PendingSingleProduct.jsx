import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

import { createPortal } from 'react-dom';




const PendingSingleProduct = ({product, refetch }) => {

  // console.log(product);
  

    const axiosSecure=useAxiosSecure()
    
    let [isOpen, setIsOpen] = useState(false)
         const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
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
            close()
            toast.success('Product Deleted')
        }

    })

      // delete a single product
    const handleDeleteProduct=async(id)=>{
        console.log('delete', id);
        try {
            await mutateAsync(id)
        } catch (error) {
            console.log(error);
            
            
        }
    }


      const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

    
      const {
    _id,
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
} = product;

const updateStatus = async (id, newStatus, successMessage) => {
  try {
    await axiosSecure.patch(`/product/status/${id}`, { status: newStatus });
    toast.success(successMessage);
    close();
    refetch();
  } catch (error) {
    console.error(error);
    toast.error(`Failed to update status to "${newStatus}".`);
  }
};


const handleApprove = (id) => updateStatus(id, 'approved', 'Approved');
const handleReject = (id) => updateStatus(id, 'rejected', 'Rejected');
const handleMakeFeatured = (id) => updateStatus(id, 'featured', 'Added to featured list');
const handleRemoveFeatured = (id) => updateStatus(id, 'approved', 'Removed from featured list'); // assuming 'approved' is default

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
{tagline}
        </td>


        <td>{status}</td>
        
        <th>
          
          


        <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        Review
      </Button>


            <Button
             onClick={openDeleteModal}
        
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        Delete
      </Button>
        </th>
      </tr>

        {/* Use createPortal to render Dialog outside of tbody */}
        {typeof document !== 'undefined' && createPortal(
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed  inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl  p-6  bg-black duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              Details of '{name}'
              </DialogTitle>
            
   
            
             <div className="mt-6">
             
                <div className="flex  md:gap-44">
                <div className="flex gap-4">
                    <div><img className="w-15" src={logo} alt="" /></div>

                    <div>
                        <div className="flex items-center gap-3">

                            <p className="font-bold text-2xl">{name}</p>

 
                        </div>
                        <div className="text-neutral-300">

                        {tagline}
                        </div>
                    </div>

                </div>

                <div className="flex ">
                    <button className="btn btn-ghost">Visit Website</button>
                    
                </div>
                </div>
        <div className='items-center flex mt-4'>
            <p>

            Status :
            </p>
              <div className="badge badge-soft badge-accent ml-4">{status}</div>
        </div>
                

              

                {/* creator details */}
                <div className='my-2'>
                    Creator Name: {creator_name}
                    <br />
                    Creator Email: {creator_email}

                </div>

                {/* tags */}

                     <div className="flex gap-3 my-4">
                        Tags:
                        
                        {
                            tags.map((tag, index)=> <ul key={index}> {/* Added key prop */}
                                <li> {tag}</li>
                            </ul>)
                        }
                    </div>

                        {/* description */}
                <div className="text-neutral-400 ">
                    Description : 
                    {description}
                </div>

                <div className='my-2'>

                    Screenshots:
                    <div className='my-4 grid grid-cols-2 gap-3'>

            {
                screenshots.map((screenshot, index)=>  <img key={index} className='w-[300px]' src={screenshot}></img>) /* Added key prop */
            }
            </div>


            
                </div>
                

                    
<div className='flex justify-center my-4 mt-6 gap-6'>
  <button
    disabled={status === 'approved'}
    onClick={() => handleApprove(_id)}
    className="btn bg-green-500"
  >
    Approve
  </button>

  <button
    disabled={status === 'rejected'}
    onClick={() => handleReject(_id)}
    className="btn btn-error text-white"
  >
    Reject
  </button>

  {/* Toggle Featured / Unfeatured */}
  {status === 'featured' ? (
    <button
     disabled={status === 'rejected'}
      onClick={() => handleRemoveFeatured(_id)}
      className="btn bg-yellow-500 text-white"
    >
      Remove from Featured
    </button>
  ) : (
    <button
     disabled={status === 'rejected'}
      onClick={() => handleMakeFeatured(_id)}
      className="btn bg-purple-600 text-white"
    >
      Make Featured
    </button>
  )}
</div>



            </div>
            <div>

            </div>

          


            </DialogPanel>
          </div>
        </div>
      </Dialog>,
      document.body
        )}


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
                onClick={()=>handleDeleteProduct(_id)}
                  
                >
                  Delete
                </Button>

                <button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"  onClick={closeDeleteModal}>Cancel</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
        </>
    );
};

export default PendingSingleProduct;