"use client";
import { useState, useEffect, useCallback } from "react";
import { Advocate } from "@/types/advocate";
import debounce from "lodash.debounce";

import AdvocateTable from "./components/AdvocateTable";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setLoading(false);
      });
    });
  }, []);

  const debouncedFilter = useCallback(
    debounce((searchTerm: string) => {
      const filteredAdvocates = advocates.filter((advocate) => {
        return (
          advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.specialties.some((specialty) =>
            specialty.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          String(advocate.yearsOfExperience).includes(searchTerm)
        );
      });
      setFilteredAdvocates(filteredAdvocates);
    }, 300),
    [advocates]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      debouncedFilter(searchTerm);
    },
    [debouncedFilter]
  );

  const onClick = useCallback(() => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  }, [advocates]);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Solace Advocates</h1>
      <SearchBar
        onChange={onChange}
        onClick={onClick}
        searchTerm={searchTerm}
      />
      {loading ? (
        <Loader />
      ) : filteredAdvocates.length === 0 ? (
        <p className="text-center text-gray-600">No data available</p>
      ) : (
        <AdvocateTable advocates={filteredAdvocates} />
      )}
    </main>
  );
}
