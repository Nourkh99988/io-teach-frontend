// lib/api/fetchFromStrapi.ts
export async function fetchFromStrapi<T>(endpoint: string, locale?: string): Promise<T | null> {
  try {
    const url = new URL(`http://localhost:1337${endpoint}&locale=${locale || ""}`);

    // if (locale) {
    //   url.searchParams.set("locale", locale);
    // }
    // console.log(url);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}, status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ Error fetching from ${endpoint}:`, error);
    return null;
  }
}
