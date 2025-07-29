import { useParams } from "react-router";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useMutation, useQuery } from "@tanstack/react-query";
import Container from "../../shared/Container";
import CustomTabs from "./Tabs";
import Example from "./Tabs";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const ProductDetails = () => {


let [isOpen, setIsOpen] = useState(false)
// const[reportedMessage, setReportedMessage]=useState('')
    // const [isSubmitting, setIsSubmitting] = useState(false);
const axiosSecure=useAxiosSecure()

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }



    const {user}=useAuth()

 const{id}=useParams()
  const axiosCommon=useAxiosCommon();

  const{data:product={}, isLoading}=useQuery({
    queryKey:['productDetails'],
    queryFn: async()=>{
        const{data}=await axiosCommon.get(`/products/${id}`)
        return data
    },
    enabled: !!id
  })
  console.log(product);


//   add data to the report collection in db
const {mutateAsync}=useMutation({
    mutationFn:async(reportDetails)=>{
        const{data}=await axiosSecure.put('/products/reports', reportDetails)
        return data

    },
       onSuccess: () => {
                console.log('Your Report Has been sent');
                toast.success('Your Report has been sent')
                // setLoading(false)
            }

})
 

      const {
  _id,
  name,
  tagline,
  description,
//   thumbnail,
//   screenshots,
  tags,
  logo,
//   launchDate,
//   maker: { name: makerName, avatar: makerAvatar },
//   votes,
//   comments
} = product;


const handleReportContent=async (e)=>{

    e.preventDefault()

    const message=e.target.message.value.trim()
     // Validation
        // if (!reportedMessage.trim()) {
        //     toast.error('Please describe the issue before submitting.');
        //     return;
        // }

        if (!user?.email) {
            toast.error('You must be logged in to report content.');
            return;
        }
// Prepare report data
        const reportDetails = {
            productId: id, 
            reports:
            [
              {
            reportedBy: user.email,
            message:message, 
            reportedAt: new Date().toISOString()
            }
          ]
        };
       console.log('Submitting report:', reportDetails);
       try {
  await mutateAsync(reportDetails)
   close()
        
       } catch (error) {
        console.error(error);
      toast.error('Failed to submit report');
       }
        
    
    

}




 if(isLoading) return <p>loading.........</p>

  

    return (
        <Container>
   
           {
            product &&
             <div className="mt-6">
                {/* <p>{product.name}</p>
                {tagline} */}
                <div className="flex  md:gap-44">
                <div className="flex gap-4">
                    <div><img className="w-15" src={logo} alt="" /></div>

                    <div>
                        <div className="flex items-center gap-3">

                            <p className="font-bold text-2xl">{name}</p>
                            <div className="badge badge-soft badge-accent">Launching today</div>
  
                        </div>
                        <div className="text-neutral-300">

                        {tagline}
                        </div>
                    </div>

                </div>

                <div className="flex ">
                    <button className="btn btn-ghost">Visit Website</button>
                    <button className="btn">Upvote</button>
                </div>
                </div>

                <div className="flex gap-3 my-4">
                    
                    {
                        tags.map(tag=> <ul >
                            <li> {tag}</li>
                        </ul>)
                    }
                </div>

                <div className="text-neutral-400 ">
                    {description}
                </div>

                <div>
            
            <Example product={product}/>
                </div>

                   
             <div className="mb-12">
                    do you have any report for rhis content?
                 {/* <button onClick={()=>handleReportContent(_id)} className="btn ml-4">Report</button>  */}

                 <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        report here
      </Button>

      
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {/* <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Report the content
              </DialogTitle> */}
              <form className="space-y-3" onSubmit={handleReportContent} action="">
                <label  htmlFor="">Whats the Issue?</label>
                <br />
                <textarea 
                
                autoFocus
                placeholder={'please tell us about your report'}
                className="w-full my-2 px-4 py-2" name="message" id="" rows={4} ></textarea>
                <br />
                <button className="btn">Submit Report</button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

                </div>

            </div>

           }
            
        </Container>
    );
};

export default ProductDetails;