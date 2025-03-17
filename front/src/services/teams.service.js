import api from "./api";

class TeamsService {
  static async getTeams() {
    const response = await api.get("/teams");

    return response.data;
  }
}

export default TeamsService;
