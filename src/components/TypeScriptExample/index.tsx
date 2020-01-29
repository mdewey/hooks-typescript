import React, { useState, useEffect, ChangeEvent } from 'react'
import { Run } from './Run'
import { Stats } from './Stats'
import { NewRun } from './NewRun'

const TypeScriptExample = () => {
  const [runs, setRuns] = useState<Array<Run>>([])
  const [stats, setStats] = useState<Stats>()
  const [newRun, setNewRun] = useState<NewRun>({ location: '', distance: '' })

  useEffect(() => {
    setRuns([
      { location: 'Lake', distance: 3.1 },
      { location: 'Park', distance: 5 },
      { location: 'Track', distance: 2 },
      { location: 'Beach', distance: 13.1 },
    ])
  }, [])

  useEffect(() => {
    const total = runs.reduce<number>((acc, item) => acc + item.distance, 0)
    const averageDistance = total / runs.length
    setStats({ total, averageDistance })
  }, [runs])

  const updateField = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setNewRun((prev: NewRun) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const addNewRunToRuns = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    setRuns([
      ...runs.concat({
        location: newRun.location,
        distance: parseInt(newRun.distance),
      }),
    ])
    setNewRun({
      location: '',
      distance: '',
    })
  }

  return (
    <main>
      <h1>My runs this week</h1>
      {stats ? (
        <section className="stats">
          <h2>Total Miles: {stats.total}</h2>
          <h2>Average Miles / Run: {stats.averageDistance}</h2>
        </section>
      ) : (
        <div>loading...</div>
      )}
      <section>
        <form onSubmit={addNewRunToRuns}>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={newRun?.location}
            onChange={updateField}
            required
          />
          <input
            type="number"
            placeholder="distance"
            name="distance"
            value={newRun.distance || ''}
            onChange={updateField}
            required
          />

          <button>ADD</button>
        </form>
      </section>
      <section>
        <ul>
          {runs.map((run, i) => {
            return (
              <li key={i}>
                <header>{run.location}</header>
                <main>{run.distance} miles</main>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default TypeScriptExample
