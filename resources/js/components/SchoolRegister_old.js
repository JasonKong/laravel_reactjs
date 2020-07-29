import React from 'react';
import ReactDOM from 'react-dom';

import InputText from './partial/InputText';

class SchoolRegister_old extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: {
                name: '',
                email: '',
                logo: '',
                files: {}
            },
            errors: null,
            isLoaded: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.handleChangeFiles = this.handleChangeFiles.bind(this)
    }

    componentDidMount() {



        // fetch("/schools/create")
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 items: result.items
        //             });
        //         },
        //         // Note: it's important to handle errors here
        //         // instead of a catch() block so that we don't swallow
        //         // exceptions from actual bugs in components.
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     )
    }

    submitHandler(event) {

        event.preventDefault();

        axios.post(`/schools`, this.state.school)
            // .then(response => {
            //     console.log(response)
            // })
            // .catch(error => {
            //     console.log(error)
            // });
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

    handleChange(event) {

        const school = Object.assign({}, this.state.school);

        const value = event.target.value;

        school[event.target.name] = value;

        this.setState({
            school: school
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
        const school = Object.assign({}, this.state.school);

        let files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;

        Object.keys(files).map( (key, i) => {
            const file = files[key]

            let reader = new FileReader();

            reader.onload = (e) => {
                school['files'][file.name] = e.target.result;
            };
            reader.readAsDataURL(file);
        })

        this.setState({
            school: school
        })

    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }

    renderFiles() {
        const { files } = this.state.school;

        if (!files) return false;

        const item = Object.keys(files).map( (key, i) => {
            const file = key;
            return (
                <li key={i}>
                    {file}
                </li>
            )
        });

        return (
            <ul>
                {item}
            </ul>
        )

    };

    render() {
        const errors = this.state.errors;
        const files = this.renderFiles();
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">School Register</div>
                            <div className="card-body">
                                <form name="my-form" onSubmit={(e) => this.submitHandler(e)} action="" method="">
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">School Name</label>
                                        <div className="col-md-6">
                                            <input type="text" placeholder="School Name" value={this.state.school.name} className="form-control" name="name" onChange={this.handleChange}/>
                                            {errors && ('name' in errors) && <span className="text-danger">{errors['name'][0]}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">School Email</label>
                                        <div className="col-md-6">
                                            <input type="text" placeholder="School email" className="form-control" name="email" value={this.state.school.email} onChange={this.handleChange}/>
                                            {errors && ('email' in errors) && <span className="text-danger">{errors['email'][0]}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="upload_log" className="col-md-4 col-form-label text-md-right">School logo</label>
                                        <div className="col-md-6">
                                            <div className="file-field">
                                                <div className="z-depth-1-half mb-2">
                                                    <img src={this.state.school.logo ? this.state.school.logo : "image/logo-placeholder.png"}
                                                         className="img-fluid"
                                                         alt="School logo placeholder"/>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <div className="btn btn-primary">
                                                        <span>Choose Image</span>
                                                        <input className="image-upload-input" type="file" id="img" name="img" accept="image/*" onChange={this.handleChangeImage}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="upload_log" className="col-md-4 col-form-label text-md-right">Upload Files</label>
                                        <div className="col-md-6">
                                            <input type="file" name="files" accept="application/pdf" className="w-100" onChange={this.handleChangeFiles} multiple/>
                                            {files}
                                        </div>
                                    </div>

                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<SchoolRegister_old />, document.getElementById('root'));
