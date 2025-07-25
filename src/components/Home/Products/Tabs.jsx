import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../../styles/swipper-custom.css'
import { useState } from 'react';


import { Description, Field, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'


const Example = ({ product }) => {
  const categories = ['Overview', 'Reviews', 'Team'];
console.log(product);

const {screenshots} =product;

 const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

  return (
    <div className="w-full max-w-4xl  py-6">
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
                    screenshots.map((screenShot,index)=> <SwiperSlide key={index}><div onClick={() => openModal(screenShot)}  className="   max-h-[260px] "><img className='object-cover rounded-2xl' src={screenShot} alt="" /></div></SwiperSlide>)
                }
                


              </Swiper>


            </div>


             {/* comment section */}
                     <div className="w-full max-w-md my-6 px-4">
      <Field>
        {/* <Label className="text-sm/6 font-medium text-white">Description</Label>
        <Description className="text-sm/6 text-white/50">This will be shown under the product title.</Description> */}
        <Textarea 
        
            placeholder="Whats On your mind?"
          className={clsx(
            'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
          rows={3}
        />
      </Field>

      <button className="btn my-2">Comment</button>
                     </div>
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
