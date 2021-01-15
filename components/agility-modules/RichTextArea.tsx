import React, {FC} from 'react';
import { Text, Container } from '@components/ui'

interface Fields {
	textblob:string,
}

interface Props {
	fields: Fields
}

const RichTextArea:FC<Props> =  ({fields}) => {

	return (
		<Container>
			<Text className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl" html={fields.textblob} />
		</Container>
	);

}

export default RichTextArea