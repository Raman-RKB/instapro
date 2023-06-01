import { useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { onImageChangeQuery } from './ApiService';

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

        onImageChangeQuery(data)
            .then(data => {
                setImageUrl(data.fileUrl)
                localStorage.setItem('imgUrl', data.fileUrl)
                setImageHasBeenChosen(true)
            })
    }

    return (
        <div className="upload-image-container">
            <div className="upload=image" style={{ display: imageHasBeenChosen ? 'none' : 'flex' }} >
                <label className="file-upload-label secondary-button">
                    <input type="file" className="file-upload-input" style={{ display: 'none' }} ref={inputRef} onChange={onImageChange} />
                    Выберите фото
                </label>
            </div>
            {!imageUrl && imageHasBeenChosen ?
                <div className="spinner-container"><Spinner animation="border" /></div>
                :
                <div className="file-upload-image-conrainer" style={{ display: imageUrl?.length ? 'flex' : 'none' }}>
                    <img className="file-upload-image" src={imageUrl} />
                    <button className="file-upload-remove-button button" onClick={handleChooseAnotherImg}>Заменить фото</button>
                </div>
            }
        </div>
    );
}

export default AddImg;