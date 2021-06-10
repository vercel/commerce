import React, { FC } from 'react'

import useCustomer from '@framework/use-customer'
import { Container, Text } from '@components/ui'
import { Module } from '@agility/nextjs'

interface Fields {
	heading: string,
	fullNameLabel: string,
	emailLabel: string,
	notLoggedInMessage: string
}


const ProfileModule:Module<Fields> = ({ module: {fields}}) => {

	const { data } = useCustomer()
  return (
    <Container>
      <Text variant="pageHeading">{fields.heading}</Text>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <Text variant="sectionHeading">{fields.fullNameLabel}</Text>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="mt-5">
              <Text variant="sectionHeading">{fields.emailLabel}</Text>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      )}

	  { !data &&
	  	<Text variant="body">{fields.notLoggedInMessage}</Text>
	  }
    </Container>
  )
}

export default ProfileModule

