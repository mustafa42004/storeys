import api from "./api";

class TestimonialsService {
  static async getTestimonials() {
    const response = await api.get("/testimonials");

    return response.data;
  }
}

export default TestimonialsService;
