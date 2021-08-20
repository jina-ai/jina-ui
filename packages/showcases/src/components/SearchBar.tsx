import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import magnifyingGlass from "../images/magnifyingGlass.svg";
import imageIcon from "../images/image.svg";
import { XIcon } from "@heroicons/react/solid";

type InputRef = MutableRefObject<HTMLInputElement | null>;

function useDropZone(ref: MutableRefObject<HTMLDivElement | null>) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    function showDrag(e: DragEvent) {
      setIsDragging(true);
    }
    function hideDrag(e: DragEvent) {
      const { clientX, clientY, type } = e;
      if (type === "drop" || (clientX === 0 && clientY === 0))
        setIsDragging(false);
    }
    function handleDrop(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (!e.dataTransfer) return;
      const files = Array.from(e.dataTransfer.files);
      setFiles(files);
    }
    function doNothing(e: DragEvent) {
      e.preventDefault();
    }

    const element = ref.current;

    if (element) {
      element.addEventListener("drop", handleDrop);
    }

    document.addEventListener("dragenter", showDrag);
    document.addEventListener("dragleave", hideDrag);
    document.addEventListener("dragend", hideDrag);
    document.addEventListener("drop", hideDrag);
    document.addEventListener("dragover", doNothing);

    return () => {
      if (element) {
        element.removeEventListener("drop", handleDrop);
      }
      document.removeEventListener("dragenter", showDrag);
      document.removeEventListener("dragleave", hideDrag);
      document.removeEventListener("drop", hideDrag);
      document.removeEventListener("dragover", doNothing);
    };
  }, [ref]);

  return { isDragging, files };
}

const Dropdown = ({ fileRef }: { fileRef: InputRef }) => {
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const { isDragging, files: droppedFiles } = useDropZone(dropAreaRef);

  useEffect(() => {
    setFiles((prev) => {
      return [...prev, ...droppedFiles];
    });
  }, [droppedFiles]);

  function selectFiles() {
    fileRef.current?.click();
  }

  function removeFile(fileName: string) {
    setFiles((prev) => {
      let updated = prev.filter((file) => file.name !== fileName);
      return [...updated];
    });
  }

  return (
    <div
      className={`box-content ${
        isDragging || files.length ? "h-40" : "h-0"
      } none overflow-hidden absolute w-full bg-white -mb-7 rounded-md text-center mt-0.5 shadow-md transition-all duration-200`}
      ref={dropAreaRef}
    >
      <div className="h-full w-full p-2">
        <div
          className={`flex items-center text-center h-full border border-transparent ${
            isDragging
              ? "border-primary-500 bg-primary-500 bg-opacity-10 border-dashed"
              : ""
          }`}
        >
          {files.length ? (
            files.map((file, idx) => (
              <FilePreview
                key={file.name}
                file={file}
                remove={() => removeFile(file.name)}
              />
            ))
          ) : (
            <div className="mx-auto">
              <button
                className="border px-4 py-1.5 rounded mr-4"
                onClick={selectFiles}
              >
                Select Files
              </button>{" "}
              or drop here
            </div>
          )}
        </div>
        <input type="file" ref={fileRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

const FilePreview = ({
  file,
  small,
  remove,
}: {
  file: File;
  small?: boolean;
  remove?: () => void;
}) => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="h-full bg-gray-50 w-40 flex flex-col rounded relative mr-2 select-none">
      {remove && (
        <XIcon
          className="h-4 absolute -right-1.5 -top-1.5 cursor-pointer"
          onClick={remove}
        />
      )}
      <div className="flex-1 overflow-hidden flex items-center">
        <MediaPreview type={file.type} src={src} />
      </div>
      <div className="p-1">
        <CompactCaption text={file.name} />
      </div>
    </div>
  );
};

const CompactCaption = ({ text }: { text: string }) => {
  return (
    <div className="overflow-ellipsis whitespace-nowrap overflow-hidden">
      {text}
    </div>
  );
};

/* eslint @next/next/no-img-element: "off" */

const MediaPreview = ({
  type,
  src,
  rounded = true,
}: {
  type: string;
  src: string;
  rounded?: boolean;
}) => {
  if (type.startsWith("image"))
    return (
      <img
        src={src}
        alt="Image"
        className={`max-h-full max-w-full mx-auto${rounded ? " rounded" : ""}`}
      />
    );
  return null;
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
    <div className="p-0.5 w-full bg-primary-500 rounded-lg flex flex-row jina-component">
      <div className="relative flex-1 h-12">
        <SearchInput inputRef={inputRef} />
        <Dropdown fileRef={fileRef} />
      </div>
      <SearchButton onClick={search} />
    </div>
  );
};
