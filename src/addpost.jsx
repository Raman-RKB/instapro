import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPost() {
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState();

    const navigate = useNavigate();

    function onDescriptionChange(event) {
        const target = event.target.value;
        setDescription(target);
    }

    function onImageChange(event) {
        const target = event.target.value;
        setImageUrl(target);
    }

    function onAddPostClick() {
        console.log('попало в onAddPostClick');
        fetch('https://webdev-hw-api.vercel.app/api/v1/prod/instapro', {
            method: "POST",
            body: JSON.stringify({
                description: description,
                imageUrl: imageUrl
            })
        })
            .then(navigate('/'))
    }

    return (
        <div className="page-container">
            <div className="header-container">
                <div className="page-header">
                    <h1 className="logo">instapro</h1>
                    <button className="header-button add-or-login-button">
                        <div title="Добавить пост" className="add-post-sign"></div>
                    </button>
                    <button title="Роман" className="header-button logout-button">Выйти</button>
                </div>
            </div>
            <div className="form">
                <h3 className="form-title">Добавить пост</h3>
                <div className="form-inputs">
                    <div className="upload-image-container">
                        <div className="upload=image">
                            <label className="file-upload-label secondary-button">
                                <input type="file" className="file-upload-input" style={{ display: 'none' }} onChange={onImageChange} />
                                Выберите фото
                            </label>
                        </div>
                    </div>
                    <label className="label-description">
                        Опишите фотографию:
                        <textarea className="input textarea" rows="4" onChange={onDescriptionChange}></textarea>
                    </label>
                    <button className="button" id="add-button" onClick={onAddPostClick}>Добавить</button>
                </div>
            </div>
        </div>
    );
}

export default AddPost;

