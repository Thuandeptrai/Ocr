import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import config from "./config";
import { Buffer } from "buffer";
import axios from "axios";

// Ocr App
function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  // Create Function upload image
  function uploadImage(e) {
    const file = e.target.files[0];
    // Check size of image larger than 10MB
    if (file.size > 1024 * 1024 * 10) {
      alert("Image size should be less than 10MB");
      return;
    }
    setImage(file);
  }
  async function convertImageToText(e) {
    // Convert Image To Base64
    const imageProcess = new FormData();
    imageProcess.append("urls", image);
    imageProcess.append("file", image);

    // Send image to server
    setLoading(true);
    const data = await axios
      .post(config.API_URL, imageProcess, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Basic ${Buffer.from(`${config.API_KEY}:`).toString(
            "base64"
          )}`,
        },
      })
      .then((res) => {
        // Example response
        //   {
        //     "results": [
        //         {
        //             "filename": "1234.jpg",
        //             "page_data": [
        //                 {
        //                     "page": 0,
        //                     "size": {},
        //                     "words": [
        //                         {
        //                             "text": "/",
        //                             "xmin": 391,
        //                             "ymin": 348,
        //                             "xmax": 416,
        //                             "ymax": 397
        //                         },
        //                         {
        //                             "text": "gvine",
        //                             "xmin": 457,
        //                             "ymin": 392,
        //                             "xmax": 1017,
        //                             "ymax": 548
        //                         },
        //                         {
        //                             "text": "-",
        //                             "xmin": 576,
        //                             "ymin": 444,
        //                             "xmax": 591,
        //                             "ymax": 455
        //                         },
        //                         {
        //                             "text": "t",
        //                             "xmin": 988,
        //                             "ymin": 447,
        //                             "xmax": 1068,
        //                             "ymax": 524
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 1047,
        //                             "ymin": 428,
        //                             "xmax": 1084,
        //                             "ymax": 471
        //                         },
        //                         {
        //                             "text": "apaot",
        //                             "xmin": 402,
        //                             "ymin": 485,
        //                             "xmax": 1105,
        //                             "ymax": 838
        //                         },
        //                         {
        //                             "text": "-",
        //                             "xmin": 866,
        //                             "ymin": 550,
        //                             "xmax": 871,
        //                             "ymax": 551
        //                         },
        //                         {
        //                             "text": "1",
        //                             "xmin": 830,
        //                             "ymin": 567,
        //                             "xmax": 860,
        //                             "ymax": 613
        //                         },
        //                         {
        //                             "text": "/",
        //                             "xmin": 241,
        //                             "ymin": 690,
        //                             "xmax": 335,
        //                             "ymax": 784
        //                         },
        //                         {
        //                             "text": "-",
        //                             "xmin": 560,
        //                             "ymin": 780,
        //                             "xmax": 562,
        //                             "ymax": 786
        //                         },
        //                         {
        //                             "text": "7",
        //                             "xmin": 909,
        //                             "ymin": 751,
        //                             "xmax": 968,
        //                             "ymax": 822
        //                         },
        //                         {
        //                             "text": "|",
        //                             "xmin": 930,
        //                             "ymin": 769,
        //                             "xmax": 939,
        //                             "ymax": 779
        //                         },
        //                         {
        //                             "text": "a",
        //                             "xmin": 924,
        //                             "ymin": 820,
        //                             "xmax": 933,
        //                             "ymax": 831
        //                         },
        //                         {
        //                             "text": "n",
        //                             "xmin": 364,
        //                             "ymin": 845,
        //                             "xmax": 633,
        //                             "ymax": 986
        //                         },
        //                         {
        //                             "text": "-",
        //                             "xmin": 490,
        //                             "ymin": 872,
        //                             "xmax": 494,
        //                             "ymax": 874
        //                         },
        //                         {
        //                             "text": "D",
        //                             "xmin": 626,
        //                             "ymin": 905,
        //                             "xmax": 664,
        //                             "ymax": 950
        //                         },
        //                         {
        //                             "text": "~",
        //                             "xmin": 668,
        //                             "ymin": 912,
        //                             "xmax": 780,
        //                             "ymax": 931
        //                         },
        //                         {
        //                             "text": "a",
        //                             "xmin": 774,
        //                             "ymin": 883,
        //                             "xmax": 869,
        //                             "ymax": 953
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 355,
        //                             "ymin": 997,
        //                             "xmax": 364,
        //                             "ymax": 1014
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 344,
        //                             "ymin": 1019,
        //                             "xmax": 352,
        //                             "ymax": 1031
        //                         },
        //                         {
        //                             "text": "n",
        //                             "xmin": 270,
        //                             "ymin": 1088,
        //                             "xmax": 429,
        //                             "ymax": 1197
        //                         },
        //                         {
        //                             "text": "|",
        //                             "xmin": 472,
        //                             "ymin": 1096,
        //                             "xmax": 485,
        //                             "ymax": 1104
        //                         },
        //                         {
        //                             "text": "ortin",
        //                             "xmin": 492,
        //                             "ymin": 952,
        //                             "xmax": 955,
        //                             "ymax": 1146
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 940,
        //                             "ymin": 1033,
        //                             "xmax": 958,
        //                             "ymax": 1048
        //                         },
        //                         {
        //                             "text": "/",
        //                             "xmin": 958,
        //                             "ymin": 1035,
        //                             "xmax": 1012,
        //                             "ymax": 1075
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 1121,
        //                             "ymin": 1035,
        //                             "xmax": 1144,
        //                             "ymax": 1049
        //                         },
        //                         {
        //                             "text": "|",
        //                             "xmin": 926,
        //                             "ymin": 1073,
        //                             "xmax": 948,
        //                             "ymax": 1081
        //                         },
        //                         {
        //                             "text": "-",
        //                             "xmin": 1032,
        //                             "ymin": 1071,
        //                             "xmax": 1041,
        //                             "ymax": 1076
        //                         },
        //                         {
        //                             "text": "-",
        //                             "xmin": 1054,
        //                             "ymin": 1069,
        //                             "xmax": 1058,
        //                             "ymax": 1071
        //                         },
        //                         {
        //                             "text": "g",
        //                             "xmin": 182,
        //                             "ymin": 1110,
        //                             "xmax": 723,
        //                             "ymax": 1479
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 413,
        //                             "ymin": 1109,
        //                             "xmax": 429,
        //                             "ymax": 1144
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 885,
        //                             "ymin": 1115,
        //                             "xmax": 911,
        //                             "ymax": 1143
        //                         },
        //                         {
        //                             "text": "//",
        //                             "xmin": 943,
        //                             "ymin": 1096,
        //                             "xmax": 1039,
        //                             "ymax": 1182
        //                         },
        //                         {
        //                             "text": "-",
        //                             "xmin": 723,
        //                             "ymin": 1201,
        //                             "xmax": 729,
        //                             "ymax": 1203
        //                         },
        //                         {
        //                             "text": "ne",
        //                             "xmin": 709,
        //                             "ymin": 1243,
        //                             "xmax": 956,
        //                             "ymax": 1313
        //                         },
        //                         {
        //                             "text": "|",
        //                             "xmin": 1046,
        //                             "ymin": 1291,
        //                             "xmax": 1054,
        //                             "ymax": 1291
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 1033,
        //                             "ymin": 1256,
        //                             "xmax": 1051,
        //                             "ymax": 1270
        //                         },
        //                         {
        //                             "text": "|",
        //                             "xmin": 242,
        //                             "ymin": 1359,
        //                             "xmax": 248,
        //                             "ymax": 1362
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 355,
        //                             "ymin": 1364,
        //                             "xmax": 362,
        //                             "ymax": 1379
        //                         },
        //                         {
        //                             "text": "|",
        //                             "xmin": 847,
        //                             "ymin": 1353,
        //                             "xmax": 867,
        //                             "ymax": 1358
        //                         },
        //                         {
        //                             "text": "/",
        //                             "xmin": 884,
        //                             "ymin": 1320,
        //                             "xmax": 932,
        //                             "ymax": 1366
        //                         },
        //                         {
        //                             "text": "/",
        //                             "xmin": 939,
        //                             "ymin": 1358,
        //                             "xmax": 971,
        //                             "ymax": 1407
        //                         },
        //                         {
        //                             "text": "/",
        //                             "xmin": 1076,
        //                             "ymin": 1321,
        //                             "xmax": 1156,
        //                             "ymax": 1380
        //                         },
        //                         {
        //                             "text": "a",
        //                             "xmin": 1115,
        //                             "ymin": 1336,
        //                             "xmax": 1127,
        //                             "ymax": 1343
        //                         },
        //                         {
        //                             "text": "e",
        //                             "xmin": 135,
        //                             "ymin": 1484,
        //                             "xmax": 358,
        //                             "ymax": 1587
        //                         },
        //                         {
        //                             "text": "au",
        //                             "xmin": 347,
        //                             "ymin": 1456,
        //                             "xmax": 617,
        //                             "ymax": 1555
        //                         },
        //                         {
        //                             "text": "Cis",
        //                             "xmin": 603,
        //                             "ymin": 1409,
        //                             "xmax": 786,
        //                             "ymax": 1535
        //                         },
        //                         {
        //                             "text": "u",
        //                             "xmin": 830,
        //                             "ymin": 1479,
        //                             "xmax": 927,
        //                             "ymax": 1533
        //                         },
        //                         {
        //                             "text": "I",
        //                             "xmin": 700,
        //                             "ymin": 1543,
        //                             "xmax": 718,
        //                             "ymax": 1593
        //                         },
        //                         {
        //                             "text": "C",
        //                             "xmin": 696,
        //                             "ymin": 1593,
        //                             "xmax": 735,
        //                             "ymax": 1637
        //                         }
        //                     ],
        //                     "raw_text": "/ gvine - t I apaot - 1 / - 7 | a n - D ~ a I I n | ortin I / I | - - g I I // - ne | I | I | / / / a e au Cis u I C "
        //                 }
        //             ]
        //         }
        //     ]
        // }
        console.log(res.data.results[0].page_data[0].raw_text);
        setText(res.data.results[0].page_data[0].raw_text);
      });

    setLoading(false);
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
          className={`bg-blue-500 w-64 h hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 ${
            image == null || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Convert
        </button>
      </div>
      {/* display the result here using text arena */}
      <div className="text-center mt-3">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">Result</h1>
        <textarea
          className="w-64 h-32 border-2 border-gray-300 p-2"
          value={text}
        ></textarea>
      </div>
    </div>
  );
}

export default App;
