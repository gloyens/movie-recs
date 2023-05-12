"use client";

import { useEffect, useState } from "react";

import { useAppContext } from "@/app/utils/context";
import askOpenAI from "@/app/api/generateAnswer";

export default function OpenAI() {
  const { prompt } = useAppContext();
  const [response, setResponse] = useState("");

  // Only change the display when the prompt changes
  // Removing the useEffect will cause the component to re-render repeatedly
  useEffect(() => {
    const fetchData = async () => {
      const result = await askOpenAI(prompt);
      setResponse(result);
    };

    fetchData();
  }, [prompt]);

  return (
    <p>
      <strong>{prompt}</strong>
      <br />
      {response}
    </p>
  );
}
