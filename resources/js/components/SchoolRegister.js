import React from 'react';
import ReactDOM from 'react-dom';

import SchoolInformation from './partial/SchoolInformation';
import PaymentInformation from './partial/PaymentInformation';
import AccountInformation from './partial/AccountInformation';
import UploadFiles from './partial/UploadFiles';

class SchoolRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1, // Default is Step 1
            school: {
                name: '',
                email: '',
                logo: '',
            },
            files: {},
            card: {
                holder_name: '',
                number:'',
                cvc: '',
                expiry_month: '',
                expiry_year: '',
            },
            user: {
                username: '',
                password: '',
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeForCard = this.handleChangeForCard.bind(this)
        this.handleChangeForAccount = this.handleChangeForAccount.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.handleChangeFiles = this.handleChangeFiles.bind(this)
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
    }

    handleChange(event) {

        const school = Object.assign({}, this.state.school);
        const value = event.target.value;
        school[event.target.name] = value;

        this.setState({
            school: school
        });
    }

    handleChangeForCard(event) {

        const card = Object.assign({}, this.state.card);
        const value = event.target.value;
        card[event.target.name] = value;

        this.setState({
            card: card
        });
    }

    handleChangeForAccount(event) {

        const user = Object.assign({}, this.state.user);
        const value = event.target.value;
        user[event.target.name] = value;

        this.setState({
            user: user
        });
    }

    handleChangeImage(event) {
        const school = Object.assign({}, this.state.school);

        let files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;

        const file = event.target.files[0];

        let reader = new FileReader();

        reader.onload = (e) => {
            school['logo'] = e.target.result;
            this.setState({
                school: school
            })
        };
        reader.readAsDataURL(file);
    }

    handleChangeFiles(event) {
        let files = Object.assign({}, this.state.files);

        let _files = event.target.files || event.dataTransfer.files;
        if (!_files.length) return;

        Object.keys(_files).map( (key, i) => {
            const file = _files[key]

            let reader = new FileReader();

            reader.onload = (e) => {
                files[file.name] = e.target.result;
            };
            reader.readAsDataURL(file);
        })

        this.setState({
            files: files
        })

    }

    handleSubmit(event) {
        event.preventDefault()

        axios.post(`/schools`, this.state)
            .then(res => res)
            .then(
                (result) => {
                    console.log(result);
                    if (result.data.errors) {
                        this.setState({
                            isLoaded: true,
                            errors: result.data.errors
                        });
                    } else {

                    }

                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (errors) => {
                    console.log(errors);
                }
            )
    }
    _next() {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 3? 4: currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev() {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    get previousButton(){
        let currentStep = this.state.currentStep;
        if(currentStep !==1){
            return (
                <input type="button"
                       name="previous"
                       className="previous action-button-previous"
                       value="Previous"
                       onClick={this._prev}/>
            )
        }
        // ...else return nothing
        return null;
    }

    get nextButton(){
        let currentStep = this.state.currentStep;

        if(currentStep < 4){
            return (
                <input
                    type="button"
                    className="next action-button"
                    value="Next"
                    onClick={this._next}
                />
            )
        }
        // else if(currentStep === 4)  {
        //     return (
        //         <input
        //             type="submit"
        //             className="next action-button"
        //             value="Submit"
        //         />
        //     )
        // }
        // ...else render nothing
        return null;
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-0">
                    <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 mt-3 mb-2">
                        <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                            <h1>School Register Form</h1>
                            <p>Step {this.state.currentStep} </p>
                            <form onSubmit={(e) => this.handleSubmit(e)} id="school-register-form">
                                <SchoolInformation
                                    currentStep={this.state.currentStep}
                                    handleChange={this.handleChange}
                                    handleChangeImage={this.handleChangeImage}
                                    school={this.state.school}
                                />
                                <PaymentInformation
                                    currentStep={this.state.currentStep}
                                    handleChange={this.handleChangeForCard}
                                    card={this.state.card}
                                />
                                <UploadFiles
                                    currentStep={this.state.currentStep}
                                    handleChangeFiles={this.handleChangeFiles}
                                    files={this.state.files}
                                />
                                <AccountInformation
                                    currentStep={this.state.currentStep}
                                    handleChange={this.handleChangeForAccount}
                                    user={this.state.user}
                                />
                                {this.previousButton}
                                {this.nextButton}
                                {this.state.currentStep === 4 && (
                                    <input
                                        type="submit"
                                        className="next action-button"
                                        value="Submit"
                                    />
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<SchoolRegister />, document.getElementById('root'));
