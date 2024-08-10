import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/fun-3d-cartoon-illustration-indian-businessman 1.png";
import { FaSearch } from "react-icons/fa";
import { TiMicrophone } from "react-icons/ti";
import { FaCamera } from "react-icons/fa";

const Search = () => {
  const [searchPosts, setSearchPosts] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchPosts.trim() === "") return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.datamuse.com/words?rel_trg=${searchPosts}`
      );
      setTimeout(() => {
        setPosts(response.data.slice(0, 5));
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="hero">
      <main>
        <aside>
          <nav className="navbar ms-5 me-5 my-4 ">
            <div className="container-fluid">
              <h3>Ui Design</h3>
              <form className="d-flex">
                <button className="btn1 me-4">Login</button>
                <button type="submit" className="btn2">
                  Sign up
                </button>
              </form>
            </div>
          </nav>
          <img src={logo} alt="" />
        </aside>
        <form className="form" onSubmit={handleSubmit}>
          <div className="icon1">
            <FaSearch />
          </div>
          <div className="icon2">
            <TiMicrophone />
          </div>
          <div className="icon3">
            <FaCamera />
          </div>
          <input
            type="text"
            value={searchPosts}
            onChange={(e) => setSearchPosts(e.target.value)}
            placeholder="Enter product..."
          />
        </form>
      </main>
      {loading ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="text-center">
          {posts.map((result) => (
            <li key={result.word}>{result.word}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
