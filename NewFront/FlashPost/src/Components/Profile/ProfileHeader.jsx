import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CiShare1 } from 'react-icons/ci';
import { AiFillEdit } from 'react-icons/ai';
import FollowersModal from './FollowerModal';
import { HiPlus, HiBackspace } from 'react-icons/hi';
import ImageKit from 'imagekit';
import axios from 'axios';
import Edit from './Edit';

const ProfileHeader = ({ user, isCurrentUser, follow, unfollow, isFollowing }) => {
    return (
        <div className='flex'>
            <div className='flex justify-center items-center'>
                <div className='p-10 ml-7 flex gap-6'>
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
           
        </div>
    );
};

export default ProfileHeader;
