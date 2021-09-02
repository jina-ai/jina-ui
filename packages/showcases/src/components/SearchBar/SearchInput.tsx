import React, {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useRef,
} from "react";
import Image from "next/image";
import jinaIcon from "../../images/magnifyingGlass.svg";
import imageIcon from "../../images/image.svg";
import searchingIcon from "../../images/searching.gif";

type InputRef = MutableRefObject<HTMLInputElement | null>;

export const SearchInput = ({
  inputRef,
  addFiles,
  onEnter,
  searching,
}: {
  inputRef: InputRef;
  addFiles: (files: File[]) => void;
  onEnter?: () => void;
  searching: boolean;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  function triggerFileSelect() {
    fileRef.current?.click();
  }

  function handleSelectFiles(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (fileList) addFiles(Array.from(fileList));
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && onEnter) {
      return onEnter();
    }
  }

  return (
    <div className="flex flex-row items-center h-full bg-white rounded-md">
      <div className="absolute ml-4 h-6 w-6 flex">
        <Image
          src={searching ? searchingIcon : jinaIcon}
          alt="jina"
          layout="intrinsic"
          objectFit="contain"
        />
      </div>
      <div className="absolute right-0 mr-4 mb-0 flex border-l border-gray-400 pl-4 h-6">
        <Image
          src={imageIcon}
          alt="image"
          layout="intrinsic"
          className="cursor-pointer"
          onClick={triggerFileSelect}
        />
        <input
          type="file"
          multiple
          ref={fileRef}
          style={{ display: "none" }}
          onChange={handleSelectFiles}
        />
      </div>
      <input
        className={`rounded-md w-full h-full pl-16 border-none outline-none focus:shadow-lg transition-all duration-200 ${
          searching ? "bg-primary-500 bg-opacity-10 animate-pulse" : ""
        }`}
        disabled={searching}
        placeholder={searching ? "Searching..." : "Search"}
        ref={inputRef}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
