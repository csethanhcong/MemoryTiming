import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500, teal500} from 'material-ui/styles/colors';
import moment from 'moment';


import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  floatingLabelStyle: {
    color: 'rgb(0, 188, 212)',
  },
  floatingLabelFocusStyle: {
    color: 'rgb(0, 188, 212)',
  },
	textFieldStyle: {
		color: '#266d90',
		textTransform: 'capitalize',
	}
};

const DATE_FORMAT = "dddd, DD / MM / YYYY";

class App extends Component {

	constructor (props) {
		super(props);

		this.state = {
			baseDate: '',
			stepDay: '',
			resultDate: '',
			errorText: '',
		}

		// Initalize locale for moment
		moment.locale('vi');
	}

	handleChangeBaseDate = (e, date) => {
		this.setState({ baseDate: date });
	};

	handleChangeStepDate = (e, numOfDay) => {
		this.setState({ stepDay: numOfDay });
	};

	calculateDate = () => {
		const {
			baseDate,
			stepDay,
		} = this.state;

		const stepDayInNumber = Number(stepDay);
		if (Number.isNaN(stepDayInNumber)) {
			return this.setState({ errorText: 'Nhập số thôi nhé, ahihi!' });
		}

		let resultDate = moment(baseDate).add(stepDay, 'days');
		resultDate = moment(resultDate).format(DATE_FORMAT);
		this.setState({
			resultDate: resultDate ,
			errorText: '',
		});
	};

	formateDateInput = (date) => {
		return moment(date).format(DATE_FORMAT);
	};

  render() {
    return (
			<div>
				<header>
						<nav className="navbar custom-navbar" role="navigation">
							<div className="container">
								<div className="navbar-header">
									<a className="navbar-brand custom-brand" href="javascript:void(0);"><i className="glyphicon glyphicon-time"></i>  Memory Timing</a>
								</div>
							</div>
						</nav>
				</header>

				<div className="container">
					<div className="row">
						<div className="col-md-offset-3 col-md-6 text-center wrapper">
							<MuiThemeProvider>
								<div>
									<DatePicker
										hintText="Chọn mốc kỷ niệm"
										mode="landscape"
										inputStyle={styles.textFieldStyle}
										formatDate={this.formateDateInput}
										onChange={this.handleChangeBaseDate}
									/>
								</div>
							</MuiThemeProvider>
							<MuiThemeProvider>
								<div>
									<TextField
							      floatingLabelText="Nhập số ngày"
							      floatingLabelStyle={styles.floatingLabelStyle}
							      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    errorText={this.state.errorText}
										onChange={this.handleChangeStepDate}
							    />
								</div>
							</MuiThemeProvider>
							<MuiThemeProvider>
								<div>
									<RaisedButton label="Tính" primary={true} onClick={this.calculateDate}/>
								</div>
							</MuiThemeProvider>
							<MuiThemeProvider>
								<div>
									<TextField
							      id="text-field"
										floatingLabelText="Kết quả"
							      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
										inputStyle={styles.textFieldStyle}
							      value={this.state.resultDate}
							    />
								</div>
							</MuiThemeProvider>
						</div>
					</div>
				</div>

				<footer>
				  <div className="container text-right">
				    Made with ♥ by <a href="http://fb.com/csethanhcong"><span className="name">Akaisama</span></a>
				  </div>
				</footer>
			</div>
    );
  }
}

export default App;
