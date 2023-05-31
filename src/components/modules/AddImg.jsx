import { useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchImageChange } from '../../ApiService';

function AddImg() {
    const [imageHasBeenChosen, setImageHasBeenChosen] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const inputRef = useRef();

    function handleChooseAnotherImg() {
        setImageUrl('')
        inputRef.current.click();
    }

    function onImageChange(event) {
        const img = event.target.files[0];
        const data = new FormData();
        data.append('file', img);

        fetchImageChange(data)
            .then(data => {
                setImageUrl(data.fileUrl)
                localStorage.setItem('imgUrl', data.fileUrl)
                setImageHasBeenChosen(true)
            })
    }

    return (
        <div className="upload-image-container">
            <div className={`upload=image ${imageHasBeenChosen ? 'imageHasBeenChosen' : 'imageNotChosen'}`} >
                <label className="file-upload-label secondary-button">
                    <input type="file" className="file-upload-input" style={{ display: 'none' }} ref={inputRef} onChange={onImageChange} />
                    Выберите фото
                </label>
            </div>
            {!imageUrl && imageHasBeenChosen ?
                <div className="spinner-container"><Spinner animation="border" /></div>
                :
                <div className={`file-upload-image-conrainer ${imageUrl?.length ? 'imageUrlSeted' : 'noImgURL'}`} >
                    <img className="file-upload-image" src={imageUrl} />
                    <button className="file-upload-remove-button button" onClick={handleChooseAnotherImg}>Заменить фото</button>
                </div>
            }
        </div>
    );
}

export default AddImg;