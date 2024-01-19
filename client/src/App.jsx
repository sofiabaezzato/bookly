import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './Root'
import { Books, dataLoader } from './Books'
import Add from './Add'
import Home from './Home'
import Update from './Update'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}/>
        <Route path='/books' element={<Books />} loader={dataLoader}/>
        <Route path='/add' element={<Add />}/>
        <Route path='/update/:id' element={<Update />}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
