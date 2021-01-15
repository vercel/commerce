import React, { FC } from 'react'
import { Hero } from '@components/ui'
import * as AgilityTypes from "@agility/types"


interface Fields {
	title:string,
	description:string
	cTA?:AgilityTypes.URLField
}

interface Props {
	fields: Fields
  }

const HeroModule:FC<Props> = ({fields}) => {

	return (
		<Hero
			headline={fields.title}
			description={fields.description}
			linkText={fields.cTA?.text}
			linkUrl={fields.cTA?.href}
      />
	)
}

export default HeroModule

