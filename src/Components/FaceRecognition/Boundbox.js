import React from 'react';
import './Boundbox.css';


const Boundbox = ({boxTop,boxRight,boxLeft,boxDown}) => {

	return (
		<div>
			<div
			className='bounding-box'
			style = {{top: boxTop, right: boxRight, 
			bottom: boxDown, left: boxLeft}} >
			</div>
		</div>

	
	);
	
}

export default Boundbox;