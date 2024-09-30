import JsonEditor from "@/components/json-editor";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="my-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Efficiently manage your data and seamlessly share it with others for
          enhanced collaboration and productivity.
        </p>
      </div>
      <JsonEditor />
      </div>
      
  );
}
