import React, { useEffect, useState } from "react";
import Followers from "./Followers";
import Following from "./Following";

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const { followers, following, fof, user } = props;
  const [flr, setFlr] = useState(user.Followers);
  const [flg, setFlg] = useState(user.Following);





  //followers
  const [members, setMembers] = useState([]);
  //following
  const [members2, setMembers2] = useState([]);



  async function fetchMembers(id) {
    const res = await fetch(`https://back-e0rl.onrender.com/api/users/fetchId/${id}`);
    const data = await res.json();
    setMembers((prevMembers) => [...prevMembers, data]); // Using the functional update to access the previous state.
  }
  
  useEffect(() => {
    // Check if flr is not null or undefined before mapping
      flr?.forEach((id) => {
        
        fetchMembers(id);
      });

  }, []); // Include flr in the dependency array to fetch members again when it changes.
  

  console.log(members)

  return (
    <>
    <button
      className=" text-black active:bg-secondary active:px-2   text-sm  rounded   outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={() => setShowModal(true)}
    >
     <div className="flex gap-10">
    {
      fof ?  null :  <div>
     {followers ? followers : '0'} Followers
     </div>
    }
    {
      fof ?  <div>
     {following ? following : '0'} Following
     </div> : null
    }
     </div>
    </button>
    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                 {
                      fof ? 'Following' : 'Followers'
                 }
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
              {
                  fof ?
                   <div>
                    <Following flr={user} />
                   </div>
                   :
                      <div> 
                    <Followers flr={user} />
                      </div>

              }
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
  );
}
