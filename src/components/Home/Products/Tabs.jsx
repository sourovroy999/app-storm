// Example.jsx
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../../styles/swipper-custom.css'

import { useRef, useState, useEffect } from 'react';
import { Field, Textarea } from '@headlessui/react'
import clsx from 'clsx'
import useAddComment from '../../../hooks/useAddComment';
import useComments from '../../../hooks/useComments';
import Comments from '../Comments/Comments';

const Example = ({ product }) => {
    console.log(product);

    const [newCommentId, setNewCommentId] = useState(null);
    
    // ✅ Changed to use an object to store refs for all comments
    const commentRefs = useRef({});

    const {_id: productId} = product;
    
    const categories = ['Overview', 'Reviews', 'Team'];
    console.log(product);

    const {screenshots} = product;

    const [modalImage, setModalImage] = useState(null);

    const openModal = (img) => setModalImage(img);
    const closeModal = () => setModalImage(null);

    const {data: comments = [], isLoading} = useComments(productId)
    const {mutateAsync, isPending} = useAddComment()

    console.log(comments);
    
  
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        let commentText = form.commentText.value;
        commentText = commentText.replace(/[\r\n]+/g, '').trim();

        if (!commentText) return;
        
        try {
           await mutateAsync({productId, commentText})
            form.reset()
     
        
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full max-w-4xl pt-6">
            <TabGroup>
                <TabList className="flex gap-4 pb-4">
                    {categories.map((name) => (
                        <Tab
                            key={name}
                            className={({ selected }) =>
                                `rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                    selected
                                        ? 'bg-gray-200 text-black'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`
                            }
                        >
                            {name}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels className="mt-4">
                    <TabPanel>
                        <div className="w-full ">
                            <Swiper
                                className=''
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}
                                slidesPerView={2}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                observer={true}
                                observeParents={true}
                            >
                                {
                                    screenshots.map((screenShot, index) => 
                                        <SwiperSlide key={index}>
                                            <div onClick={() => openModal(screenShot)} className=" max-h-[260px] ">
                                                <img className='object-cover rounded-2xl' src={screenShot} alt="" />
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                        </div>

                        <h3 className="text-lg font-bold mb-2">Comments ({comments.length})</h3>
                        
                        <div className='flex flex-col gap-4'>
                            {
                                comments.map(comment => 
                                    <Comments 
                                        key={comment._id} 
                                        comment={comment} 

                                    />
                                )
                            }
                        </div>

                        {/* comment section */}
                        <form onSubmit={handleCommentSubmit} className="w-full max-w-md my-6 px-4">
                            <Field>
                                <Textarea 
                                    required
                                    name='commentText'
                                    placeholder="What's on your mind?"
                                    className={clsx(
                                        'mt-3 block w-full resize-none rounded-lg border-none px-3 py-1.5 text-sm/6 bg-base-200',
                                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                                    )}
                                    rows={3}
                                />
                            </Field>
                            <button className="btn my-2">{isPending ? 'Commenting..' : 'Comment'}</button>
                        </form>
                    </TabPanel>
                    
                    <TabPanel>
                        <p className="text-gray-700">Reviews go here.</p>
                    </TabPanel>
                    <TabPanel>
                        <p className="text-gray-700">Team members listed here.</p>
                    </TabPanel>
                </TabPanels>
            </TabGroup>

            {/* ✅ Image Modal */}
            {modalImage && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white text-2xl bg-black/50 rounded-full px-2"
                        >
                            ✕
                        </button>
                        <img
                            src={modalImage}
                            alt="Enlarged"
                            className="max-w-[90vw] max-h-[80vh] rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Example;