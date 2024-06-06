import './App.css'
import SubComponent from './components/SubComponent';

function App() {

  // 1. THIS JSX not HTML
  // 2. One parent!!!
  // 3. WE ARE WORKING WITH JAVASCRIPT!
      // - comments work the ssame as js
      // - use camelCase for some protected keywords
      // - no self closing tags


      let myClass = "hi"
      let myNum = 15;

      const peopleInZoom = ["Anthony", "Sam", "James", "Michelle", "Roy", "Suresh"];

      const nums = new Array(200).fill(null);
  return (
    <>
      <h1 className={myClass}>Hello world</h1>
      <SubComponent banana={myNum} />
      {
        peopleInZoom.map((el, idx)=> (
          <div key={idx}>
            <h2>{el}</h2>
          </div>
        ))
      }
      {
        nums.map((_el, idx)=> (
          <p>{`Number: ${idx + 1}`}</p>
        ))
      }
    </>
  )
}

export default App
