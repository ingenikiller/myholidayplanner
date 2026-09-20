import { Routes, Route } from 'react-router'
import './App.css'
import { Login } from './components/login'
import { Planner } from './components/planner'
import  Periodes  from './components/Periodes'

//import { Login } from './components/login.tsx'
/*import { Comptes } from './components/comptes.tsx'
import { Flux } from './components/flux.tsx'
import { Operations } from './components/operations.tsx'
import { Previsions } from './components/previsions.tsx'
import { StatistiquesAccueil } from './components/statistiquesAccueil.tsx'
import { StatistiquesAnnees } from './components/statistiquesAnnees.tsx'
import { StatistiquesMois } from './components/statistiquesMois.tsx'
import OpeRecurrentes from './components/opeRecurrentes.tsx'
*/

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/planner' element={<Planner/>}/>
        <Route path='/periodes' element={<Periodes/>}/>
      </Routes>
    </>
  )
}

export default App
