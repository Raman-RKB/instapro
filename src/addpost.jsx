import './App.css';

function AddPost() {


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
                                <input type="file" className="file-upload-input" style={{ display: 'none' }} />
                                Выберите фото
                            </label>
                        </div>
                    </div>
                    <label className="label-description">
                        Опишите фотографию:
                        <textarea className="input textarea" rows="4"></textarea>
                    </label>
                    <button className="button" id="add-button">Добавить</button>
                </div>
            </div>
        </div>
    );
}

export default AddPost;

