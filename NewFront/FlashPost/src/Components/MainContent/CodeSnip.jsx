import React, { useEffect, useRef } from "react";
// import Prism from "prismjs";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import the specific language support from Prism.js if needed
// import "prismjs/components/prism-javascript";

const CodeSnippet = ({ code }) => {
  // const codeRef = useRef(null);

  // useEffect(() => {
  //   // Ensure the codeRef is available
  //   if (codeRef.current) {
  //     // Highlight the code using Prism
  //     Prism.highlightElement(codeRef.current);
  //   }
  // }, [code]);

  return (
    <div className="font-light">
      {/* <SyntaxHighlighter language="javascript"  theme={dark}  >{code}</SyntaxHighlighter> */}
    </div>
  );
};

export default CodeSnippet;
