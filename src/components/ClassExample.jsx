import React, { Component } from 'react'
import axios from 'axios'
export class ClassExample extends Component {
  state = {
    runs: [],
    newRun: {},
    stats: { total: 0, averageDistance: 0 },
  }

  constructor(props) {
    super(props)
    this.updateField = this.updateField.bind(this)
    this.addNewRunToRuns = this.addNewRunToRuns.bind(this)
    this.getRunningStats = this.getRunningStats.bind(this)
  }

  async componentDidMount() {
    const resp = await axios.get('https://localhost:5001/api/run')
    this.setState(
      {
        runs: resp.data,
      },
      () => {
        this.setState({
          stats: this.getRunningStats(),
        })
      }
    )
  }

  getRunningStats() {
    const rv = {
      averageDistance: 0,
      total: 0,
    }

    rv.total = this.state.runs.reduce(
      (acc, item) => acc + parseInt(item.distance),
      0
    )
    rv.averageDistance = (rv.total / this.state.runs.length).toFixed(2)
    return rv
  }

  async addNewRunToRuns(e) {
    e.preventDefault()
    const resp = await axios.post('https://localhost:5001/api/run', {
      ...this.state.newRun,
      distance: parseFloat(this.state.newRun.distance),
    })

    this.setState(
      {
        runs: this.state.runs.concat(this.state.newRun),
        newRun: {
          location: '',
          distance: '',
        },
      },
      () => {
        this.setState({
          stats: this.getRunningStats(),
        })
      }
    )
  }

  updateField(e) {
    this.setState({
      newRun: {
        ...this.state.newRun,
        [e.target.name]: e.target.value,
      },
    })
  }

  render() {
    return (
      <main>
        <h1>My runs this week</h1>
        <section className="stats">
          <h2>Total Miles: {this.state.stats.total}</h2>
          <h2>Number of runs: {this.state.runs.length}</h2>
          <h2>Average Miles / Run: {this.state.stats.averageDistance}</h2>
        </section>
        <section>
          <form onSubmit={this.addNewRunToRuns}>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={this.state.newRun.location}
              onChange={this.updateField}
              required
            />
            <input
              type="number"
              placeholder="distance"
              name="distance"
              value={this.state.newRun.distance}
              onChange={this.updateField}
              required
            />
            <button>ADD</button>
          </form>
        </section>
        <section>
          <ul>
            {this.state.runs.map((run, i) => {
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
}

export default ClassExample
