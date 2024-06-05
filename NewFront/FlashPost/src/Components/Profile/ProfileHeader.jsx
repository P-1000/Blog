import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CiShare1 } from 'react-icons/ci';
import { AiFillEdit } from 'react-icons/ai';
import FollowersModal from './FollowerModal';
import ImageKit from 'imagekit';
import axios from 'axios';
import Edit from './Edit';

const ProfileHeader = ({ user, isCurrentUser, handleProfilePicClick, fileInputRef, handleFile, followState, follow, unfollow, isFollowing }) => {
    return (
        <div className='flex'>
            <div className='flex justify-center items-center'>
                <div className='p-10 ml-7 flex gap-6'>
                    <motion.img 
                        whileTap={{ scale: 0.9 }}
                        onClick={handleProfilePicClick}
                        className='w-32 h-32 rounded-full object-cover cursor-pointer object-right'
                        src={user.ProfilePic} />
                    <input
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        type="file" onChange={(file) => handleFile(file.target.files[0])} />
                    <div className='flex flex-col w-[75%]'>
                        <div>
                            <h1 className='text-3xl font-semibold mt-1 mb-2'>{user?.name}</h1>
                            <p>{user?.Bio ? user?.Bio : `Welcome to my blog! I'm ${user?.name}, a software developer with a passion for creating elegant and efficient solutions to complex problems.`}</p>
                        </div>
                        <div className='flex gap-4 mt-4'>
                            <h1 className='flex'>
                                <span className='text-sm font-semibold'>
                                    <FollowersModal 
                                        followers={user?.Followers?.length || 0} 
                                        fof={false}  
                                        following={user?.Following?.length || 0}
                                        user={user}
                                    />
                                </span>
                            </h1>
                            <h1 className='flex'>
                                <span className='text-sm font-semibold'>
                                    <FollowersModal 
                                        followers={user?.Followers?.length || 0} 
                                        following={user?.Following?.length || 0}  
                                        fof={true}
                                        user={user}
                                    />
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            {
                isCurrentUser ? (
                    <div className='mt-8 mr-28'>   
                        <div className='flex gap-4'>
                            <div className='border rounded-full mt-1 h-10 w-10'>
                                <CiShare1 className='text-xl mt-[10px] mx-[9.2px]'/>
                            </div>
                            <div className='flex flex-row-reverse gap-[6px] bg-primary text-white font-semibold py-2 px-4 rounded-full'>
                                <AiFillEdit className='text-xl mt-[4.7px]'/>
                                <button className='pr-1'><Edit /></button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='mt-8 mr-28'>   
                        <div className='flex gap-4'>
                            <div className='border rounded-full mt-1 h-10 w-10'>
                                <CiShare1 className='text-xl mt-[10px] mx-[9.2px]'/>
                            </div>
                            <div className='flex flex-row-reverse gap-[6px] bg-primary text-white font-semibold py-2 px-4 rounded-full'>
                                {isFollowing ? <HiBackspace className='text-xl mt-[4.7px]' /> : <HiPlus className='text-xl mt-[4.7px]' />}
                                <motion.button 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={isFollowing ? unfollow : follow}
                                    className='pr-1'>
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProfileHeader;
