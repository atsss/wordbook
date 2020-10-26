import React, { useState, useEffect } from 'react'
import { Header, Content, Heading, Button } from '@adobe/react-spectrum'
import axios from 'axios'

const defaultData = { id: 0 }

const App = () => {
  const [id, setId] = useState(1)
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    console.log('hi')
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
      <Header marginX="32px" marginY="16px" width="100%">
        <Heading level={1}>Wordbook</Heading>
      </Header>
      <Content margin="32px">
        <Button variant="primary" onPress={() => setId(id + 1)}>
          {data.id}
        </Button>
      </Content>
    </>
  )
}

export default App
