import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Box,
} from '@chakra-ui/react'
import { Layout } from '@components/common'
import { Text } from '@components/ui'
import { useRouter } from 'next/router'

import tableData from '../static_data/where-we-are.json'

export default function WhereWeAre() {
  const { locale = 'it' } = useRouter()

  return (
    <div className="mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Box>
        <Text variant="heading">
          {locale == 'it' ? 'Dove Siamo' : 'Where We Are'}
        </Text>
      </Box>
      <Box overflow={'auto'} mt={10}>
        <Table width={'-webkit-fit-content'} colorScheme="teal">
          <Thead>
            <Tr>
              <Th textAlign={'center'}>
                {locale == 'it' ? 'Giorno' : 'Day of Week'}
              </Th>
              <Th textAlign={'center'}>{locale == 'it' ? 'Orario' : 'Time'}</Th>
              <Th textAlign={'center'}>{locale == 'it' ? 'Luogo' : 'Place'}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData[locale as keyof typeof tableData].map((elem, index) => {
              return (
                <Tr key={index}>
                  <Td>{elem.day}</Td>
                  <Td>{elem.time}</Td>
                  {index === 0 ? (
                    <Td
                      textAlign={'center'}
                      rowSpan={
                        tableData[locale as keyof typeof tableData].length
                      }
                    >
                      {elem.location!.split('<br/>').map((str, index) => (
                        <p key={index}>{str}</p>
                      ))}
                    </Td>
                  ) : (
                    <></>
                  )}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </div>
  )
}

WhereWeAre.Layout = Layout
