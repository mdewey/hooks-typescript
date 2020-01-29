import React from 'react'

const TypeScriptExample = () => {
  return (
    <div>
      <h1>My runs this week</h1>
      <section>
        <h2>Total Miles: 100</h2>
      </section>
      <section>
        <form>
          <input type="text" placeholder="Location" />
          <input type="number" placeholder="distance" />
          <button>ADD</button>
        </form>
      </section>
      <section>
        <ul>
          <li>
            <header>Lake</header>
            <main>5 miles</main>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default TypeScriptExample
