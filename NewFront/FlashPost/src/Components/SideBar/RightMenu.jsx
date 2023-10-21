import React, { useState, useEffect } from 'react';
import { SlLike } from 'react-icons/sl';
import { TfiCommentAlt } from 'react-icons/tfi';
import DraftsSide from './DraftsSide';
import axios from 'axios';
import ProfileImg from './ProfileImg';
import { Link } from 'react-router-dom';

function RightMenu() {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [authorImages, setAuthorImages] = useState({});

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://back-e0rl.onrender.com/api/blogs/trending`);
                setTrends(res.data?.slice(0, 3));
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(true);
                setLoading(false);
            }
        };
        fetchTrends();
    }, []);

    // Function to get author profile pic:
    const fetchAuthorImage = async (author) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/users/userProfile/${author}`);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchAuthorImages = async () => {
            const images = {};
            for (const trend of trends) {
                const author = trend?.Author;
                const image = await fetchAuthorImage(author);
                images[author] = image;
            }
            setAuthorImages(images);
        };
        fetchAuthorImages();
    }, [trends]);

    return (
        <div className='sticky top-[-1px]'>
            <div className='mt-3 p-5 mx-1'>
                <div className='border rounded-md bg-white w-full font-bold text-primary py-6'>
                    <h1 className='mx-4 border-b'>Trending Articles</h1>
                    <div className='border-b-[1px]'>
                        {trends &&
                            trends.map((trend) => (
                                <div key={trend.id}>
                                    <div className='flex gap-[.4em] mx-4 mt-2'>
                                    <div>
                                    <ProfileImg name={trend?.Author} />
                                    </div>
                                        <div className='ml-2'>
                                          <Link to={`/blog/@${trend?.Author}/${trend?._id}`}>
                                          <h1 className='text-sm font-medium'>{trend?.title}</h1>
                                            </Link>
                                            <div className='mt-1'>
                                                <h1 className='text-sm text-slate-500 font-normal'>@{trend?.Author}</h1>
                                            </div>
                                            <div className='flex gap-3 mb-3'>
                                                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                                                    <SlLike className='inline-block mr-1' />
                                                    {trend.likes}
                                                </button>
                                                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                                                    <TfiCommentAlt className='inline-block mr-1' />87
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div>
                <DraftsSide />
            </div>
        </div>
    );
}

export default RightMenu;
