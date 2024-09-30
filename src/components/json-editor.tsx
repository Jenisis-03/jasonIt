'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JsonDataTable from "./json-data-table";
import AddJsonDialog from "./add-json-dialog";
import { useState } from "react";

export default function JsonEditor() {
  const [refreshKey ,setRefreshKey]=useState(0);
  const handleSave = async (jsonName: string, jsonData: string) => {
    const response = await fetch('/api/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: jsonName, content: jsonData }),
    });

    if (response.ok) {
      setRefreshKey(prevKey => prevKey + 1); // Force a refresh to display the new data
      console.log('Data successfully added');
    } else {
      console.error('Failed to add data');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved JSON Data</CardTitle>
        <CardDescription>View and Share Your Saved JSON Data.</CardDescription>
      </CardHeader>
      <CardContent>
        <JsonDataTable key={refreshKey} />
      </CardContent>
      <CardFooter>
        <AddJsonDialog onSave={handleSave} />
      </CardFooter>
    </Card>
  );
}
