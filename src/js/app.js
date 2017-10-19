import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';
import exampleAsset from '../assets/react.png';

export default class Hello extends Component {
	render() {
		return (
			<div>
				<p>Hello, react!</p>
				<img src={exampleAsset} alt="Example image" width={100} height={100} />
			</div>
		)
	}
}

render(<Hello />, document.getElementById('app'));