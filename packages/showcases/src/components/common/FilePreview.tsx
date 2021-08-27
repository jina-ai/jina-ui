import { XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react'
import { CompactCaption } from './CompactCaption';
import { MediaPreview } from './MediaPreview';

export const FilePreview = ({ file, remove }: { file: File; remove?: () => void }) => {
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