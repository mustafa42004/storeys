import api from "./api";

class NewsService {
  static async getNews() {
    const response = await api.get("/news");
    return response.data;
  }

  static async getNewsById(id) {
    const response = await api.get(`/news/${id}`);
    return response.data;
  }
}

export default NewsService;
