import React from "react";
import Left from "./components/home/Left/Left";
import Right from "./components/home/Right/Right";

function App() {

  return (
    <>
      <div className="flex min-h-screen">
        <Left/>
        <Right/>
      </div>
    </>
  )
}

export default App;