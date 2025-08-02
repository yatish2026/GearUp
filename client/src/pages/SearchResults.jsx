import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { axios } = useAppContext();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(`/api/cars/search?query=${query}`);
        if (data.success) {
          setResults(data.cars);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Error fetching search results");
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="px-6 py-4 text-white">
      <h2 className="text-2xl mb-4">Search results for: "{query}"</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((car) => (
            <div key={car._id} className="bg-gray-900 p-4 rounded shadow">
              <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded" />
              <h3 className="text-lg mt-2 font-bold">{car.name}</h3>
              <p>{car.location}</p>
              <p>₹{car.price}/day</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
