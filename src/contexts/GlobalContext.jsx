import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';

const globalContext = createContext();

function GlobalContext({ children }) {
  const [user, setUser] = useState(null);

  const [appLoading, setAppLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  const [allGames, setAllGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [top9Games, setTop9Games] = useState([]);

  useEffect(() => {
    if (appLoading) return;
    (async () => {
      try {
        const gamesApiRes = await fetch('https://kitzo-apis.onrender.com/games');
        const { data, categories } = await gamesApiRes.json();

        setAllGames(
          data
            .map((g) => ({ obj: g, random: Math.random() }))
            .sort((a, b) => a.random - b.random)
            .map((obj) => obj.obj),
        );

        setCategories(categories);

        setTop9Games(data.sort((a, b) => b.ratings - a.ratings).slice(0, 9));
      } catch (err) {
        console.error(err);
      } finally {
        setDataLoading(false);
      }
    })();
  }, [appLoading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAppLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <globalContext.Provider
      value={{
        user,
        setUser,
        appLoading,
        setAppLoading,
        dataLoading,
        setDataLoading,
        allGames,
        setAllGames,
        categories,
        setCategories,
        top9Games,
        setTop9Games,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export default GlobalContext;

export function useGlobalContext() {
  return useContext(globalContext);
}
