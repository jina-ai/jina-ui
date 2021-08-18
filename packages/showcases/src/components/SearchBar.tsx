import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import magnifyingGlass from "../images/magnifyingGlass.svg";
import imageIcon from "../images/image.svg";

type InputRef = MutableRefObject<HTMLInputElement | null>;

const Dropdown = ({ fileRef }: { fileRef: InputRef }) => {
  const [isDragging, setIsDragging] = useState(false);

  function selectFiles() {
    fileRef.current?.click();
  }

  useEffect(() => {
    function showDrag(e:any) {
      
      setIsDragging(true);
    }
    function hideDrag(e:any) {
      console.log("leave drag",e)
      setIsDragging(false);
    }
    document.addEventListener("dragenter", showDrag);
    // document.addEventListener("dragstart", showDrag);
    document.addEventListener("dragleave", hideDrag);
    return () => {
      document.removeEventListener("dragenter", showDrag);
      // document.removeEventListener("dragstart", showDrag);
      // document.removeEventListener("dragexit", hideDrag);
      // document.removeEventListener("dragend", hideDrag);
      // document.removeEventListener("dragleave", hideDrag);
    };
  }, []);

  return (
    <div className="absolute w-full bg-white -mb-7 rounded-md border text-center mt-0.5 shadow-md">
      <div
        className={`py-12 m-2 ${
          isDragging
            ? "border border-primary-500 bg-primary-500 bg-opacity-10 border-dashed"
            : ""
        }`}
      >
        <button
          className="border px-4 py-1.5 rounded mr-4"
          onClick={selectFiles}
        >
          Select Files
        </button>{" "}
        or drop here
      </div>
      <input type="file" ref={fileRef} style={{ display: "none" }} />
    </div>
  );
};

const SearchInput = ({ inputRef }: { inputRef: InputRef }) => {
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
        ref={inputRef}
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
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function search() {
    const text = inputRef.current?.value;
    const files = inputRef.current?.files;
  }

  return (
    <div className="p-0.5 w-full bg-primary-500 rounded-lg flex flex-row">
      <div className="relative flex-1 h-12">
        <SearchInput inputRef={inputRef} />
        <Dropdown fileRef={fileRef} />
      </div>
      <SearchButton onClick={search} />
    </div>
  );
};
