import React from 'react';
import { SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiRedux } from 'react-icons/si';
import { TiHtml5 } from 'react-icons/ti';
import { FaReact, FaJava } from 'react-icons/fa';
import { RiVuejsFill } from 'react-icons/ri';
import { DiNodejs, DiMongodb, DiDocker } from 'react-icons/di';

const TechStack = () => {
    return (
        <div className='mt-8 border py-3 float-center rounded-md mx-20'>
            <h1 className='text-xl font-semibold justify-center ml-96 tracking-wide'>My Tech Stack</h1>
            <div>
                <div className='flex gap-8 p-2 justify-center'>
                    <SiJavascript className='text-3xl text-primary mt-4' />
                    <TiHtml5 className='text-3xl text-primary mt-4' />
                    <SiTypescript className='text-3xl text-primary mt-4' />
                    <FaReact className='text-3xl text-primary mt-4' />
                    <RiVuejsFill className='text-3xl text-primary mt-4' />
                    <SiNextdotjs className='text-3xl text-primary mt-4' />
                    <DiNodejs className='text-3xl text-primary mt-4' />
                    <DiMongodb className='text-3xl text-primary mt-4' />
                    <DiDocker className='text-3xl text-primary mt-4' />
                    <SiTailwindcss className='text-3xl text-primary mt-4' />
                    <SiRedux className='text-3xl text-primary mt-4' />
                    <FaJava className='text-3xl text-primary mt-4' />
                </div>
            </div>
        </div>
    );
};

export default TechStack;
