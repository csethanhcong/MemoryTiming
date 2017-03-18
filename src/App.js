import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import moment from 'moment';


import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  floatingLabelStyle: {
    color: blue500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};

class App extends Component {

	constructor (props) {
		super(props);

		this.state = {
			baseDate: '',
			stepDay: '',
			resultDate: '',
		}
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

		let resultDate = moment(baseDate).add(stepDay, 'days');
		resultDate = moment(resultDate).format("dddd, DD-MMMM-YYYY");
		this.setState({ resultDate: resultDate });
	};

	formateDateInput = (date) => {
		return moment(date).format("dddd, DD-MMMM-YYYY");
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
										formatDate={this.formateDateInput}
										onChange={this.handleChangeBaseDate}
									/>
								</div>
							</MuiThemeProvider>
							<MuiThemeProvider>
								<div>
									<TextField
							      floatingLabelText="Chọn số ngày"
							      floatingLabelStyle={styles.floatingLabelStyle}
							      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
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
