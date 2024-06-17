import React, { useEffect } from "react";
import EditorjsRender from "../MainContent/EditorjsRender";
import { useDispatch, useSelector } from "react-redux";

const Preview = () => {
  const { title, description, tags, coverUrl, Content } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    console.log(Content);
  }, [Content]);
  
  return (
    <div className="">
      {Content ? (
        <div>
          <div className="flex ">
            <div className="w-1/2">
              <EditorjsRender data={Content} />
            </div>
            <div
            className="w-1/2"
            >
              
            </div>
          </div>
        </div>
      ) : (
        <div>banaki </div>
      )}
    </div>
  );
};

export default Preview;
