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
{isOpen && (
  <Dialog open={isOpen} onClose={close} className="relative z-10">
    <DialogPanel className="...">
      <DialogTitle>Are you sure you want to delete '{name}'?</DialogTitle>
      <div className="mt-4 flex gap-3">
        <Button onClick={() => handleDeleteProduct(_id)}>Delete</Button>
        <Button onClick={close}>Cancel</Button>
      </div>
    </DialogPanel>
  </Dialog>
)}
        </>
    );
};

export default MySingleProduct;