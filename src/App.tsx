import React, { useState, useEffect } from 'react'
import {
  Header,
  Content,
  Heading,
  Button,
  Text,
  Divider,
  View,
} from '@adobe/react-spectrum'
import axios from 'axios'

interface Data {
  id: number
  Japanese: string
  English: string
  JapaneseExample: string
  EnglishExample: string
}

const defaultData: Data = {
  id: 0,
  Japanese: '',
  English: '',
  JapaneseExample: '',
  EnglishExample: '',
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
        <Column label="English" text={data.English} />
        <Column label="Japanese" text={data.Japanese} />
        <Column label="English example" text={data.EnglishExample} />
        <Column label="Japanese example" text={data.JapaneseExample} />
        <Button variant="primary" onPress={() => setId(id + 1)}>
          {data.id}
        </Button>
      </Content>
    </>
  )
}

interface Props {
  label: string
  text: string
}
const Column: React.FC<Props> = ({ label, text }) => (
  <>
    <View marginTop="16px">
      <Text>{label}</Text>
    </View>
    <View marginTop="8px">
      <Text>{text}</Text>
    </View>
    <Divider size="S" />
  </>
)

export default App
