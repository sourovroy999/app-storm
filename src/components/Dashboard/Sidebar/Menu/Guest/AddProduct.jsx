import React, { useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import { imageUpload } from '../../../../../api/utilities';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';



const suggestions = [
    { id: 'Apple', text: 'Apple' },
    { id: 'Banana', text: 'Banana' },
    { id: 'Orange', text: 'Orange' },
    { id: 'Grape', text: 'Grape' },
]


const AddProduct = () => {

    const { user } = useAuth()
const axiosSecure=useAxiosSecure()
    const [loading, setLoading]=useState(false)



const{mutateAsync}=useMutation({
    mutationFn:async (productData)=>{
        const {data}= await axiosSecure.post('/products', productData)
        return data


    },

    onSuccess:()=>{
        console.log('product saved successfully');
        toast.success('Product added for review')
        
    }


})


    const [images, setImages] = useState([])
    const [tags, setTags] = React.useState([])

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index))

    };

    const handleAddition = (tag) => {
        setTags((prevTags) => [...prevTags, tag])
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = [...tags];
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    }
    const onTagUpdate = (index, newTag) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1, newTag);
        setTags(updatedTags)
    }

    // images related func. ss

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);
        setImages(files)

    }

    // console.log(images);


    // console.log(tags);

    const handleAddProduct =  async(e) => {
        e.preventDefault();

        console.log('clickeddd add');
        const form = e.target;
        const name = form.name.value;
        const tagline = form.tagline.value;
        const description = form.description.value;
        const logo = form.logo.files[0];

        const creator_name = form.creator_name.value;
        const creator_email = form.creator_email.value;
        const avatar = form.avatar.value;
        const formattedTags = tags.map(tag => tag.text);
        const status='pending'

        
    const formData = new FormData();
    formData.append('name', name);
    formData.append('tagline', tagline);
    formData.append('description', description);
    formData.append('logo', logo);
    formData.append('creator_name', creator_name);
    formData.append('creator_email', creator_email);
    formData.append('avatar', avatar);
    formData.append('status', status)

    formattedTags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    images.forEach((img, index) => {
      formData.append(`screenshots[${index}]`, img);
    });

    console.log('logo-->', logo);
    console.log('scennshot-->' ,images);

   
    
    try {
        //
        const logoUrl=await imageUpload(logo)
        console.log(logoUrl);
        
        //upload all screenshots
        const screenShotsUrl=[];

        for(const img of images){
            const uploadedUrl=await imageUpload(img)
            screenShotsUrl.push(uploadedUrl)
        }
        console.log(screenShotsUrl);

        
        // Final product data
      const productData = {
        name,
        tagline,
        description,
        logo: logoUrl,
        screenshots: screenShotsUrl,
        creator_name,
        creator_email,
        avatar,
        status,
        tags: formattedTags,
      };

      console.log(productData);

      mutateAsync(productData)
      
        

    
        
        
    } catch (error) {
        //
        console.log(error);
        
        
    }
    

    }


    return (
        <div >
            <p className='text-center uppercase text-2xl '>add your product</p>


            <div className=' max-w-xl mx-auto '>

                <form onSubmit={handleAddProduct} className='space-y-3' action="">

                    {/* name */}
                    <div>
                        <label className="block font-medium ">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm "
                            placeholder="Product Name"
                            required
                        />
                    </div>

                    {/* tagline */}
                    <div>
                        <label className="block font-medium ">Tag Line</label>
                        <input
                            type="text"
                            name="tagline"
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm "
                            placeholder="tagline"
                            required
                        />
                    </div>

                    {/* description */}
                    <div>
                        <label className="block font-medium ">description</label>
                        <textarea
                            rows='4'

                            name="description"
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm "
                            placeholder="description"
                            required
                        />
                    </div>


                    {/* logo */}
                    <div>
                        <label className="block font-medium ">Logo</label>
                        <input
                            type="file"
                            name="logo"
                            accept='image/*'

                            className="mt-1 px-2 py-2  h-10 block w-full  rounded-md border-gray-300 shadow-sm "
                            required
                        />
                    </div>


                    {/* Creator Name */}
                    <div>
                        <label className="block font-medium ">Creator Name</label>
                        <input
                            type="text"
                            name="creator_name"
                            defaultValue={user?.displayName}
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm "
                            readOnly
                            required
                        />
                    </div>

                    {/* Creator Email */}
                    <div>
                        <label className="block font-medium ">Creator Email</label>
                        <input
                            type="text"
                            name="creator_email"
                            defaultValue={user?.email}
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm "
                            readOnly
                            required
                        />
                    </div>

                    {/* Creator Image */}
                    <div>
                        <label className="block font-medium ">Creator Image</label>
                        <input
                            type="text"
                            name="avatar"
                            defaultValue={user?.photoURL}
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm "
                            readOnly
                            required
                        />
                    </div>

                    {/* tagss */}
                    <div className="">
                        <label className="block font-medium py-2 ">Tags</label>
                        <ReactTags
                            tags={tags}
                            suggestions={suggestions}
                            separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            onTagUpdate={onTagUpdate}
                            inputFieldPosition="bottom"
                            placeholder="Add new tags"
                            maxTags={6}
                            editable
                            classNames={{
                                tags: 'flex flex-wrap items-center border border-gray-300 rounded-md p-2 min-h-[40px] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200',
                                tagInput: 'flex-grow min-w-[150px]', // Container for the input field
                                tagInputField: 'outline-none border-none p-1 w-full flex-grow text-gray-700', // The actual input field
                                selected: 'flex flex-wrap gap-2', // Container for selected tags
                                tag: 'bg-blue-500 text-white rounded-full px-3 py-1 text-sm flex items-center', // Individual tag
                                remove: 'ml-2 cursor-pointer text-white hover:text-gray-200', // Remove button for a tag
                                suggestions: 'absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full shadow-lg max-h-60 overflow-y-auto', // Suggestions dropdown
                                activeSuggestion: 'bg-blue-100', // Active suggestion item
                            }}
                        />
                    </div>

                    {/* screenshot upload */}

                    <div>
                        <label className="block font-medium ">Upload screenshot</label>
                        <input
                            type="file"
                            multiple
                            accept='image/*'
                            name="screenshots"
                            onChange={handleImageChange}
                            className="mt-1 px-2 py-2  h-10 block w-full  rounded-md border-gray-300 shadow-sm "
                            required
                        />
                    </div>

                    <button className='btn'>Add Product</button>





                </form>
            </div>


        </div>
    );
};

export default AddProduct;