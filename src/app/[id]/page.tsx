"use client";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useEffect, useState } from "react";
import { JsonData } from "@prisma/client"; // Ensure you have defined this interface appropriately

interface SharedJsonProps {
  params: {
    id: string;
  };
}

export default function SharedJson({ params }: SharedJsonProps) {
  const { id } = params;
  const [jsonData, setJsonData] = useState<JsonData | null>(null); // Changed to accept a single object
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/json/${id}`); // Use backticks for template literals
        const data = await response.json();
        console.log(data); // Log the fetched data for debugging
        setJsonData(data); // Assuming data is a single object
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchData(); // Only call fetchData on mount
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jsonData) {
    return <div className="text-center text-gray-500 mt-6">No JSON data found.</div>; // Handle case where no data is returned
  }

  return (
    <div className="mt-8 space-y-4">
      <h1 className="text-2xl underline font-bold">{jsonData.name}</h1>
      <CodeMirror
        value={jsonData.content || ''} // Ensure content is properly accessed
        height="400px"
        extensions={[json()]}
        editable={false}
        className="border shadow-sm"
      />
    </div>
  );
}
