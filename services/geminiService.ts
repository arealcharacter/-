
import { GoogleGenAI, Type } from "@google/genai";
import type { Food } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'نام غذا',
      },
      description: {
        type: Type.STRING,
        description: 'توضیح مختصر در مورد غذا و مواد اصلی آن',
      },
      type: {
        type: Type.STRING,
        enum: ['صبحانه', 'ناهار', 'شام', 'دسر', 'نوشیدنی'],
        description: 'وعده غذایی که این غذا برای آن مناسب است',
      },
    },
    required: ['name', 'description', 'type'],
  },
};

export const getDailyFoodSuggestions = async (): Promise<Food[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "لطفاً یک لیست شامل 3 تا 5 پیشنهاد غذای ایرانی برای امروز (شامل صبحانه، ناهار و شام) ارائه بده. برای هر غذا یک توضیح کوتاه هم بنویس.",
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const suggestions = JSON.parse(jsonText);
    
    // Validate if the response is an array
    if (!Array.isArray(suggestions)) {
        console.error("Parsed response is not an array:", suggestions);
        throw new Error("پاسخ دریافت شده از سرویس در قالب مورد انتظار نیست.");
    }

    return suggestions as Food[];

  } catch (error) {
    console.error("Error fetching food suggestions:", error);
    throw new Error("متاسفانه در دریافت پیشنهاد غذا مشکلی پیش آمد. لطفاً دوباره تلاش کنید.");
  }
};
