import React from "react";
import { Link } from "react-router-dom";
import AuthoImg from "./AuthoImg";
import BasicPopover from "./BasicPopover";
import { IoMdTime } from "react-icons/io";

const AuthNew = (props) => {
  const { name } = props;
  const post_id = props.post_id;
  return (
    <>
      <div className="m-auto flex my-4 items-center place-content-center justify-between ">
        <Link to={`/profile/@${name}`}>
          <div className="flex">
            <div className="flex gap-2 ">
              <div className="mx-3">
                {/* <img  dummy image for author before profile pic
            className='w-12 h-12 rounded-full'
            src='https://i.scdn.co/image/ab67616d0000b273dc70b075d2db0dc27729fa6b' /> */}
                <AuthoImg author_name={name} />
              </div>
              <div className=" flex items-center gap-2">
                <h1 className="text-base font-medium capitalize">{name}</h1>
                <div className="dot"></div>
                <div className="flex items-center">
                  <span className="text-base">{props.date}</span>
                  <div className="dot"></div>
                  <div className="flex  items-center">
                    <IoMdTime className="w-5 mx-1 h-5" />
                    <span>{props.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {/* <div>
          <h2>5 min read</h2>
          <div>
            <BasicPopover post_id={post_id} />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AuthNew;
