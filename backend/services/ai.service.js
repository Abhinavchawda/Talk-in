import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAnswer = async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        let { prompt } = req.params;
        prompt = prompt + " Answer in short and provide the response in valid HTML format with tags like <ul>, <li>, <strong>, <code>, etc., to enhance readability. Give the response so that i can show it in a web page by parsing the response usig html-react-parser library, so give the response accordingly. Also, answer should be in a beautiful and attractive format. I you dont know the answer, then just give a beautiful sample formatted answer, do not use any static answer. Use proper gaps, line breaks, and formatting to make the response look good.";

        const result = await model.generateContent(prompt);
        return res.status(200).json(result.response.text());
    }
    catch (error) {
        console.log("ERROR in ai : ", error);
        res.status(500).json("Server error in AI");
    }
}