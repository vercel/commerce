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
      <Box mt={10}>
        <TableContainer>
          <Table colorScheme="teal">
            <Thead>
              <Tr>
                <Th>{locale == 'it' ? 'Giorno' : 'Day of Week'}</Th>
                <Th>{locale == 'it' ? 'Orario' : 'Time'}</Th>
                <Th>{locale == 'it' ? 'Luogo' : 'Location'}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData[locale as keyof typeof tableData].map(
                (elem, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{elem.day}</Td>
                      <Td>{elem.time}</Td>
                      <Td>{elem.location}</Td>
                    </Tr>
                  )
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}

WhereWeAre.Layout = Layout
