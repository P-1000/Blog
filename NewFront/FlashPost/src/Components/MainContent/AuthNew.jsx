import React from "react";
import { Link } from "react-router-dom";
import AuthoImg from "./AuthoImg";

const AuthNew = (props) => {
  const { name } = props;
  const post_id = props.post_id;
  return (
    <>
      <div className="w-8/12 m-auto flex mt-6 items-center place-content-center justify-between ">
        <Link to={`/profile/@${name}`}>
          <div className="flex">
            <div className="flex gap-5 ">
              <div className="mx-3">
                {/* <img  dummy image for author before profile pic
            className='w-12 h-12 rounded-full'
            src='https://i.scdn.co/image/ab67616d0000b273dc70b075d2db0dc27729fa6b' /> */}
                <AuthoImg author_name={name} />
              </div>
              <div className="mt-[4px]">
                <h1 className="text-sm font-medium capitalize">{name}</h1>
                <h2 className="text-[13px] font-light">Mar 28</h2>
              </div>
            </div>
          </div>
        </Link><div>
            <h2>
                5 min read
            </h2>
        </div>
      </div>
    </>
  );
};

export default AuthNew;
