import React, { useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import { imageUpload } from '../../../../../api/utilities';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useSubscription from '../../../../../hooks/useSubscription';
import useMyProducts from '../../../../../hooks/useMyProducts';



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
   
    const {data}=useSubscription();
    console.log(data);
    const{products}=useMyProducts();

   


    




const{mutateAsync}=useMutation({
    mutationFn:async (productData)=>{
        const {data}= await axiosSecure.post('/products', productData)
        return data


    },

    onSuccess:()=>{
        console.log('product saved successfully');
        toast.success('Product added for review')
        
    },
    onError:(error)=>{
          if (error.response?.status === 409) {
      toast.error(error.response.data.error); // "Free members can upload only one product"
    } else {
      toast.error("Something went wrong!");
    }
    }


})

 if(data?.membership !== 'premium' && products.length==1){
        console.log('u r free and uploaded one product');
        
    }

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
<>
  <div className="py-4 px-4">
    <p className="text-center text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight mb-8">

      Add Your Product
    </p>

    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleAddProduct} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200">Product Name</label>
          <input
          autoFocus
            type="text"
            name="name"
            className="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200">Tag Line</label>
          <input
            type="text"
            name="tagline"
            className="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            placeholder="Catchy tagline..."
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            rows="4"
            name="description"
            className="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            placeholder="Describe your product..."
            required
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200">Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            className="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            required
          />
        </div>

        {/* Creator Info (read-only) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200">Creator Name</label>
            <input
              type="text"
              name="creator_name"
              defaultValue={user?.displayName}
              className="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-2 shadow-sm"
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200">Creator Email</label>
            <input
              type="text"
              name="creator_email"
              defaultValue={user?.email}
              className="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-2 shadow-sm"
              readOnly
            />
          </div>
        </div>

        {/* Creator Image */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200">Creator Image</label>
          <input
            type="text"
            name="avatar"
            defaultValue={user?.photoURL}
            className="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-2 shadow-sm"
            readOnly
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200 py-2">Tags</label>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            onTagUpdate={onTagUpdate}
            inputFieldPosition="bottom"
            placeholder="Add tags..."
            maxTags={6}
            editable
            classNames={{
              tags: 'flex flex-wrap items-center border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-800',
              tagInput: 'flex-grow min-w-[150px]',
              tagInputField: 'outline-none border-none p-1 w-full bg-transparent text-gray-700 dark:text-gray-200',
              selected: 'flex flex-wrap gap-2',
              tag: 'bg-indigo-600 text-white rounded-full px-3 py-1 text-sm flex items-center',
              remove: 'ml-2 cursor-pointer text-white hover:text-gray-200',
              suggestions: 'absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 w-full shadow-lg max-h-60 overflow-y-auto',
              activeSuggestion: 'bg-indigo-100 dark:bg-indigo-800',
            }}
          />
        </div>

        {/* Screenshots */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200">Upload Screenshots</label>
          <input
            type="file"
            multiple
            accept="image/*"
            name="screenshots"
            onChange={handleImageChange}
            className="mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            required
          />
        </div>

        {/* Submit */}
        <button
          disabled={data?.membership !== 'premium' && products.length === 1}
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg transition disabled:opacity-50"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
</>


    );
};

export default AddProduct;  