import React, {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useRef,
} from "react";
import Image from "next/image";
import magnifyingGlass from "../../images/magnifyingGlass.svg";
import imageIcon from "../../images/image.svg";

type InputRef = MutableRefObject<HTMLInputElement | null>;

export const SearchInput = ({
  inputRef,
  addFiles,
  onEnter,
}: {
  inputRef: InputRef;
  addFiles: (files: File[]) => void;
  onEnter?: () => void;
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
    if (e.key === "enter" && onEnter) {
      return onEnter();
    }
  }

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
        className="rounded-md w-full h-full pl-16 border-none outline-none focus:shadow-lg transition-all duration-200"
        placeholder="Search"
        ref={inputRef}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
