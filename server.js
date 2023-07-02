import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.post("/dream", async (req, res) => {
    try{
  const prompt = req.body.prompt;

  const aiResponse = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
  });

  console.log(aiResponse)
  const image = aiResponse.data.data[0].url;
  res.send({ image });
}
   catch (error) {

    console.error(error)
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});



 app.listen(8080, () =>
   console.log("connected to backend on http://localhost:8080/dream")
 );

