import { createContext, useContext, useEffect, useState } from "react";

export const uploadContext = createContext();

export const useUpload = () => {
  return useContext(uploadContext);
};

export const UploadProvider = ({ children }) => {
  const [upload, setUpload] = useState(false);
  return (
    <uploadContext.Provider
      value={{
        upload,
        setUpload,
      }}
    >
      {children}
    </uploadContext.Provider>
  );
};
