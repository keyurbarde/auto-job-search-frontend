import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import uploadSVG from "../../svgs/upload.svg";
import rightArrowSVG from "../../svgs/rightArrow.svg";

const Home = () => {
  const [file, setFile] = useState();
  const [extractedData, setExtractedData] = useState();

  const handleFileSet = (e) => {
    setFile(e.target.files[0]);

    e.preventDefault();

    // if (!file) {
    //   alert("Please select a file.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("file", e.target.files[0]); // Append the file to FormData

    async function sendResume() {
      try {
        // Send POST request with FormData
        const res = await fetch("http://localhost:8000/resume/", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setExtractedData(data);
        } else {
          const errorData = await res.json();
          alert(errorData.error || "Something went wrong");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      }
    }
    sendResume();
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">
        Find <span>Personalized</span> Job Listings in 3 steps
      </h1>

      <div className="upload-container">
        {file ? (
          <div className="upload-after-file">
            <Link
              to="/search"
              style={{ textDecoration: "none" }}
              state={extractedData}
            >
              <button className="upload-continue-btn btn">
                <span>Continue with {file.name}</span>
                <img src={rightArrowSVG} />
              </button>
            </Link>
            <button className="upload-cancel-btn btn" onClick={() => setFile()}>
              X
            </button>
          </div>
        ) : (
          <div className="upload-cv-btn">
            <label for="upload-cv-input" className="input-label btn">
              <img src={uploadSVG} />
              <span>Upload your CV</span>
            </label>
            <input
              id="upload-cv-input"
              type="file"
              onChange={handleFileSet}
              hidden
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
