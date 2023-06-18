import React, { useState } from "react";
import EmptyList from "../../components/common/EmptyList";
import BlogList from "../../components/Home/BlogList";
import Header from "../../components/Home/Header";
import SearchBar from "../../components/Home/SearchBar";
import { blogList } from "../../config/data";
import "../../components/Tabs/tabs.css";

const Home = () => {
  const [blogs, setBlogs] = useState(blogList); //this is the json data
  const [searchKey, setSearchKey] = useState(""); // this is the search state

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = blogList;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(blogList);
    setSearchKey("");
  };

  const tabsSelect = (tab_id) => {
    const filterData = blogList.filter((item) => tab_id == item.type);
    console.log(filterData);
    setBlogs(filterData);
  };

  return (
    <div>
      {/* Page Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/* tabs*/}
      <div className="tabs">
        <button onClick={() => setBlogs(blogList)}> All</button>
        <button onClick={() => tabsSelect("news")}> News Feeds</button>
        <button onClick={() => tabsSelect("update")}>
          Update & events
        </button>
        <button onClick={() => tabsSelect("jobs")}>Jobs</button>
      </div>

      {/* Blog List & Empty View */}
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
