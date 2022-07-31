import React from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function ProductClassification() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const savedToGallary = () => {
    var base64Data = imgSrc.replace(/^data:image\/jpg;base64,/, "");
    require("fs").writeFile("out.jpg", base64Data, "base64", function (err) {
      console.log(err);
    });
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    savedToGallary();
    console.log(new Image(imageSrc));
  }, [webcamRef, setImgSrc]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();

    try {
      form_data.append("file1", imgSrc);
      console.log(form_data);
      let res = await axios.post(
        "http://127.0.0.1:5000/upload-image",
        form_data,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(imgSrc);
  return (
    <div className="productClassification">
      <>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <button onClick={capture}>Capture photo</button>
        <button onClick={onSubmit}>Send</button>
        {imgSrc && <img src={imgSrc} />}
      </>
    </div>
  );
}
