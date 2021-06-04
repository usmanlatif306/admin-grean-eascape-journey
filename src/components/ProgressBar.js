import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

export default function ProgressBar({ file, setFile, setUrl }) {
  const { progress, url } = useStorage(file);
  useEffect(() => {
    if (url) {
      setUrl(url);
      setFile();
    }
  }, [url]);
  return (
    <div className="progress mt-2">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: progress + "%" }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {Math.ceil(progress)}
      </div>
    </div>
  );
}
