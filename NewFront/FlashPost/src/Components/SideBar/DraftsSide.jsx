import React from "react";

function DraftsSide() {
  return (
    <div className="px-5">
      <div className="border rounded-md  bg-white   w-full font-bold text-primary py-6">
        <h1 className="mx-4 border-b">Drafts</h1>
        <div className="border-b-[1px] ">
          <div className="flex flex-col">
            <div>
              <div className="p-4">
                <h1>Title of the post goes here</h1>
                <p className="w-[20rem] font-normal ">
                  For more control, you can use the & character to mark where
                  .group should end up in the final
                </p>
              </div>
              <div>
                <img
                  className="w-full h-[10rem] object-cover"
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1680235676681/a134c9d9-3801-45e2-a8fc-e2ae011b3803.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DraftsSide;
