import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('muacm_token'))

  const login = (newToken) => {
    localStorage.setItem('muacm_token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('muacm_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAdmin: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)