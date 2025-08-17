import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../../styles/swipper-custom.css'

import { useState } from 'react';
import { Field, Textarea } from '@headlessui/react'
import clsx from 'clsx'
import useAddComment from '../../../hooks/useAddComment';
import useComments from '../../../hooks/useComments';
import Comments from '../Comments/Comments';
import ReviewForm from '../Reviews/ReviewForm';
import ProductReviews from '../Reviews/ProductReviews';

const Tabs = ({ product }) => {
    const {_id: productId, screenshots = []} = product;
    const categories = ['Overview', 'Reviews', 'Team'];
    const [modalImage, setModalImage] = useState(null);

    const openModal = (img) => setModalImage(img);
    const closeModal = () => setModalImage(null);

    const {data: comments = []} = useComments(productId)
    const {mutateAsync, isPending} = useAddComment()

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        let commentText = form.commentText.value.replace(/[\r\n]+/g, '').trim();
        if (!commentText) return;
        try {
            await mutateAsync({productId, commentText})
            form.reset()
        } catch (error) { console.log(error); }
    }

    return (
        <div className="w-full max-w-4xl pt-6">
            <TabGroup>
                <TabList className="flex gap-4 pb-4 flex-wrap">
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
                    {/* Overview */}
                    <TabPanel>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={15}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            observer={true}
                            observeParents={true}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            {screenshots.map((screenShot, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        onClick={() => openModal(screenShot)}
                                        className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] rounded-2xl overflow-hidden cursor-pointer"
                                    >
                                        <img
                                            src={screenShot}
                                            alt=""
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <h3 className="text-lg font-bold mt-6 mb-2">Comments ({comments.length})</h3>
                        <div className='flex flex-col gap-4'>
                            {comments.map(comment => <Comments key={comment._id} comment={comment} />)}
                        </div>

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

                    {/* Reviews */}
                    <TabPanel>
                        <ProductReviews productId={productId}/>
                        <ReviewForm productId={productId} />
                    </TabPanel>

                    {/* Team */}
                    <TabPanel>
                        <p className="text-gray-700">Team members listed here.</p>
                    </TabPanel>
                </TabPanels>
            </TabGroup>

            {/* Image Modal */}
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
                            className="max-w-[90vw] max-h-[80vh] rounded-lg object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tabs;
