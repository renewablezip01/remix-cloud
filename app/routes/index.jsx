export const loader = async ({ params }) => {
  const js = await fetch("https://timercheck.io/YOURTIMERNAME/60");
    return {
      date: (await js.json()).now
    }
};

export function headers() {
  return {
    "cache-control": "max-age=3000, s-maxage=36000, stale-while-revalidate=360000",
  };
}

export default function Index() {
  const {date} = useLoaderData();
  return <h1>Date: {date}</h1>
}
