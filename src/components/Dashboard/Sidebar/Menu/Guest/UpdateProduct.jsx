import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import { imageUpload } from '../../../../../api/utilities';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

const suggestions = [
    { id: 'Apple', text: 'Apple' },
    { id: 'Banana', text: 'Banana' },
    { id: 'Orange', text: 'Orange' },
    { id: 'Grape', text: 'Grape' },
]

const UpdateProduct = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [tags, setTags] = useState([])
    const [logoPreview, setLogoPreview] = useState(null)
    const [imagesPreviews, setImagesPreviews] = useState([])
    const [currentScreenshots, setCurrentScreenshots] = useState([])
    const [deletedScreenshots, setDeletedScreenshots] = useState([])

    // get a single product
    const { data: product = {}, isError, error, isLoading } = useQuery(
        {
            queryKey: ['update-product', id],
            queryFn: async () => {
                const { data } = await axiosSecure.get(`/products/${id}`)
                return data
            },
            enabled: !!id,
            onError: (err) => {
                console.log(err);
            }
        }
    );

    const {
        _id,
        name,
        tagline,
        description,
        logo,
        screenshots = [], // Default to empty array
        creator_name,
        creator_email,
        avatar,
        tags: alltags
    } = product;

    // Update mutation - changed to PUT for updating
    const { mutateAsync } = useMutation({
        mutationFn: async (productData) => {
            const { data } = await axiosSecure.put(`/products/update/${id}`, productData) // Changed to PUT
            return data
        },
        onSuccess: () => {
            console.log('product updated successfully');
            toast.success('Product updated successfully')
            setLoading(false)
        }
    })

    useEffect(() => {
        if (alltags && alltags.length > 0) {
            const formatedTags = alltags.map(tag => ({ id: tag, text: tag }))
            setTags(formatedTags)
        }
    }, [alltags])

    useEffect(() => {
        if (screenshots && screenshots.length > 0) {
            setCurrentScreenshots(screenshots)
        }
    }, [screenshots])

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index))
    };

    const handleAddition = (tag) => {
        setTags((prevTags) => [...prevTags, tag])
    };

    const handleDrag = (tag, currPos, newPos) => {
       setTimeout(() => {
            setTags(prevTags => {
                const newTags = [...prevTags];
                newTags.splice(currPos, 1);
                newTags.splice(newPos, 0, tag);
                return newTags;
            });
        }, 0);
    }

    const onTagUpdate = (index, newTag) => {
       setTimeout(() => {
            setTags(prevTags => {
                const updatedTags = [...prevTags];
                updatedTags.splice(index, 1, newTag);
                return updatedTags;
            });
        }, 0);
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Add new files to existing images array
        const newImages = [...images, ...files];
        setImages(newImages);
        
        // Create preview URLs for new images and add to existing previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagesPreviews(prev => [...prev, ...newPreviews]);
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Clean up previous preview URL
            if (logoPreview) {
                URL.revokeObjectURL(logoPreview);
            }
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
        }
    }

    const removeScreenshot = (index) => {
        // Remove from images array
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        
        // Clean up and remove from previews
        URL.revokeObjectURL(imagesPreviews[index]);
        const newPreviews = imagesPreviews.filter((_, i) => i !== index);
        setImagesPreviews(newPreviews);
    }

    const removeCurrentScreenshot = (index) => {
        // Mark screenshot for deletion
        const screenshotToDelete = currentScreenshots[index];
        setDeletedScreenshots(prev => [...prev, screenshotToDelete]);
        
        // Remove from current screenshots
        const newCurrentScreenshots = currentScreenshots.filter((_, i) => i !== index);
        setCurrentScreenshots(newCurrentScreenshots);
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true)

        const form = e.target;
        const formName = form.name.value;
        const formTagline = form.tagline.value;
        const formDescription = form.description.value;
        const logoFile = form.logo.files[0];
        const formCreatorName = form.creator_name.value;
        const formCreatorEmail = form.creator_email.value;
        const formAvatar = form.avatar.value;
        const formattedTags = tags.map(tag => tag.text);

        try {
            let logoUrl = logo; // Keep existing logo by default

            // Upload new logo if provided
            if (logoFile) {
                logoUrl = await imageUpload(logoFile)
                console.log('New logo uploaded:', logoUrl);
            }

            // Upload new screenshots if provided and combine with existing ones
            let finalScreenshots = [...currentScreenshots]; // Keep existing screenshots
            
            if (images.length > 0) {
                const newScreenshotsUrls = [];
                for (const img of images) {
                    const uploadedUrl = await imageUpload(img)
                    newScreenshotsUrls.push(uploadedUrl)
                }
                finalScreenshots = [...finalScreenshots, ...newScreenshotsUrls]; // Add new ones
                console.log('New screenshots uploaded:', newScreenshotsUrls);
            }

            // Final product data
            const productData = {
                name: formName,
                tagline: formTagline,
                description: formDescription,
                logo: logoUrl,
                screenshots: finalScreenshots,
                creator_name: formCreatorName,
                creator_email: formCreatorEmail,
                avatar: formAvatar,
                tags: formattedTags,
            };

            console.log('Updating product with data:', productData);
            await mutateAsync(productData)
            
            // Clean up preview URLs to prevent memory leaks
            if (logoPreview) {
                URL.revokeObjectURL(logoPreview);
                setLogoPreview(null);
            }
            imagesPreviews.forEach(url => URL.revokeObjectURL(url));
            setImagesPreviews([]);

        } catch (error) {
            console.log('Error updating product:', error);
            toast.error('Failed to update product')
            setLoading(false)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading product: {error?.message}</div>

    return (
        <div>
            <p className='text-center uppercase text-2xl'>Update your product</p>

            <div className='max-w-xl mx-auto'>
                <form onSubmit={handleUpdateProduct} className='space-y-3'>
                    {/* name */}
                    <div>
                        <label className="block font-medium">Product Name</label>
                        <input
                            type="text"
                            defaultValue={name || ''}
                            name="name"
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="Product Name"
                            required
                        />
                    </div>

                    {/* tagline */}
                    <div>
                        <label className="block font-medium">Tag Line</label>
                        <input
                            defaultValue={tagline || ''}
                            type="text"
                            name="tagline"
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="tagline"
                            required
                        />
                    </div>

                    {/* description */}
                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                            rows='4'
                            defaultValue={description || ''}
                            name="description"
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="description"
                            required
                        />
                    </div>

                    {/* logo */}
                    <div className='flex gap-4 items-end'>
                        <div className='flex-1'>
                            <label className="block font-medium">Logo</label>
                            <input
                                type="file"
                                name="logo"
                                accept='image/*'
                                onChange={handleLogoChange}
                                className="mt-1 px-2 py-2 h-10 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        <div className='flex-shrink-0'>
                            <img 
                                className='w-24 h-24 object-cover rounded-lg border-2 border-gray-300' 
                                src={logoPreview || logo || '/placeholder-logo.png'} 
                                alt="Logo preview" 
                            />
                        </div>
                    </div>

                    {/* Creator Name */}
                    <div>
                        <label className="block font-medium">Creator Name</label>
                        <input
                            type="text"
                            name="creator_name"
                            defaultValue={creator_name || ''}
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm"
                            readOnly
                            required
                        />
                    </div>

                    {/* Creator Email */}
                    <div>
                        <label className="block font-medium">Creator Email</label>
                        <input
                            type="text"
                            name="creator_email"
                            defaultValue={creator_email || ''}
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm"
                            readOnly
                            required
                        />
                    </div>

                    {/* Creator Image */}
                    <div>
                        <label className="block font-medium">Creator Image</label>
                        <input
                            type="text"
                            name="avatar"
                            defaultValue={user?.photoURL || ''}
                            className="mt-1 px-2 h-10 block w-full rounded-md border-gray-300 shadow-sm"
                            readOnly
                            required
                        />
                    </div>

                    {/* tags */}
                    <div>
                        <label className="block font-medium py-2">Tags</label>
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
                                tagInput: 'flex-grow min-w-[150px]',
                                tagInputField: 'outline-none border-none p-1 w-full flex-grow text-gray-700',
                                selected: 'flex flex-wrap gap-2',
                                tag: 'bg-blue-500 text-white rounded-full px-3 py-1 text-sm flex items-center',
                                remove: 'ml-2 cursor-pointer text-white hover:text-gray-200',
                                suggestions: 'absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full shadow-lg max-h-60 overflow-y-auto',
                                activeSuggestion: 'bg-blue-100',
                            }}
                        />
                    </div>

                    {/* screenshot upload */}
                    <div>
                        <label className="block font-medium">Upload Screenshots</label>
                        <input
                            type="file"
                            multiple
                            accept='image/*'
                            name="screenshots"
                            onChange={handleImageChange}
                            className="mt-1 px-2 py-2 h-10 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">You can select multiple files or upload one by one</p>
                        
                        {/* Display screenshots */}
                        <div className='mt-3'>
                            <div className='space-y-4'>
                                {/* Current Screenshots */}
                                {currentScreenshots.length > 0 && (
                                    <div>
                                        <p className='text-sm text-gray-600 mb-2'>Current Screenshots ({currentScreenshots.length}):</p>
                                        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                                            {currentScreenshots.map((screenshot, index) => (
                                                <div key={`current-${index}`} className='relative group'>
                                                    <img 
                                                        className='w-full h-32 object-cover rounded-lg border-2 border-blue-300' 
                                                        src={screenshot} 
                                                        alt={`Current Screenshot ${index + 1}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCurrentScreenshot(index)}
                                                        className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity'
                                                    >
                                                        ×
                                                    </button>
                                                    <span className='absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded'>
                                                        Current
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New Screenshots */}
                                {imagesPreviews.length > 0 && (
                                    <div>
                                        <p className='text-sm text-gray-600 mb-2'>New Screenshots ({imagesPreviews.length}):</p>
                                        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                                            {imagesPreviews.map((preview, index) => (
                                                <div key={`new-${index}`} className='relative group'>
                                                    <img 
                                                        className='w-full h-32 object-cover rounded-lg border-2 border-green-300' 
                                                        src={preview} 
                                                        alt={`New Screenshot ${index + 1}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeScreenshot(index)}
                                                        className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity'
                                                    >
                                                        ×
                                                    </button>
                                                    <span className='absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded'>
                                                        New
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {currentScreenshots.length === 0 && imagesPreviews.length === 0 && (
                                <p className='text-gray-400 text-sm text-center py-8 border-2 border-dashed border-gray-300 rounded-lg'>
                                    No screenshots uploaded yet
                                </p>
                            )}

                            {/* Total count */}
                            {(currentScreenshots.length > 0 || imagesPreviews.length > 0) && (
                                <div className='mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600'>
                                    Total Screenshots: {currentScreenshots.length + imagesPreviews.length}
                                </div>
                            )}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className='btn w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50'
                    >
                        {loading ? 'Updating...' : 'Update Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;