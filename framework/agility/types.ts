import { FC } from 'react'

export interface CustomInitPropsArg {
	item:any,
	agility:any,
	languageCode:any,
	channelName:any,
	pageInSitemap:any,
	dynamicPageItem?:any
}

export interface CustomInitProps<T> {
	(props:CustomInitPropsArg): T;
}

export interface ModuleWithInit<TProps, TInit> extends FC<TProps> {
	getCustomInitialProps:CustomInitProps<TInit>
}

export interface URLField {
	href:string,
	target:string,
	text:string
}