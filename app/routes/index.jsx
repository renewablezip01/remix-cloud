import {json, useLoaderData } from "remix";

export const loader = async ({ params }) => {
  const js = await fetch("https://timercheck.io/YOURTIMERNAME/60");
    return json({
      date: (await js.json()).now
    },
    {
      headers: {
        "cache-control": "max-age=3000, s-maxage=36000",
      }
    })
};

export function headers() {
  return {
    "cache-control": "max-age=3000, s-maxage=36000",
  };
}

export default function Index() {
  const {date} = useLoaderData();
  return <h1>Date: {date}</h1>
}
