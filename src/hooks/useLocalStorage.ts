import { useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // FIXME: callback
      console.log(error)
    }
  }
  return [storedValue, setValue] as const
}

export const get = (key: string): string | string[] => {
  if (!key || !window.localStorage) {
    return []
  }
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : []
}

// FIXME: generics使う
export const add = (key: string, value: string) => {
  try {
    localStorage && localStorage.setItem(key, value)
  } catch (e) {
  }
}

export const getAllFilteredKeys = (key: string) => {
  const keysLength = window.localStorage.length
  const keys =  [...new Array(keysLength)].map((_, i) => window.localStorage.key(i))
  return keys
    .filter(k => !!k && k.includes(key))
}

export const getAllByKey = (key: string) => {
  const keys = getAllFilteredKeys(key)
  try {
    return keys.map(k => JSON.parse(window.localStorage.getItem(k ?? '') ?? ''))
  } catch (e) {
    console.log(e)
    return []
  }
}
