import './App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { onImageChangeQuery, onAddPostClickQuery } from './api-service';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPost({ userToken }) {
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState();
    const [imageHasBeenChosen, setImageHasBeenChosen] = useState(false);
    const [regClickState, setRegClickState] = useState(false);
    const [regResponse, setRegResponse] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef();

    function handleChooseAnotherImg() {
        setImageUrl('')
        inputRef.current.click();
    }

    function onDescriptionChange(event) {
        const target = event.target.value;
        setDescription(target);
    }

    function onImageChange(event) {
        const img = event.target.files[0];
        const data = new FormData();
        data.append('file', img);

        onImageChangeQuery(data)
            .then(data => setImageUrl(data.fileUrl))
            .then(setImageHasBeenChosen(true))
    }

    function onAddPostClick() {
        setRegClickState(true)
        onAddPostClickQuery(userToken, description, imageUrl)
            .then(setRegResponse(true))
            .then(navigate('/'))
            .catch(error => console.error('ошибка:', error))
    }

    function onQuitToLogin() {
        navigate('/login');
    }

    function navigateToMain() {
        navigate('/');
    }

    return (
        <div className="page-container">
            <div className="header-container">
                <div className="page-header">
                    <h1 className="logo" onClick={navigateToMain}>instapro</h1>
                    <button className="header-button add-or-login-button">
                        <div title="Добавить пост" className="add-post-sign"></div>
                    </button>
                    <button title="Роман" className="header-button logout-button" onClick={onQuitToLogin}>Выйти</button>
                </div>
            </div>
            {!regResponse && regClickState ?
                <div className="spinner-container"><Spinner animation="border" /></div>
                :
                <div className="form">
                    <h3 className="form-title">Добавить пост</h3>
                    <div className="upload-image-container">
                        <div className="upload=image"></div>
                    </div>
                    <div className="form-inputs">
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
                                <div className="file-upload-image-conrainer" style={{ display: imageUrl ? 'flex' : 'none' }}>
                                    <img className="file-upload-image" src={imageUrl} />
                                    <button className="file-upload-remove-button button" onClick={handleChooseAnotherImg}>Заменить фото</button>
                                </div>
                            }
                        </div>
                        <label className="label-description">
                            Опишите фотографию:
                            <textarea className="input textarea" rows="4" onChange={onDescriptionChange}></textarea>
                        </label>
                        <button className="button" id="add-button" onClick={onAddPostClick}>Добавить</button>
                    </div>
                </div>
            }

        </div >
    );
}

export default AddPost;