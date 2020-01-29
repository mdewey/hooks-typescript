import React, { useState, useEffect } from 'react'

const HookExample = () => {
  const [runs, setRuns] = useState([])
  const [stats, setStats] = useState({ total: 0, averageDistance: 0 })
  const [newRun, setNewRun] = useState({})

  useEffect(() => {
    setRuns([
      { location: 'Lake', distance: 3.1 },
      { location: 'Park', distance: 5 },
      { location: 'Track', distance: 2 },
      { location: 'Beach', distance: 13.1 },
    ])
  }, [])

  useEffect(() => {
    const total = runs.reduce((acc, item) => acc + parseInt(item.distance), 0)
    const averageDistance = total / runs.length
    setStats({ total, averageDistance })
  }, [runs])

  const updateField = e => {
    e.persist()
    setNewRun(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const addNewRunToRuns = e => {
    e.preventDefault()
    setRuns([...runs.concat(newRun)])
    setNewRun({
      location: '',
      distance: '',
    })
  }

  return (
    <main>
      <h1>My runs this week</h1>
      <section className="stats">
        <h2>Total Miles: {stats.total}</h2>
        <h2>Average Miles / Run: {stats.averageDistance}</h2>
      </section>
      <section>
        <form onSubmit={addNewRunToRuns}>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={newRun.location}
            onChange={updateField}
            required
          />
          <input
            type="number"
            placeholder="distance"
            name="distance"
            value={newRun.distance}
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

export default HookExample
