import { useState, useEffect } from "react";
import { storage } from "../firebase";

const useStorage = (file) => {
  //   const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const storageRef = storage.ref(Date.now() + "-" + file.name);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file]);
  return {
    progress,
    url,
    error,
  };
};
export default useStorage;
