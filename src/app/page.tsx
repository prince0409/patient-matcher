"use client";
import { useState, useEffect, useCallback } from "react";
import { Advocate } from "@/types/advocate";
import debounce from "lodash.debounce";

import AdvocateTable from "./components/AdvocateTable";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const debouncedFilter = useCallback(
    debounce((searchTerm: string) => {
      const filteredAdvocates = advocates.filter((advocate) => {
        return (
          advocate.firstName.includes(searchTerm) ||
          advocate.lastName.includes(searchTerm) ||
          advocate.city.includes(searchTerm) ||
          advocate.degree.includes(searchTerm) ||
          advocate.specialties.includes(searchTerm) ||
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
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Solace Advocates</h1>
      <SearchBar
        onChange={onChange}
        onClick={onClick}
        searchTerm={searchTerm}
      />
      <AdvocateTable advocates={filteredAdvocates} />
    </main>
  );
}
