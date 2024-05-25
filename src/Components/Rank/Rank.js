import React from 'react';

const Rank = ({name,entries}) => {

	return (
		<div>

			<div className='white f3'>
			{`Welcome ${name}, your current image submission count is ...`}

			</div>

			<div className='white f1'>
			{entries}

			<div>

			<p>Here are some sample images you could try:</p> <br/>
			<p>https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqSO4f4I58Px2S9fObL3JCUWqwBBRZKd2uSzJQ3UqeY_tLa91Yev7TQsHJw&s</p> <br/>
			</div>


			</div>


		</div>


		);
}

export default Rank;


