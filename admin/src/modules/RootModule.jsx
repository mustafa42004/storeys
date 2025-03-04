import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../component/shared/Sidebar/Sidebar'
import Header from '../component/shared/Header/Header'
import { fetch as fetchTeams } from '../services/TeamService'
import { fetch as fetchProperties } from '../services/PropertyService'
import { useDispatch } from 'react-redux'
import { handleGetTeam } from '../redux/TeamDataSlice'
import { handleGetProperty } from '../redux/PropertyDataSlice'

const RootModule = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!localStorage.getItem('ddlj')) {
      navigate('/signin')
    }
  }, [])

  const getTeams = async() => {
    const response = await fetchTeams()
    if (response.success) { 
      dispatch(handleGetTeam(response?.result))
    }
  }

  const getProperties = async() => {
    const response = await fetchProperties()
    if (response.success) { 
      dispatch(handleGetProperty(response?.result))
    }
  }

  useEffect(()=>{
    getTeams()  
    getProperties()
  }, [])

  return (
    <div className='main-layout'>
      <Sidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header />
        <Outlet />
      </main>
    </div>
  )
}

export default RootModule