import React, { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dark, setDark] = useState(false);

  // Filters
  const [authorFilter, setAuthorFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("any");
  const [yearFilter, setYearFilter] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Load default books (CSE popular topics)
  useEffect(() => {
    loadDefaultBooks();
  }, []);

  async function loadDefaultBooks() {
    const defaultQuery = "computer science engineering";
    await searchBooks(defaultQuery, 1, false);
  }

  async function searchBooks(searchTerm = query, pageNum = 1, append = false) {
    const q = searchTerm.trim() || "computer science";
    setLoading(true);
    setError(null);
    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
        q
      )}&limit=50&page=${pageNum}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch from Open Library API");
      const data = await res.json();
      const docs = (data.docs || []).map((d) => ({
        key: d.key,
        title: d.title,
        author: d.author_name ? d.author_name.join(", ") : "Unknown Author",
        year: d.first_publish_year || "N/A",
        lang: d.language ? d.language.join(", ") : "N/A",
        cover_i: d.cover_i,
      }));
      setResults((prev) => (append ? [...prev, ...docs] : docs));
      setHasMore(data.docs.length === 50);
      setPage(pageNum);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function coverUrl(cover_i) {
    if (!cover_i)
      return "https://via.placeholder.com/180x260?text=No+Cover+Available";
    return `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
  }

  // Apply filters
  const filteredResults = results.filter((r) => {
    const byAuthor = authorFilter
      ? r.author.toLowerCase().includes(authorFilter.toLowerCase())
      : true;
    const byLang =
      languageFilter === "any"
        ? true
        : r.lang.toLowerCase().includes(languageFilter);
    const byYear = yearFilter ? String(r.year).includes(yearFilter) : true;
    return byAuthor && byLang && byYear;
  });

  return (
    <div className={`app-root ${dark ? "dark" : ""}`}>
      <style>{`
        :root {
          --bg: #fff4f6;
          --card: #ffffff;
          --accent: #ff6b9a;
          --accent-dark: #d94864;
          --muted: #6b6b6b;
        }
        body,html,#root {
          height: 100%;
          margin: 0;
          font-family: 'Inter', sans-serif;
        }
        .app-root {
          min-height: 100vh;
          background: linear-gradient(180deg, var(--bg), #fff);
          padding: 30px;
          display: flex;
          justify-content: center;
          transition: background 0.3s;
        }
        .dark {
          --bg: #1a1a1a;
          --card: #2b2b2b;
          --accent: #ff8fab;
          --accent-dark: #ff4d6d;
          --muted: #d1d1d1;
          color: white;
        }
        .container {
          width: 100%;
          max-width: 1150px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          color: var(--accent-dark);
        }
        .subtitle {
          color: var(--muted);
          font-size: 15px;
        }
        .controls {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          flex-wrap: wrap;
          justify-content: center;
        }
        input, select {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          font-size: 15px;
          width: 200px;
        }
        .btn {
          background: var(--accent);
          color: white;
          border: 0;
          border-radius: 10px;
          padding: 10px 15px;
          font-weight: 600;
          cursor: pointer;
        }
        .results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }
        .card {
          background: var(--card);
          border-radius: 12px;
          padding: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        .card img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-radius: 10px;
        }
        .card h3 {
          font-size: 16px;
          color: var(--accent-dark);
          margin: 8px 0 3px;
        }
        .card p {
          font-size: 13px;
          color: var(--muted);
          margin: 2px 0;
        }
        .footer {
          text-align: center;
          margin-top: 25px;
          color: var(--muted);
          font-size: 13px;
        }
      `}</style>

      <div className="container">
        <div className="header">
          <div className="title">BookFinder — B.Tech CSE Edition</div>
          <div className="subtitle">
            Search from 100+ Computer Science & Engineering books using Open
            Library API
          </div>
        </div>

        <div className="controls">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter book title (e.g., Data Structures)"
          />
          <button className="btn" onClick={() => searchBooks(query, 1, false)}>
            Search
          </button>
          <button className="btn" onClick={() => loadDefaultBooks()}>
            Clear
          </button>
          <button className="btn" onClick={() => setDark((d) => !d)}>
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="any">All Languages</option>
            <option value="eng">English</option>
            <option value="fre">French</option>
            <option value="hin">Hindi</option>
            <option value="ger">German</option>
          </select>
          <input
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            placeholder="Filter by Author"
          />
          <input
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            placeholder="Filter by Year"
          />
        </div>

        {loading && <p>Loading books...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="results">
          {filteredResults.map((r) => (
            <div className="card" key={r.key}>
              <img src={coverUrl(r.cover_i)} alt={r.title} />
              <h3>{r.title}</h3>
              <p>{r.author}</p>
              <p>{r.year}</p>
              <p>{r.lang}</p>
            </div>
          ))}
        </div>

        {hasMore && !loading && (
          <div style={{ textAlign: "center", marginTop: 15 }}>
            <button
              className="btn"
              onClick={() => searchBooks(query, page + 1, true)}
            >
              Load More
            </button>
          </div>
        )}

        <div className="footer">
          Made for Alex — A B.Tech CSE Student. Powered by Open Library API.
        </div>
      </div>
    </div>
  );
}
