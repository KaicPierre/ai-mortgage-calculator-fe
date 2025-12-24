import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5000";

interface ChatRequest {
  message: string;
  sessionId?: string;
}

interface ApprovalRequest {
  approval: { 
    approved: boolean
  };
  sessionId: string;
}


interface IApprovalResponse {
  response: string,
  sessionId: string
  requiresApproval: boolean
}

interface IMessageResponse {
  response: string,
  sessionId: string,
  requiresApproval: boolean,
  pendingCalculation: IPendingCalculation
}

interface IPendingCalculation {
  interestRate: number,
  downPayment: number,
  zipCode: string,
  homePrice: number,
  loanTerm: number
}


class ChatRepository {
  private sessionId: string | undefined = undefined;
  
  async sendMessage(message: string): Promise<IMessageResponse> {
    try {
      const response: AxiosResponse<IMessageResponse> = await axios.post(
        `${API_BASE_URL}/chat`,
        { message, sessionId: this.sessionId } as ChatRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      this.sessionId = response.data.sessionId
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      throw error;
    }
  }

 async sendApproval(approved: boolean): Promise<IApprovalResponse> {
    try {
      const response: AxiosResponse<IApprovalResponse> = await axios.post(
        `${API_BASE_URL}/chat`,
        { sessionId: this.sessionId, approval: { approved } } as ApprovalRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
