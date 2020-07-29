import React from 'react';

class AccountInformation extends React.Component {
    render() {
        if (this.props.currentStep !== 4) {
            return null
        }

        return(
            <fieldset>
                <div className="form-card">
                    <h2 className="fs-title">Account Information</h2>
                    <input type="text" name="username" placeholder="UserName"
                           value={this.props.user.username}
                           onChange={this.props.handleChange}/>
                    <input type="password" name="password" placeholder="Password"
                        // value={this.props.account.username}
                           onChange={this.props.handleChange}/>
                    <input type="password" name="cpassword" placeholder="Confirm Password"
                           onChange={this.props.handleChange}/>
                </div>
            </fieldset>
        )
    }
}

export default AccountInformation;
