import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5000";

interface ChatRequest {
  message: string;
  sessionId?: string;
}


class ChatRepository {
  private sessionId: string | undefined = undefined;
  
  async sendMessage(message: string): Promise<string> {
    try {
      const response: AxiosResponse<string> = await axios.post(
        `${API_BASE_URL}/chat`,
        { message, sessionId: this.sessionId } as ChatRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const sessionId = response.headers["x-session-id"];
      console.log(sessionId)
      if (sessionId) {
        this.sessionId = sessionId;
        console.log("Session ID saved:", sessionId);
      }

      return response.data;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      throw error;
    }
  }

  getSessionId(): string | undefined {
    return this.sessionId;
  }
}

// Exportar uma instância singleton
export const chatRepository = new ChatRepository();
