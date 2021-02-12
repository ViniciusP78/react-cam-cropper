import React from 'react';
import './App.css';

import Webcam from 'react-webcam';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


function App() {

  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      console.log(imageSrc);
    }
    
  }, [webcamRef, setImgSrc]);

  const [crop, setCrop] = React.useState<ReactCrop.Crop | undefined>();

  return (
    <>
      <div className="ui container">
        <div className="ui segment">
          <div className="content">
            <div className="header">Webcam</div>
          </div>
          <div className="content">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={500}
            />
          </div>
          <div className="content">
            <button className="ui button red" onClick={capture}>Capture photo</button>
            {imgSrc && (
              <img
                src={imgSrc}
              />
            )}
          </div>
        </div>
      </div>
      {imgSrc && (<ReactCrop src={imgSrc} crop={crop} onChange={newCrop => setCrop(newCrop)}/>)}
      
    </>
  );
}

export default App;
