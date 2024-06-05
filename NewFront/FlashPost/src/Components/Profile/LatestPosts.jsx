import React from 'react';
import SelfPosts from './SelfPosts';

const LatestPosts = () => {
    return (
        <div className='mt-8 border py-3 float-center rounded-md mx-20'>
            <div>
                <h1 className='text-xl font-semibold justify-center px-10 tracking-wide'>My Latest Posts</h1>
            </div>
            <div>
                <SelfPosts /> 
            </div>
        </div>
    );
};

export default LatestPosts;
