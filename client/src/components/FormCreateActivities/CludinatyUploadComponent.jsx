import React, {useEffect, useRef} from 'react'

function CludinatyUploadComponent() {
    const clourinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(()=> {
        clourinaryRef.current = window.cloudinary;
        widgetRef.current = clourinaryRef.current.createUploadWidget({
          cloudName: "gym-go",
          uploadPreset: "gym-go",
        }, (error, result) => {
            if(!error && result && result.event === 'success') {
                document.getElementById('uploadedimage').setAttribute('src', result.info.secure_url);
                document
                  .getElementById("image")
                  .setAttribute("value", result.info.secure_url);
            }
            console.log(result)
        });
    }, []) 


  return (
    <div>
        <button onClick={() => widgetRef.current.open()}>
            Upload Image
        </button>
    </div>
  )
}

export default CludinatyUploadComponent