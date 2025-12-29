import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const [result, setResult] = useState("");
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [info, setGameInfo] = useState(null);
  const [priceHistory, setPriceHistory] = useState(null);
  const [recGames, setRecGames] = useState([]);
  const [page, setPage] = useState(1);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [url, setUrl] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("");
    setGames([]);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_SEARCH_URL}/api/search?q=${search}`
      );
      const data = await res.json();

      if (data.success) {
        setGames(data.games);
      } else {
        setResult(`Error: ${data.error}`);
        setGames([]);
      }
    } catch (error) {
      setResult(`Connection error: ${error.message}`);
      setGames([]);
    }
  };

  const fetchGames = async (gameId, page) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_GAME_URL}/api/game/${gameId}?page=${page}`
      );
      const data = await res.json();

      if (data.success) {
        setGameInfo(data.game);
        setPriceHistory(data.priceHistory);
        setRecGames(data.similar);
        setPage(page);
        setCurrentGameId(gameId);
        setUrl(data.url);
        setGames([]);
        setTotalResults(data.totalResults);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  const handleNextPage = () => {
    if (recGames && recGames.length > 0) {
      fetchGames(currentGameId, page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (recGames && page > 1) {
      fetchGames(currentGameId, page - 1);
    }
  };

  const handleClick = async (gameId) => {
    setGameInfo(null);
    setPriceHistory(null);
    fetchGames(gameId, 1);
    setRecGames([]);
  };

  return (
    <div className="mt-30 p-10">
      <div className="w-full max-w-4xl px-4 mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-4">
            <input
              className="bg-white/20 flex text-white placeholder-gray-300 border border-white/30 rounded p-2 w-full focus:bg-white/30 focus:outline-none"
              type="text"
              placeholder="Search..."
              required
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (games.length > 0 && e.target.value == "") {
                  setGames([]);
                }
              }}
            />
            <button className="bg-blue-500 px-4 py-2 rounded text-white/90 hover:bg-blue-600 transition-colors duration-200 whitespace-nowrap">
              Search
            </button>
          </div>
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg px-4 py-2 mt-3 mb-3 text-center">
            <p className="text-blue-200 text-base font-medium">
              Enter a Steam game name above to explore its details, price
              history, reviews, and discover smart recommendations for similar
              games!
            </p>
          </div>

          {games.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-black/90 border border-white/20 rounded shadow-lg max-h-60 overflow-y-auto z-50">
              {games.map((game, i) => (
                <div
                  key={i}
                  className="px-4 py-2 text-white text-sm hover:bg-white/10 cursor-pointer"
                  onClick={() => handleClick(game.id)}
                >
                  <div className="font-semibold">{game.title}</div>
                </div>
              ))}
            </div>
          )}
        </form>

        {result && (
          <p className="text-white text-sm mt-2 text-center">{result}</p>
        )}
      </div>

      {/* Game Image, title, tags, description, players, and reviews*/}
      <div className="flex gap-4">
        {info && (
          <div className="mt-4 p-4 sm:p-6 bg-black/50 border border-white/20 rounded text-white max-w-4xl ml-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {info.assets.boxart && (
                <img
                  className="w-full sm:w-48 md:w-100 h-auto rounded"
                  src={info.assets.boxart}
                ></img>
              )}
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold mb-2">
                  {info.title}
                </h2>

                {info.tags && info.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {info.tags.slice(0, 10).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-500/30 text-white px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {info.description && (
                  <div
                    className="text-sm text-gray-300 mt-2 mb-2"
                    dangerouslySetInnerHTML={{ __html: info.description }}
                  />
                )}

                {info.players && (
                  <div className="mt-3 flex justify-center gap-2 rounded-lg bg-sky-500/15 px-3 py-1.5 text-sm text-sky-300 ring-1 ring-sky-500/30">
                    <span className="font-medium">Today's Players: </span>
                    <span className="font-semibold">
                      {info.players.recent?.toLocaleString()}
                    </span>
                  </div>
                )}

                {info.players && (
                  <div className="mt-3 flex justify-center gap-2 rounded-lg bg-green-500/15 px-3 py-1.5 text-sm text-green-300 ring-1 ring-green-500/30">
                    <span className="font-medium">Weekly Players: </span>
                    <span className="font-semibold">
                      {info.players.week?.toLocaleString()}
                    </span>
                  </div>
                )}

                {info.players && (
                  <div className="mt-3 flex justify-center gap-2 rounded-lg bg-rose-500/15 px-3 py-1.5 text-sm text-rose-300 ring-1 ring-rose-500/30">
                    <span className="font-medium">Peeked Players: </span>
                    <span className="font-semibold">
                      {info.players.peak?.toLocaleString()}
                    </span>
                  </div>
                )}

                {info.reviews[0] && (
                  <div className="mt-3 flex justify-center gap-2 rounded-lg bg-gray-500/15 px-3 py-1.5 text-sm text-gray-300 ring-1 ring-gray-500/30">
                    <span className="font-medium">Steam Reviews: </span>
                    <span className="font-semibold">
                      {info.reviews[0].score.toLocaleString()}
                    </span>
                  </div>
                )}

                {info.reviews[0] && (
                  <div className="mt-3 flex justify-center gap-2 rounded-lg bg-gray-500/15 px-3 py-1.5 text-sm text-gray-300 ring-1 ring-gray-500/30">
                    <span className="font-medium">Number of Reviews: </span>
                    <span className="font-semibold">
                      {info.reviews[0].count.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Prices */}
                <h3 className="mt-2 font-bold">Original Price</h3>
                {priceHistory && (
                  <div className="mt-3 flex justify-center gap-2 rounded-lg bg-blue-500/15 px-3 py-1.5 text-sm text-blue-200 ring-1 ring-blue-500/30">
                    <span className="font-medium">Normal Price: </span>
                    <span className="font-semibold">
                      ${priceHistory[0].deal.regular.amount}
                    </span>
                  </div>
                )}

                <h3 className="mt-2 font-bold">Sale Price</h3>
                {priceHistory && (
                  <div className="mt-3 flex justify-center gap-2 rounded-lg bg-yellow-500/15 px-3 py-1.5 text-sm text-yellow-300 ring-1 ring-yellow-500/30">
                    <span className="font-medium">Price: </span>
                    <span className="font-semibold">
                      ${priceHistory[0].deal.price.amount || ""}
                    </span>
                  </div>
                )}

                {priceHistory && (
                  <div className="mt-3 flex justify-center gap-2 rounded-lg bg-yellow-500/15 px-3 py-1.5 text-sm text-yellow-300 ring-1 ring-yellow-500/30">
                    <span className="font-semibold">
                      {priceHistory[0].deal.cut}% off
                    </span>
                  </div>
                )}
              </div>
            </div>
            {info.detailed_description && (
              <div
                className="text-sm text-gray-300 mt-5"
                dangerouslySetInnerHTML={{ __html: info.detailed_description }}
              />
            )}
          </div>
        )}
        {recGames && recGames.length > 0 && (
          <div className="min-w-0">
            <h3 className="text-white font-bold mt-4">
              Recommended Games based on Genres and Tags
            </h3>
            <div className="flex flex-col md:block">
              {recGames.map((game, i) => (
                <div
                  key={`${game.name}-${i}`}
                  className="mt-3 flex justify-start gap-2 rounded-lg bg-gray-500/15 px-3 py-1.5 text-xl text-white"
                >
                  <img
                    className="object-contain max-h-24 w-auto h-auto rounded"
                    src={game.background_image}
                    alt={game.name}
                  />
                  <div className="font-semibold truncate">
                    {game.name}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-end gap-1 ml-4 mt-1 px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/40 transition-colors"
                    >
                      View on ITAD →
                    </a>
                    <p className="text-sm text-green-400">
                      Metacritic score: {game.metacritic}
                    </p>
                    <p className="text-sm">{game.rating}/5</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <button
                className="bg-blue-500 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
                onClick={handlePreviousPage}
              >
                Previous
              </button>
              <p className="text-white px-2">{page}</p>
              <button
                className="bg-blue-500 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
                onClick={handleNextPage}
              >
                Next
              </button>
              <p className="text-white text-sm sm:ml-4">
                Total: {totalResults}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
