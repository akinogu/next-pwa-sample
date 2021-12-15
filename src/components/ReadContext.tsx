import React, { useCallback, useContext, useState } from 'react'

interface Props {
  result: string
  updateResult: (value: string) => void
}

const ReadContext = React.createContext<Props>({
  result: '',
  updateResult: () => {}
})

export const ReadContextProvider: React.FC = ({ children }) => {
  const [result, setResult] = useState('')
  const updateResult = useCallback((email: string) => {
    setResult(email)
  }, [])

  return (
    <ReadContext.Provider value={{ result, updateResult }}>
      {children}
    </ReadContext.Provider>
  )
}

export const useReadContext = () => useContext(ReadContext)