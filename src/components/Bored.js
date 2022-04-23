import React from 'react'
import { useState } from 'react'
import { Markup } from 'interweave'
import styles from './Bored.module.css'

export default function Bored() {
  const [advice, setAdvice] = useState('')
  const [type, setType] = useState('')
  const [participants, setParticipants] = useState('')

  const changeType = (e) => setType(e.target.value)

  const changeParticipants = (e) => setParticipants(e.target.value)

  const plusParticipant = () => +participants < 5 && setParticipants(+participants + 1)
  const minusParticipant = () => +participants > 1 && setParticipants(+participants - 1)

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
            `<b>Activity:</b> ${json.activity ?? 'Any'} <br /><b>Number of participants:</b> ${
              json.participants ?? 'Any'
            } <br /><b>Type:</b> ${json.type ?? 'Any'} `
          )
      })
  }

  return (
    <div className={styles.container}>
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

        <span className={styles.number}>
          <input type='number' min='1' max='5' value={participants} onChange={changeParticipants} />
          <button type='button' className={styles.numberMinus} onClick={(e) => minusParticipant(e)}>
            -
          </button>
          <button type='button' className={styles.numberPlus} onClick={(e) => plusParticipant(e)}>
            +
          </button>
        </span>
        <br />
        <input type='submit' value='Find what to do...' />
      </form>

      <Markup content={advice} className={styles.advice} />
    </div>
  )
}
