import React, { Component } from 'react';
import ContentZone from 'components/agility-global/ContentZone'

const MainTemplate = (props:any) => {

	return (
	<div className="one-column-template">
		<ContentZone name='MainContentZone' {...props} />
	</div>
	);

}

export default MainTemplate;