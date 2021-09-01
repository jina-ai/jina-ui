import React, {ChangeEvent, MutableRefObject, useRef} from "react";
import Image from "next/image";
import magnifyingGlass from "../../images/magnifyingGlass.svg";
import crossIcon from "../../images/cross.svg";
import fileIcon from "../../images/file.svg"

type InputRef = MutableRefObject<HTMLInputElement | null>;

export const SearchInput = ({
                                inputRef,
                                addFiles,
                            }: {
    inputRef: InputRef;
    addFiles: (files: File[]) => void;
}) => {
    const fileRef = useRef<HTMLInputElement>(null);

    function triggerFileSelect() {
        fileRef.current?.click();
    }

    function deleteInput() {
        if (inputRef.current) inputRef.current.value = ""
    }

    function handleSelectFiles(e: ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (fileList) addFiles(Array.from(fileList));
    }

    return (
        <div className="flex flex-row items-center h-full">
            <div className="absolute ml-4 h-6 flex">
                <Image src={magnifyingGlass} alt="jina" layout="intrinsic"/>
            </div>
            <div className="absolute right-0 mr-4 mb-0 flex pl-4 h-6">
                <Image
                    src={crossIcon}
                    alt="image"
                    layout="intrinsic"
                    className="cursor-pointer"
                    onClick={deleteInput}
                />
                <div className='border-l border-gray-400 mx-2'>
                </div>
                <Image
                    src={fileIcon}
                    alt="image"
                    layout="intrinsic"
                    className="cursor-pointer"
                    onClick={triggerFileSelect}
                />
                <input
                    type="file"
                    multiple
                    ref={fileRef}
                    style={{display: "none"}}
                    onChange={handleSelectFiles}
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
