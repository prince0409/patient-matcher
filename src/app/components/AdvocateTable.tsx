import React, { useState } from "react";
import { Advocate } from "@/types/advocate";

interface AdvocateTableProps {
  advocates: Advocate[];
}

const AdvocateTable: React.FC<AdvocateTableProps> = React.memo(
  ({ advocates }) => {
    return (
      <div className="overflow-x-auto">
        <table
          className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
          aria-label="Advocates Table"
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Degree</th>
              <th className="py-3 px-4">Specialties</th>
              <th className="py-3 px-4">Years of Experience</th>
              <th className="py-3 px-4">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {advocates.map((advocate, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{advocate.firstName}</td>
                <td className="py-3 px-4 border-b">{advocate.lastName}</td>
                <td className="py-3 px-4 border-b">{advocate.city}</td>
                <td className="py-3 px-4 border-b">{advocate.degree}</td>
                <td className="py-3 px-4 border-b">
                  <Specialties specialties={advocate.specialties} />
                </td>
                <td className="py-3 px-4 border-b">
                  {advocate.yearsOfExperience}
                </td>
                <td className="py-3 px-4 border-b">{advocate.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

const Specialties: React.FC<{ specialties: string[] }> = ({ specialties }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {specialties
        .slice(0, expanded ? specialties.length : 3)
        .map((specialty, index) => (
          <div key={index}>{specialty}</div>
        ))}
      {specialties.length > 3 && (
        <button
          onClick={toggleExpanded}
          className="text-blue-500 underline mt-2"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default AdvocateTable;
