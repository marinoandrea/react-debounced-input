import { FormEvent, HTMLProps, useEffect, useState } from "react";

interface DebouncedInputProps extends HTMLProps<HTMLInputElement> {
  /** Number of milliseconds between every call of `onChange` (defaults to `300`) */
  debounceMs?: number;
}

/**
 * Input component that debounces `onChange` event handler.
 * It ensures that the handler fires only every `debounceMs` milliseconds */
export default function DebouncedInput({
  onChange,
  debounceMs = 300,
  ...props
}: DebouncedInputProps) {
  const [lastEvent, setLastEvent] = useState<FormEvent<HTMLInputElement>>();

  useEffect(() => {
    if (!lastEvent || !onChange) return;
    const timeout = setTimeout(() => onChange(lastEvent), debounceMs);
    return () => clearTimeout(timeout);
  }, [lastEvent]);

  // NOTE: the event must be copied in order for the currentTarget to persist.
  // For more info about the event pooling: https://github.com/facebook/react/issues/2857
  return <input {...props} onChange={(e) => setLastEvent({ ...e })} />;
}
