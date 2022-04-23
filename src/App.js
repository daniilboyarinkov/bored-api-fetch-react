import { useState } from 'react'
import { Markup } from 'interweave'

function App() {
  const [advice, setAdvice] = useState('')
  const [type, setType] = useState('')
  const [participants, setParticipants] = useState('')

  const changeType = (e) => setType(e.target.value)

  const changeParticipants = (e) => setParticipants(e.target.value)

  const fetchData = (e) => {
    e.preventDefault()
    let url = `https://www.boredapi.com/api/activity`
    if (type && participants) url += `?type=${type}&participants=${participants}`
    else if (type && !participants) url += `?type=${type}`
    else if (!type && participants) url += `?participants=${participants}`

    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        if (json.error) setAdvice(json.error)
        else
          setAdvice(
            `<b>Activity:</b> ${json.activity ?? 'Any'} <br /><b>Type:</b> ${
              json.type ?? 'Any'
            } <br /><b>Number of participants:</b> ${json.participants ?? 'Any'}`
          )
      })
  }

  return (
    <div className='App'>
      <h1>Bored?</h1>
      <h2>I can help you decide how to kill time</h2>

      <form onSubmit={(e) => fetchData(e)}>
        <label htmlFor='type'>Type: </label>
        <select id='type' onChange={(e) => changeType(e)}>
          <option value=''>Choose type...</option>
          <option value='education'>Education</option>
          <option value='recreational'>Recreational</option>
          <option value='social'>Social</option>
          <option value='diy'>Do it yourself</option>
          <option value='charity'>Charity</option>
          <option value='cooking'>Cooking</option>
          <option value='relaxation'>Relaxation</option>
          <option value='music'>Music</option>
          <option value='busywork'>Busywork</option>
        </select>
        <br />
        <label htmlFor='participants'>How many participants? </label>
        <input
          type='number'
          max='5'
          min='1'
          defaultValue=''
          onChange={(e) => changeParticipants(e)}
        />
        <br />
        <input type='submit' value='Find what to do...' />
      </form>

      <Markup content={advice} />
    </div>
  )
}

export default App
