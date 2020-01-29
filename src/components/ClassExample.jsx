import React, { Component } from 'react'

export class ClassExample extends Component {
  state = {
    runs: [],
    newRun: {},
    stats: {},
  }

  constructor(props) {
    super(props)
    this.updateField = this.updateField.bind(this)
    this.addNewRunToRuns = this.addNewRunToRuns.bind(this)
    this.getRunningStats = this.getRunningStats.bind(this)
  }

  componentDidMount() {
    this.setState(
      {
        runs: [
          { name: 'Lake', distance: 3.1 },
          { name: 'Park', distance: 5 },
          { name: 'Track', distance: 2 },
          { name: 'Beach', distance: 13.1 },
        ],
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
    rv.averageDistance = rv.total / this.state.runs.length
    return rv
  }

  addNewRunToRuns(e) {
    e.preventDefault()
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
      <div>
        <h1>My runs this week</h1>
        <section>
          <h2>Total Miles: {this.state.stats.total}</h2>
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
            {this.state.runs.map(run => {
              return (
                <li>
                  <header>{run.name}</header>
                  <main>{run.distance} miles</main>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    )
  }
}

export default ClassExample
