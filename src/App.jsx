import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import "./App.css";
import RepoPage from "./RepoPage";

const App = () => {
  const [repos, setRepos] = useState([]); // Repository data
  const [searchTerm, setSearchTerm] = useState(""); // Search for organization
  const [searchTech, setSearchTech] = useState(""); // Search for technology
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "issues")); // Fetch data from 'issues' collection
        const fetchedRepos = querySnapshot.docs.map((doc) => doc.data()); // Map Firestore documents to data
        setRepos(fetchedRepos); // Set the fetched data to state
        //console.log(repos.link);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error); // Handle errors
      }
    };

    fetchData();
  }, []); // Run once on component mount

  const handleClick = (repoIndex, link) => {
    navigate(`/repo/${repoIndex}`, { state: { link } });
  };

  const filteredRepos = repos.filter((repo) => {
    const matchesName = repo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = searchTech
      ? repo.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTech.toLowerCase())
        )
      : true;
    return matchesName && matchesTech;
  });

  return (
    <>
      <header className="p-6 bg-blue-600 text-white text-center shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">GSOC Issue Tracker</h1>
      </header>
      <div className="p-8 flex">
        {/* Sidebar */}
        <aside className="w-1/4 pr-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Organizations</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by organization name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Technology</h2>
            <input
              type="text"
              value={searchTech}
              onChange={(e) => setSearchTech(e.target.value)}
              placeholder="Search by technology"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </aside>
        {/* Main Content */}
        <main className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.map((repo, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                {repo.name}
              </h2>
              <p className="text-gray-700 mb-4">{repo.description}</p>
              <div className="mb-4">
                <span className="block text-sm font-semibold text-gray-800">
                  Category:
                </span>
                <span className="text-gray-600">{repo.category}</span>
              </div>
              <div className="mb-4">
                <span className="block text-sm font-semibold text-gray-800">
                  Technologies:
                </span>
                <div className="flex flex-wrap mt-2">
                  {repo.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-white bg-blue-500 rounded-full px-3 py-1 m-1 font-semibold shadow-md transition duration-200 transform hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <span className="block text-sm font-semibold text-gray-800">
                  Topics:
                </span>
                <div className="flex flex-wrap mt-2">
                  {repo.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-white bg-yellow-500 rounded-full px-3 py-1 m-1 font-semibold shadow-md transition duration-200 transform hover:scale-105"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleClick(index, repo.link)}
                className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              >
                View Details
              </button>
            </div>
          ))}
        </main>
      </div>
      <Routes>
        <Route path="/repo/:repoId" element={<RepoPage />} />
      </Routes>
    </>
  );
};

export default App;
