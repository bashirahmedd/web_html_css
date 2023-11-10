import OpenAI from "openai";

const openai = new OpenAI({
    apiKey : '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'
  });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();