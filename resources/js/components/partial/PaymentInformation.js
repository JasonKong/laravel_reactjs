import React from 'react';

class PaymentInformation extends React.Component {
    render() {
        if (this.props.currentStep !== 2) {
            return null
        }

        return(
            <fieldset>
                <div className="form-card">
                    <h2 className="fs-title">Payment Information</h2>
                    <label className="pay">Card Holder Name*</label>
                    <input type="text" name="holder_name" placeholder=""
                           value={this.props.card.holder_name}
                           onChange={this.props.handleChange}
                    />
                    <div className="row">
                        <div className="col-9">
                            <label className="pay">Card Number*</label>
                            <input type="number" name="number" placeholder=""
                                   value={this.props.card.number}
                                   onChange={this.props.handleChange}/>
                        </div>
                        <div className="col-3"><label className="pay">CVC*</label>
                            <input type="password" name="cvc" placeholder="***"
                                   value={this.props.card.cvc}
                                   onChange={this.props.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3"><label className="pay">Expiry Date*</label>
                        </div>
                        <div className="col-9">
                            <select className="list-dt" id="month" name="expiry_month"
                                    value={this.props.card.expiry_month}
                                    onChange={this.props.handleChange} >
                                <option defaultValue>Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select className="list-dt" id="year" name="expiry_year"
                                    value={this.props.card.expiry_year}
                                    onChange={this.props.handleChange} >
                                <option defaultValue>Year</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select></div>
                    </div>
                </div>
            </fieldset>
        )
    }
}

export default PaymentInformation;
