import api from "./api";

class ContactService {
  static async createContact(contact) {
    const response = await api.post("/contacts", contact);
    return response.data;
  }
}

export default ContactService;
