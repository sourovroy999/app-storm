import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react';
import { Link } from 'react-router';


const MySingleProduct = ({product, handleDeleteProduct, handleEditProduct }) => {


         let [isOpen, setIsOpen] = useState(true)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
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
          <button className="btn btn-ghost btn-xs">details</button>
          
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Edit</button> */}

<Link to={`update/${_id}`}>
        <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        Edit
      </Button>
      </Link>

          <button onClick={()=>handleDeleteProduct(_id)} className="btn btn-ghost btn-xs">Delete</button>
        </th>
      </tr>

      {/* Open the modal using document.getElementById('ID').showModal() method */}


            {/* headless ui dialogue */}
            {/* <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed  inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl  p-6  bg-black duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Edit Your Product
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Your payment has been successfully submitted. We’ve sent you an email with all of the details of your
                order.
              </p>



              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog> */}
        </>
    );
};

export default MySingleProduct;