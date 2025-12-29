import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";
import NodeCache from "node-cache";

dotenv.config();

const ITAD_API_KEY = process.env.API_KEY_ITAD;
const RAWG_API_KEY = process.env.API_KEY_RAWG;
const ITAD_BASE_URL = "https://api.isthereanydeal.com";

const router = express.Router()
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

router.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Missing 'q' query parameter",
      });
    }

    // check cache
    const cacheKey = `search=${q.toLowerCase()}`;
    const cacheResult = cache.get(cacheKey);

    if (cacheResult) {
      return res.json(cacheResult); // if it exists return cached data
    }

    const searchResponse = await axios.get(`${ITAD_BASE_URL}/games/search/v1`, {
      params: {
        key: ITAD_API_KEY,
        title: q,
        results: 20,
        type: "game",
      },
    });

    const results = searchResponse.data || [];
    const games = results.filter((game) => game.type === "game").slice(0, 10);

    if (!results.length) {
      return res.status(404).json({
        success: false,
        error: "No games found matching your search",
      });
    }

    const response = {
      success: true,
      games: games,
    };

    // otherwise if cache didn't exist then store it
    cache.set(cacheKey, response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/api/game/:id", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const cacheKey = `game-${req.params.id}--page-${page}`;
  const cacheResult = cache.get(cacheKey);

  if (cacheResult) {
    return res.json(cacheResult);
  }

  const response = await axios.get(`${ITAD_BASE_URL}/games/info/v2`, {
    params: {
      key: ITAD_API_KEY,
      id: req.params.id,
      type: "game",
    },
  });

  // All game data
  const game = response.data;

  // Construct a url for itad
  const url = game.urls?.game;
  console.log("URLs:", url);

  const prices = await axios.get(`${ITAD_BASE_URL}/games/history/v2`, {
    params: {
      key: ITAD_API_KEY,
      id: req.params.id,
      currency: "US",
    },
  });

  // Price data
  const priceHistory = prices.data;

  const steamGenres = [];

  if (game.appid) {
    try {
      const steamResponse = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${game.appid}`
      );

      const steamData = steamResponse.data[game.appid];
      if (steamData.success) {
        game.description = steamData.data.short_description;
        game.detailed_description = steamData.data.detailed_description;

        // Get genre of the game and push to a list
        steamGenres.push(...steamData.data.genres) || null;
      }
    } catch (error) {
      console.log("Failed to get Steam description:", error.message);
    }
  }

  // Tags for recommended games
  const filterSearchTags = game.tags
    .slice(0, 2)
    .map((tag) => tag.toLowerCase().replace(/\s+/g, "-"))
    .join(",");

  // Genres for recommended games
  const filterGenres = steamGenres
    .map((g) => g.description.toLowerCase())
    .join(",");

  // First attempt genres
  let recGames = await axios.get(`https://api.rawg.io/api/games`, {
    params: {
      key: RAWG_API_KEY,
      genres: filterGenres,
      tags: filterSearchTags,
      stores: 5,
      ordering: "-added",
      page_size: 20,
      page: page,
    },
  });

  let similarGames = recGames.data.results;

  // retry without genres
  if (similarGames.length === 0 && filterGenres) {
    recGames = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: RAWG_API_KEY,
        tags: filterSearchTags,
        stores: 5,
        ordering: "-added",
        page_size: 20,
        page: page,
      },
    });

    similarGames = recGames.data.results;
  }

  const finalResponse = {
    success: true,
    game: game,
    priceHistory: priceHistory,
    similar: similarGames,
    page: page,
    totalResults: recGames.data.count,
    url: url,
  };

  // if no cache exists then set it
  cache.set(cacheKey, finalResponse);

  res.json(finalResponse);
});

export default router;