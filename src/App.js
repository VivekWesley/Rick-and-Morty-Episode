import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "./App.scss";
import Rick_and_Morty_logo2 from "./Rick_and_Morty_logo2.png";

function App() {
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/episode/");
  const [info, setInfo] = useState({});
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("url :", url);
    console.log("info :", info);
    console.log("results :", results);
    console.log("search :", search);
  }, [url, info, results, search]);

  useEffect(() => {
    axios
      .get(`${url}?page=${page}&name=${search}`)
      .then(result => {
        setInfo(result.data.info);
        setResults(result.data.results);
      })
      .catch(error => {
        setPage(1);
        console.log(error);
      });
  }, [search, page]);

  // useEffect(() => {
  //   console.log(url, info, results )
  // }, [url, info, results, search])

  const nextHandler = event => {
    event.preventDefault();
    if (page <= info.pages) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };

  const prevHandler = event => {
    event.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(info.pages);
    }
  };

  return (
    <>
      <img src={Rick_and_Morty_logo2} alt="rick and morty" />
      <div className="main-header">
        <header>
          <span class="btn draw-border" onClick={event => prevHandler(event)}>
            {"<"}
          </span>
          <p>
            {page}/{info.pages}
          </p>
          <span class="btn draw-border" onClick={event => nextHandler(event)}>
            {">"}
          </span>
          <p>Search</p>
          <input
            onChange={e => {
              setSearch(e.target.value);
            }}
            value={search}
            type="text"
            className="search"
          />
        </header>
      </div>
      <main>
        <section>
          {results.map((result, index) => (
            <div className="container-second">
              <article key={index}>
                <div className="article-header">
                  <label>{result.name}</label>
                </div>
                <ReactPlayer controls url={result.url} />
                <div className="article">
                  <label>{result.episode}</label>
                  <br />
                  <label>{result.air_date}</label>
                </div>
              </article>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
