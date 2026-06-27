import { createContext, useState, useContext, useEffect } from 'react'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('portfolio_is_admin') === 'true'
  })

  const login = (password) => {
    if (password === 'Mayur#23115') {
      localStorage.setItem('portfolio_is_admin', 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('portfolio_is_admin')
    setIsAdmin(false)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
