import React, { useState } from 'react'
import Body from './body/body';
import HeaderComp from './Header/HeaderComp';

function Home() {
    const [search, setSearch] = useState("");
  return (
    <div>
      <HeaderComp setSearch={setSearch} search={search} />
      <Body search={search} />
    </div>
  )
}

export default Home
