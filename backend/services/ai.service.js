import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAnswer = async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        let { prompt } = req.params;
        prompt = prompt + " Answer in short";

        const result = await model.generateContent(prompt);        
        return res.status(200).json(result.response.text());
    }
    catch (error) {
        console.log("ERROR in ai : ", error);
        res.status(500).json("Server error in AI");
    }
}