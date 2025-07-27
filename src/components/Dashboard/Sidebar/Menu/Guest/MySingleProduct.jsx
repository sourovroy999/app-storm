import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';


const MySingleProduct = ({product, refetch }) => {

    const axiosSecure=useAxiosSecure()
    
         let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
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
  _id,
  name,
  tagline,
  logo,
  status,

 
} = product;

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
         
          

<Link to={`update/${_id}`}>
        <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        Edit
      </Button>
      </Link>

           <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        Delete
      </Button>
        </th>
      </tr>



            {/* headless ui dialogue */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
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

                <button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"  onClick={close}>Cancel</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
        </>
    );
};

export default MySingleProduct;