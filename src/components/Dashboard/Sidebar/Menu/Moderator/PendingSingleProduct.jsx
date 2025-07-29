import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

import { createPortal } from 'react-dom';




const PendingSingleProduct = ({product, refetch }) => {

    const axiosSecure=useAxiosSecure()
    
    let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

    
    // const {mutateAsync}=useMutation({
    //     mutationFn:async id=>{
    //         const {data}=await axiosSecure.delete(`products/delete/${id}`)
    //         return data;
    //     },
    //     onSuccess:async (data)=>{
    //         console.log(data);
    //         refetch()
    //         close()
    //         toast.success('Product Deleted')
    //     }

    // })

      //delete a single product
    // const handleDeleteProduct=async(id)=>{
    //     console.log('delete', id);
    //     try {
    //         await mutateAsync(id)
    //     } catch (error) {
    //         console.log(error);
            
            
    //     }
    // }


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

const handleApprove=async(id)=>{
    try {
        await axiosSecure.patch(`/product/status/${id}`, {status:'approved'})
        toast.success('Approved')
        refetch(); // Add refetch here to update the UI after approval
    } catch (error) {
        //
        console.log(error);
        toast.error('Failed to approve product.'); // Provide user feedback
        
    }

}

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
                    <button onClick={()=>handleApprove(_id)} className="btn bg-green-500">Approve</button>
                    <button className="btn btn-error text-white">Reject</button>

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
        </>
    );
};

export default PendingSingleProduct;