import React, { useState, useEffect } from 'react'
import {
  Header,
  Content,
  Heading,
  ButtonGroup,
  Button,
  Text,
  Divider,
  View,
} from '@adobe/react-spectrum'
import axios, { AxiosRequestConfig } from 'axios'

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

const storagedId = parseInt(localStorage.getItem('id') || '1', 10)

const App = () => {
  const [id, setId] = useState<number>(storagedId)
  const [data, setData] = useState<Data>(defaultData)
  const [audio, setAudio] = useState<string | undefined>(undefined)

  useEffect(() => {
    fetch()
    setAudio(undefined)
  }, [id])

  const fetch = () => {
    axios
      .get(
        `https://api.airtable.com/v0/appSWyyYTT8awiXtc/Database?api_key=keyBlQF1YY3ZMiQgL&filterByFormula={id}=${id}`
      )
      .then(function (response) {
        const fetchedData = response.data.records[0].fields
        console.log(fetchedData)
        localStorage.setItem('id', fetchedData.id)
        setData(fetchedData)
      })
      .catch(function (error) {
        console.log(error)
        setId(1)
      })
  }

  const getAudio = () => {
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: {
        audioConfig: { audioEncoding: 'LINEAR16', pitch: 0, speakingRate: 1 },
        input: { text: data.EnglishExample },
        voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
      },
      url:
        'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyArn08Ud4m-JuxAfp5vtReZ4BEUzZsvrTs',
    }
    axios(options)
      .then(function (response) {
        console.log(response)
        setAudio(response.data.audioContent)
      })
      .catch(function (error) {
        console.log(error)
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
        {audio && (
          <View marginTop="24px">
            <audio src={`data:audio/mp3;base64,${audio}`} controls>
              Your browser does not support the audio element.
            </audio>
          </View>
        )}
        <ButtonGroup marginTop="24px">
          <Button variant="secondary" onPress={getAudio}>
            Get Audio
          </Button>
          <Button variant="cta" onPress={() => setId(id + 1)}>
            Next
          </Button>
        </ButtonGroup>
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
