import { GoogleGenAI, Content } from "@google/genai";
import { ChatMessage, Sender } from "../types";

const SYSTEM_INSTRUCTION = `
Anda adalah Asisten Virtual Cerdas untuk PBVSI (Persatuan Bola Voli Seluruh Indonesia) Provinsi Sulawesi Utara (Sulut).
Nama Anda adalah "VolleyBot Sulut".

Tugas Anda:
1. Memberikan informasi tentang aturan permainan bola voli (FIVB/PBVSI).
2. Memberikan informasi (fiktif/generik jika tidak ada data spesifik) tentang agenda voli di Sulawesi Utara (Manado, Minahasa, Bitung, dll).
3. Menjawab pertanyaan dengan sopan, energik, dan semangat olahraga.
4. Menggunakan Bahasa Indonesia yang baik, boleh sedikit disisipkan dialek Manado (seperti "Jo", "Torang") agar lebih akrab, tapi tetap formal.

Konteks Lokal:
- PBVSI Sulut berpusat di Manado.
- Fokus pada pembinaan atlet muda di Sulawesi Utara.
- Sering ada turnamen antarkampung (Tarkam) dan Proliga.

Jangan menjawab hal-hal yang melenceng jauh dari konteks olahraga voli atau Sulawesi Utara.
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  try {
    // Format history for Gemini
    // Map internal ChatMessage to Gemini Content format
    const formattedHistory: Content[] = history.map((msg) => ({
      role: msg.sender,
      parts: [{ text: msg.text }],
    }));

    const model = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balanced creativity and accuracy
      }
    });

    return response.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
  }
};