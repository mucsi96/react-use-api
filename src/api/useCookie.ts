import { useState } from "react";

const setCookie = (
  name: string,
  value: string,
  options: { days: number; path: string }
) => {
  const expires = new Date(Date.now() + options.days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=" +
    options.path;
};

const getCookie = (name: string) => {
  if (!document.cookie) {
    return undefined;
  }

  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

export function useCookie(
  key: string,
  initialValue: string
): [string, (value: string, options?: { days: number; path: string }) => void] {
  const [item, setItem] = useState(() => {
    return getCookie(key) || initialValue;
  });

  const updateItem = (value: string, options = { days: 7, path: "/" }) => {
    setItem(value);
    setCookie(key, value, options);
  };

  return [item, updateItem];
}
