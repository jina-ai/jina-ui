import React, { useState } from "react";
import { fileToBase64 } from "@jina-ai/jinajs";

export const Base64Demo = () => {
  const [output, setOutput] = useState("");

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    const generatedOutput = await fileToBase64(file);
    setOutput(generatedOutput);
  };

  return (
    <div className="rounded shadow-lg p-4 bg-white">
      <div className="border-b text-2xl font-medium">
        Base64 Conversion Demo (imported from @jina-ai/jinajs)
      </div>
      <input
        type="file"
        multiple
				className="mt-4"
        id="attach-files-button"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
      <div className="mt-4 bg-gray-50 rounded p-4 break-words font-mono">{output||"Select file to see its base64 encoding"}</div>
    </div>
  );
};
