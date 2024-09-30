import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JsonData } from "@prisma/client";
import { format } from "date-fns";
import { ShareIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function JsonDataTable() {
  const [jsonDataList, setJsonDataList] = useState<JsonData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/json");
      const data = await response.json();
      setJsonDataList(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };

  useEffect(() => {
    fetchData(); // Only call fetchData on mount
  }, []); // Empty dependency array, so this only runs once

  if (loading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  if (!jsonDataList.length) {
    return <div className="text-center text-gray-500 mt-6">No JSON data found.</div>; // Display message if no data is available
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>
            <span className="sr-only">Share</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jsonDataList.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.name}</TableCell>
            <TableCell>
              {format(new Date(data.createdAt), "MMMM d, yyyy")}
            </TableCell>
            <TableCell>
              <Link href={`/${data.id}`}> {/* Corrected to use backticks for template literals */}
                <ShareIcon className="h-4 w-4" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
