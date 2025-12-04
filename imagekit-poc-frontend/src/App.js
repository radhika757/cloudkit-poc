import { useState } from "react";
import axios from "axios";
import ImageKit from "imagekit-javascript";

const ik = new ImageKit({
  publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT,
});

function App() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const upload = async () => {
    if (!file) return alert("Select a file");

    // 1) Get auth params from Nest backend
    const auth = await axios.get("http://localhost:3000/imagekit/auth")
                            .then(res => res.data);

    // 2) Upload
    const result = await ik.upload({
      file,
      fileName: "test_" + Date.now() + ".jpg",
      token: auth.token,
      signature: auth.signature,
      expire: auth.expire,
    });

    setUploadedUrl(result.url);
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>ImageKit Direct Upload POC</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>

      {uploadedUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedUrl} width={250} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
