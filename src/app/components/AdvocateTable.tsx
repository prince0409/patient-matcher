import React from "react";
import { Advocate } from "@/types/advocate";

interface AdvocateTableProps {
  advocates: Advocate[];
}

const AdvocateTable: React.FC<AdvocateTableProps> = React.memo(
  ({ advocates }) => {
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Degree</th>
            <th className="py-2 px-4 border-b">Specialties</th>
            <th className="py-2 px-4 border-b">Years of Experience</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{advocate.firstName}</td>
              <td className="py-2 px-4 border-b">{advocate.lastName}</td>
              <td className="py-2 px-4 border-b">{advocate.city}</td>
              <td className="py-2 px-4 border-b">{advocate.degree}</td>
              <td className="py-2 px-4 border-b">
                {advocate.specialties.map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
              </td>
              <td className="py-2 px-4 border-b">
                {advocate.yearsOfExperience}
              </td>
              <td className="py-2 px-4 border-b">{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

export default AdvocateTable;
