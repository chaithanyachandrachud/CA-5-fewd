import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "../Navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const navigates = () => {
    navigate('/register');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );

        if (!response.data || !response.data.books) {
          throw new Error("Invalid response data");
        }

        setBooks(response.data.books);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>React</h1>
        </div>
        <div className="search-bar flex-grow">
          <input
            type="text"
            placeholder="Search for books"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="nav-links">
          <button onClick={navigates} className="register-button">Register</button>
        </div>
      </div>
      <div className="book-container">
        {error ? (
          <div>{error}</div>
        ) : (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-item">
              <h4>{book.title}</h4>
              <div className="flex">
                <img src={book.imageLinks.smallThumbnail} alt="" />
              </div>
              {book.averageRating && <p>Rating: {book.averageRating}</p>}
              {book.listPrice ? (
                <p>Price: {book.listPrice.amount}</p>
              ) : (
                <p>Price: Free</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Navbar;
