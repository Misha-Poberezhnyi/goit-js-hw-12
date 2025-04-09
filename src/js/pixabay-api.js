import axios from "axios";

const API_KEY = "49635382-66eda9712402d4470ed35045b";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });

    return { images: data.hits, total: data.totalHits };
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return { images: [], total: 0 };
  }
}
