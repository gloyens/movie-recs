"use client";

import { useEffect, useState } from "react";

import { useAppContext } from "@/app/utils/context";
import askOpenAI from "@/app/api/generateAnswer";

export default function OpenAI() {
  const { prompt } = useAppContext();
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Removing the useEffect will cause the component to re-render repeatedly
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await askOpenAI(prompt);
      setResponse(result);
      setIsLoading(false);
    };

    fetchData();
  }, [prompt]);

  return (
    <p>
      <strong>{prompt}</strong>
      <br />
      {isLoading ? "Generating..." : response}
    </p>
  );
}
