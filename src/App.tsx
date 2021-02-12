import React from 'react';
import './App.css';

import Webcam from 'react-webcam';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


function App() {

  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
	const [imgObj, setImgObj] = React.useState<HTMLImageElement>();
	const [cropImg, setCropImg] = React.useState<string>();

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
			
			const image = new Image();
			image.src = ''+imageSrc;

			setImgObj(image);

      setImgSrc(imageSrc);
    }
    
  }, [webcamRef, setImgSrc]);

  const [crop, setCrop] = React.useState<ReactCrop.Crop | undefined>();

	console.log(crop);

	function getCroppedImage(image: HTMLImageElement, crop: ReactCrop.Crop) {

		const canvas = document.createElement('canvas');
  	const scaleX = image.naturalWidth / image.width;
  	const scaleY = image.naturalHeight / image.height;

		if(crop.width && crop.height) {
			canvas.width = crop.width;
  		canvas.height = crop.height;
		}

  	const ctx = canvas.getContext('2d')!; // ! força o ts a entender que a expressão nunca poderá ser nula

		ctx.drawImage( // Não abusar dos ! depois
			image,
			crop.x! * scaleX,
			crop.y! * scaleY,
			crop.width! * scaleX,
			crop.height! * scaleY,
			0,
			0,
			crop.width!,
			crop.height!,
		);

		const base64Image = canvas.toDataURL('image/jpeg');

		setCropImg(base64Image);
	}
	
	function downloadImage(base64Img: string){
		var a = document.createElement("a"); //Create <a>
    a.href = base64Img; //Image Base64 Goes here
    a.download = "Image.jpeg"; //File name Here
    a.click(); //Downloaded file
	}

  return (
    <>
      <div className="ui container">
				<h3 className="ui center aligned header">Webcam Cropper</h3>
				<div className="ui two column stackable grid container">
					<div className="column">
						<h4 className="ui top attached header">Webcam</h4>
						<div className="ui attached segment" style={{ minHeight: 300 }}>
							<Webcam
								audio={false}
								ref={webcamRef}
								screenshotFormat="image/jpeg"
								width={500}
							/>
						</div>
						<div className="ui bottom attached segment">
							<button className="ui button red" onClick={capture}>Capture photo</button>
						</div>
					</div>
					<div className="column">
						<h4 className="ui top attached header">Crop</h4>
						<div className="ui attached segment" style={{ minHeight: 300 }}>
							{imgSrc && (<ReactCrop src={imgSrc} crop={crop} onChange={newCrop => setCrop(newCrop)}/>)}
						</div>
						<div className="ui attached segment">
							<button className="ui button red" onClick={cropimg => getCroppedImage(imgObj!, crop!)}>Crop Image</button>
						</div>
						<h4 className="ui attached header">Preview</h4>
						<div className="ui attached segment" style={{ minHeight: 300 }}>
							{cropImg && (<img src={cropImg} />)}
						</div>
						<div className="ui bottom attached segment">
							<button className="ui button blue" onClick={dwnimg => downloadImage(cropImg!)}>Download</button>
						</div>
					</div>
				</div>
      </div>
    </>
  );
}

{/* {imgSrc && (
              <img
                src={imgSrc}
              />
            )} */}
export default App;
