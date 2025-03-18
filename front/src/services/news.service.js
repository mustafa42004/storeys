import api from "./api";

class NewsService {
  static async getNews() {
    const response = await api.get("/news");
    return response.data;
  }

  static async getNewsById({ queryKey }) {
    const response = await api.get(`/news/${queryKey[1]}`);
    return response.data;
  }
}

export default NewsService;
