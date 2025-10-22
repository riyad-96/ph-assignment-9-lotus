import GlobalContext from './GlobalContext'

function ContextProvider({children}) {
  return (
    <GlobalContext>
      {children}
    </GlobalContext>
  )
}

export default ContextProvider;