import React from 'react';

class SchoolInformation extends React.Component{

    render() {
        if (this.props.currentStep !== 1) { // Prop: The current step
            return null
        }

        return (
            <fieldset>
                <div className="form-card">
                    <div>
                        <h2 className="fs-title">School Information</h2>
                        <label className="pay">School Name*</label>
                        <input type="text" id="name" name="name" placeholder="School Name"
                               value={this.props.school.name}
                               onChange={this.props.handleChange}/>
                        <label className="pay">School Email*</label>
                        <input type="email" id="email" name="email"  placeholder="School Email"
                               value={this.props.school.email}
                               onChange={this.props.handleChange}/>
                    </div>
                    <div className="file-field">
                        <label className="pay">School Logo</label>
                        <div className="z-depth-1-half mb-2 pl-5 pr-5">
                            <img src={this.props.school.logo ? this.props.school.logo : "image/logo-placeholder.png"}
                                 className="img-fluid"
                                 alt="School logo placeholder"/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="btn action-button upload ">
                                <span>Choose Image</span>
                                <input className="image-upload-input" type="file" id="img" name="img" accept="image/*" onChange={this.props.handleChangeImage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        )
    }
}

export default SchoolInformation;
