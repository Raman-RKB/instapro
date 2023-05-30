import './style/AddPost.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAddPostClickQuery } from './ApiService';
import AddImg from './AddImg'
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPost({ userToken }) {
    const [description, setDescription] = useState("");
    const [regClickState, setRegClickState] = useState(false);
    const [regResponse, setRegResponse] = useState(false);

    const navigate = useNavigate();

    function onDescriptionChange(event) {
        const target = event.target.value;
        setDescription(target);
    }
    // -------------------------------------------------------------
    function onAddPostClick() {
        setRegClickState(true)
        onAddPostClickQuery(userToken, description, localStorage.getItem('imgUrl'))
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
                        <AddImg />
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