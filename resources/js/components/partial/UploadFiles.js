import React from 'react';

class UploadFiles extends React.Component {

    renderFiles() {
        const  files  = this.props.files;

        if (!files) return false;

        const item = Object.keys(files).map( (key, i) => {
            const file = key;
            return (
                <li key={i}>{file}</li>
            )
        });

        return (
            <ul>{item}</ul>
        )
    };

    render() {
        const files = this.renderFiles();
        if (this.props.currentStep !== 3) {
            return null
        }

        return(
            <fieldset>
                <div className="form-card">
                    <h2 className="fs-title">Upload files</h2>
                    <div className="file-field">
                        <label className="pay">Upload files(pdf only)</label>
                        <input type="file" name="files" accept="application/pdf" className="w-100" onChange={this.props.handleChangeFiles} multiple/>
                        {files}
                    </div>
                </div>
            </fieldset>
        )
    }
}


export default UploadFiles;
