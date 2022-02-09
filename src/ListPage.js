import { useState, useEffect } from 'react';
import { getGames } from './services/fetch-utils';
import Game from './Game';

export default function ListPage() {
  const [games, setGames] = useState([]);
  // you'll need some state to hold onto the array of games
  useEffect(() => {
    async function fetch() {
      const fetchGames = await getGames();
      setGames(fetchGames);
    }
    fetch();
  }, []);
  // fetch the games on load and inject them into state
  return (
    <div className='list games'>
      {
        games.map(game => <Game key={game.id} game={game} />)
      }
      {/* map through the games in state and render Game components */}
    </div>
  );
}
