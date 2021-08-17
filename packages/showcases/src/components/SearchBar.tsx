import React from "react";
import Image from "next/image";
import magnifyingGlass from "../images/magnifyingGlass.svg";
import imageIcon from "../images/image.svg";

const Dropdown = () => {
  return (
    <div className="absolute w-full bg-white -mb-7 rounded-md border text-center mt-0.5 shadow-md">
      <div className="py-12">
        <button className="border px-4 py-1.5 rounded mr-4">
          Select Files
        </button>{" "}
        or drop here
      </div>
    </div>
  );
};

const SearchInput = () => {
  return (
    <div className="flex flex-row items-center h-full">
      <div className="absolute ml-4 h-6 flex">
        <Image src={magnifyingGlass} alt="jina" layout="intrinsic" />
      </div>
      <div className="absolute right-0 mr-4 mb-0 flex border-l border-gray-400 pl-4 h-6">
        <Image
          src={imageIcon}
          alt="image"
          layout="intrinsic"
          className="cursor-pointer"
        />
      </div>
      <input
        className="rounded-md w-full h-full pl-16 border-none outline-none focus:shadow-lg transition-all duration-200"
        placeholder="Search"
      />
    </div>
  );
};

const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="text-white px-6 h-full flex items-center font-medium cursor-pointer"
      onClick={onClick}
    >
      Search
    </div>
  );
};

export const SearchBar = () => {
  function search() {}
  return (
    <div className="p-0.5 w-full bg-primary-500 rounded-lg flex flex-row">
      <div className="relative flex-1 h-12">
        <SearchInput />
        <Dropdown />
      </div>
      <SearchButton onClick={search} />
    </div>
  );
};
