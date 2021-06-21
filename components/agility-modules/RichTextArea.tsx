import React, {FC} from 'react';
import { Text, Container } from '@components/ui'
import { Module } from '@agility/nextjs';

interface Fields {
	textblob:string,
}

const RichTextArea:Module<Fields> =  ({ module: {fields} }) => {

	return (
		<Container>
			<Text className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl" html={fields.textblob} />
		</Container>
	);

}

export default RichTextArea