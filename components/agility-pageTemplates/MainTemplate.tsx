import React, { Component } from 'react';
import { ContentZone } from '@agility/nextjs'

import { getModule } from "components/agility-modules"

const MainTemplate = (props:any) => {

	return (
	<div className="one-column-template">
		<ContentZone name='MainContentZone' {...props} getModule={getModule}  />
	</div>
	);

}

export default MainTemplate;