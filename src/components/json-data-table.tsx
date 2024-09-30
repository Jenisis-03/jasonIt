import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { format } from 'date-fns'; // Correct way to import
  
  const jsonDataList = [
    {
      id: "1",
      name: "Sample Data 1",
      createdAt: "2024-09-30",
    },
    {
      id: "2",
      name: "Sample Data 2",
      createdAt: "2024-09-29",
    },
    {
      id: "3",
      name: "Sample Data 3",
      createdAt: "2024-09-28",
    },
  ];
  
  export default function JsonDataTable() {
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
                {format(new Date(data.createdAt), 'MMMM d, yyyy')}
              </TableCell>
              <TableCell>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                  Share
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  