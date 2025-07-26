import { useParams } from "react-router";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Container from "../../shared/Container";
import CustomTabs from "./Tabs";
import Example from "./Tabs";





const ProductDetails = () => {

    

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
  if(isLoading) return <p>loading.........</p>


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

                   
                <div>

                </div>

            </div>

           }
            
        </Container>
    );
};

export default ProductDetails;