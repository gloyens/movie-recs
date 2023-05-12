"use client";

import { useAppContext } from "@/app/utils/context";

export default function Form() {
  const { setPrompt } = useAppContext();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPrompt(
          (e.currentTarget.elements.namedItem("prompt") as HTMLInputElement)
            ?.value || ""
        );
      }}
    >
      <input type="text" name="prompt" defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
