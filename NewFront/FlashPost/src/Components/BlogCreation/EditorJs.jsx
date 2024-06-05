import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import ImageKit from "imagekit";
import "./TextEditor.css";
import { useDispatch } from "react-redux";
import { updateContent } from "../../redux/formDataSlice";
import CodeTool from "@editorjs/code";

const EDITTOR_HOLDER_ID = "editorjs";

const TextEditor = (props) => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = React.useState(props.data);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const dispatch = useDispatch();

  console.log(editorData);

  useEffect(() => {
    dispatch(updateContent(editorData));
    props.setdata(editorData);
  }, [editorData]);

  const initEditor = () => {
    const imagekit = new ImageKit({
      publicKey: "public_URvjzrf8cUDwCO0A6NK3VOYWg1U=",
      urlEndpoint: "https://ik.imagekit.io/cwq19b8fi",
      privateKey: "private_gR6kfpKknhbtLmBe7OXtwKJ19h0=",
      authenticationEndpoint: "http://localhost:5173/auth",
    });

    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "ERROR",
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const savedData = await editor.save();
        setEditorData(savedData);
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a heading...",
            levels: [1, 2, 3, 4],
          },
          defaultLevel: 2,
        },
        list: List,
        table: Table,
        code: CodeTool,
        image: {
          class: ImageTool,
          inlineToolbar: false,
          config: {
            uploader: {
              async uploadByFile(file) {
                try {
                  const result = await imagekit.upload({
                    file: file,
                    fileName: file.name,
                    folder: "/editor-images",
                  });

                  return {
                    success: 1,
                    file: {
                      url: result.url,
                    },
                  };
                } catch (error) {
                  console.error("Error uploading image:", error);
                  return {
                    success: 0,
                    message: "Error uploading image",
                  };
                }
              },
            },
          },
        },
      },
      i18n: {
        messages: {},
      },
    });
  };

  return (
    <div className="pt-24 bg-white h-full w-full min-h-[100vh]">
      <button
        className="mx-10 my-2 border px-4  hover:bg-black hover:px-6 rounded-sm hover:rounded-md hover:text-white transition-all duration-300 ease-in-out"
        onClick={props.onBack}
      >
        Back
      </button>
      <div id={EDITTOR_HOLDER_ID}></div>
      <style>
        {`
          /* Define custom styles for header levels */
          .text-editor-header {
            font-size: 2em;
            font-weight: bold;
            color: #333;
          }
          .text-editor-header-2 {
            font-size: 1.5em;
            font-weight: bold;
            color: #555;
          }
          .text-editor-header-3 {
            font-size: 1.2em;
            font-weight: bold;
            color: #777;
          }
          .text-editor-header-4 {
            font-size: 1em;
            font-weight: normal;
            color: #999;
          }
          h1 {
            font-size: 2.6em;
            font-weight: bold;
           
          }
          h2 {
            font-size: 1.8em;
            font-weight: bold;
  
          }
          h3 {
            font-size: 1.4em;
            font-weight: bold;
          }
          h4{
            font-size: 1em;
            font-weight: normal;
          }
        `}
      </style>
    </div>
  );
};

export default TextEditor;
