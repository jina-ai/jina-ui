import React, {
  useCallback,
  useRef,
  useState,
} from "react";
import { SearchInput } from "./SearchInput";
import { DropZone } from "./DropZone";

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
  const [files, setFiles] = useState<File[]>([]);

  function search() {
    alert("search");
  }

  const addFiles = useCallback((files: File[]) => {
    setFiles((prev) => {
      return [...prev, ...files];
    });
  }, []);

  function removeFile(filename: string) {
    setFiles((prev) => {
      return prev.filter((file) => file.name !== filename);
    });
  }

  return (
    <div className="p-0.5 w-full bg-primary-500 rounded-lg flex flex-row jina-component">
      <div className="relative flex-1 h-12">
        <SearchInput inputRef={inputRef} addFiles={addFiles} />
        <DropZone files={files} addFiles={addFiles} removeFile={removeFile} />
      </div>
      <SearchButton onClick={search} />
    </div>
  );
};
