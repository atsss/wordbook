import React, { useState, useEffect } from 'react'
import { Header, Content, Heading, Button, Text } from '@adobe/react-spectrum'
import axios from 'axios'

interface Data {
  id: number
  Japanese: string
  English: string
  JapaneseExample: string
  ExglishExample: string
}

const defaultData: Data = {
  id: 0,
  Japanese: '',
  English: '',
  JapaneseExample: '',
  ExglishExample: '',
}

const App = () => {
  const [id, setId] = useState<number>(1)
  const [data, setData] = useState<Data>(defaultData)

  useEffect(() => {
    fetch()
  }, [id])

  const fetch = () => {
    axios
      .get(
        `https://api.airtable.com/v0/appSWyyYTT8awiXtc/Database?api_key=keyBlQF1YY3ZMiQgL&filterByFormula={id}=${id}`
      )
      .then(function (response) {
        console.log(response.data.records[0].fields)
        setData(response.data.records[0].fields)
      })
      .catch(function (error) {
        console.log(error)
        setId(1)
      })
  }

  return (
    <>
      <Header marginX="32px" marginY="16px">
        <Heading level={1}>Wordbook</Heading>
      </Header>
      <Content margin="32px">
        <Text>Paste</Text>
        <Button variant="primary" onPress={() => setId(id + 1)}>
          {data.id}
        </Button>
      </Content>
    </>
  )
}

export default App
