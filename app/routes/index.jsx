import {useLoaderData } from "remix";
const Cache = require('lru-cache');

const ssrCache = new Cache({
  max: 20,
  // maxAge: 1000 * 60 * 60, // 1hour
  maxAge: 5000, // 1hour
});
ssrCache.allowStale = true;

export const loader = async ({ params }) => {
    const key = "mycache";
    if (ssrCache.has(key)) {
      return {
        date: ssrCache.get(key),
      }
    }
    const js = await fetch("https://timercheck.io/YOURTIMERNAME/60");
    const time = (await js.json()).now;
    ssrCache.set(key, time);
    return {
      date: time
    }
};


export default function Index() {
  const {date} = useLoaderData();
  return <h1>Date: {date}</h1>
}
