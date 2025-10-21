import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import FilterContextProvider from './contexts/filters/FilterContext'
import CardExpandidoProvider from './contexts/main/CardExpandidoContext'
import InstituicaoAtualProvider from './contexts/main/InstituicaoAtualContext'

function App() {

  return (
    <>
      <FilterContextProvider>

        <InstituicaoAtualProvider>

          <CardExpandidoProvider>

            <Routes>
              <Route path='/' element={<Navigate to={'/home'}/>}/>
              <Route path='/home' element={<HomePage />}/>
              <Route path='/profile' element={<ProfilePage />}/>
            </Routes>

          </CardExpandidoProvider>

        </InstituicaoAtualProvider>

      </FilterContextProvider>

    </>
  )
}

export default App
