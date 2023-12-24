import React, { useRef, useState } from "react";
import "./App.css";
import default_img from "./assets/default_image.svg";
import Loader from "./assets/Loader";

const App = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    setLoading(true);
    try {
      if (inputRef.current.value === "") return 0;
      const response = await fetch(
        " https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: "512x512",
          }),
        }
      );
      let data = await response.json();
      let data_array = data.data;
      setImageUrl(data_array[0].url);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>
        AI Image <span>Generator</span>
      </h1>
      <main>
        {loading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
          <div>
            <img src={imageUrl == "/" ? default_img : imageUrl} alt="img" />
          </div>
        )}
      </main>
      <div className="bottom">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something to generate"
        />
        <button
          onClick={() => {
            imageGenerator();
          }}
          type="button"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default App;
