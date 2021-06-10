import React, { Component } from 'react';
import {getModule} from "components/agility-modules"


 function ContentZone({ name, page, dynamicPageItem }) {
	function RenderModules() {

		if (!page) return null

		let modules = page.zones[name];

		const modulesToRender = modules.map(m => {

			const AgilityModule = getModule(m.moduleName)

			if (AgilityModule) {
				return <AgilityModule key={m.item.contentID} page={page} dynamicPageItem={dynamicPageItem} {...m.item} />
			} else {
				console.error(`React Component for ${m.moduleName} was not found in the Agility Modules list.`)
			}

		})

		return modulesToRender;
	}


	return (
		<div>
			<RenderModules />
		</div>
	)
}

export default ContentZone