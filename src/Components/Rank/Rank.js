import React from 'react';

const Rank = ({name,entries}) => {

	return (
		<div>

			<div className='white f3'>
			{`Hello ${name}, your current image submission count is ...`}

			</div>

			<div className='white f1'>
			{entries}

			</div>


		</div>


		);
}

export default Rank;


