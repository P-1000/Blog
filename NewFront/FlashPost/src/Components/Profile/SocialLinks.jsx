import React from 'react';
import { BsGlobe } from 'react-icons/bs';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';

const SocialLinks = ({ loc, memebersince }) => {
    return (
        <div className='border py-3 float-center rounded-md mx-20 pb-2 mb-2'>
            <div className='flex mt-2 gap-14 justify-center '>
                <div className='flex justify-center items-center '>
                    <div className='flex gap-4'>
                        <div className='flex gap-2 h-8 '>
                            <BsGlobe className='text-lg text-gray-600 mt-[1.8px]' />
                        </div>
                        <div className='flex gap-2 h-8'>
                            <AiFillLinkedin className='text-xl text-gray-600 mt-[1px]' />
                        </div>
                        <div className='flex gap-2 h-8'>
                            <AiFillGithub className='text-xl mt-[1px] text-gray-600' />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex gap-1'>
                        <CiLocationOn className='text-xl text-gray-600' />
                        <h1 className='text-sm font-normal text-gray-600'>{loc ? loc : "Tokyo, Japan"}</h1>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <SlCalender className='text-xl text-gray-600' />
                    <h1 className='text-sm text-gray-600'>
                        Member since <span className='font-semibold text-sm'> {memebersince?.slice(0, 4)}</span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default SocialLinks;
