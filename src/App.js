import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import config from "./config";

// Ocr App
function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // Create Function upload image
  function uploadImage(e) {
    const file = e.target.files[0];
    setImage(file);
  }
  async function convertImageToText(e) {
    // Convert Image To Base64
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      console.log(reader.result);
      // Send Base64 to API
      setLoading(true);
      const data = await fetch(config.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          key: config.API_KEY,
        },
        body: JSON.stringify({
          base64: reader.result,
          language: "eng",
        }),
      })
      const text = await data.json()
      setLoading(false)
      console.log(text)
    };
  }
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">OCR App</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 0h20v20H0z" fill="currentColor" />
              <path
                className="fill-current"
                d="M0 3h20v1.5H0zM0 9.5h20V11H0zM0 16h20v1.5H0z"
              />
            </svg>
          </button>
        </div>
      </nav>
      {/* Text Center */}

      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800">OCR App</h1>
        <p className="text-gray-500">Optical Character Recognition</p>
      </div>
      {/* Image Upload Center */}
      {image == null ? (
        <div className="flex justify-center">
          <div className="mt-10">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
              {/* Create Upload icon */}

              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              {/* // Attach function upload image */}
              <input type="file" className="hidden" onChange={uploadImage} />
            </label>
            <p className="text-xs italic text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="mt-10">
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                {/* Create Upload icon */}
              <input type="file" className="hidden" onChange={uploadImage} />

                Image Uploaded
              </label>
            </div>
          </div>
        </>
      )}
       {/* Preview Image */}
        {image && (
          <div className="flex justify-center ">
            <div className="mt-10 w-64">
              <img src={URL.createObjectURL(image)} alt="preview" />
            </div>
          </div>
        )}
      {/* Convert Button Center */}
      <div className="text-center mt-3">
        <button
          onClick={convertImageToText}
          disabled={image == null || loading}
          className={`bg-blue-500 w-64 h hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 ${image == null || loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Convert
        </button>
      </div>
      {/* display the result here using text arena */}
      <div className="text-center mt-3">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">Result</h1>
        <textarea className="w-64 h-32 border-2 border-gray-300 p-2"></textarea>
      </div>
    </div>
  );
}

export default App;
