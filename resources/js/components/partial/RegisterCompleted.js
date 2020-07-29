import React from 'react';

class RegisterCompleted extends React.Component{

    render() {
        if (this.props.currentStep !== 5) { // Prop: The current step
            return null
        }

        return (
            <fieldset>
                <div className="form-card">
                    <div>
                        <h2 className="fs-title">Succeed! </h2>
                        <p>Your school has been successfully registered with your account.</p>
                        <p>For the next step, you can <a href="#">add more user accounts</a> or <a href="#">login here</a></p>
                    </div>
                </div>
            </fieldset>
        )
    }
}

export default RegisterCompleted;
