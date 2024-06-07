import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef(null);
  const DEBOUNCE_DELAY = 300;

  const handleChange = (event) => {
    console.log(event.target.value)
    const value = event.target.value;
    setSearch(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      navigate(`/search/${value}`);
    }, DEBOUNCE_DELAY);
  };

  useEffect(() => {
    if (search == "" || 
        search.length < 1 ||
        search == undefined || 
        search == null || 
        search == " " ) { 

      navigate("/Home");
    }
  }, [search]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-row-reverse focus-within:border rounded-full lg:px-4 lg:py-2 lg:pr-[16rem] text-sm focus-within:border-secondary">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        className="border-none focus:outline-none lg:w-full text-primary"
        placeholder="Search FlashPost"
      />
      <div className="h-full flex items-center lg:pr-2">
        <CiSearch className="text-xl text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
