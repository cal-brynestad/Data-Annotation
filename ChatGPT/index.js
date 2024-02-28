import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create new CustomStreamingTextResponse Object
class CustomStreamingTextResponse extends StreamingTextResponse {
    constructor(stream, extraFields) {
        super(stream);
        this.extraFields = extraFields;
        this.response = '';
    }
}

// Initialize OpenAI instance with the API key from environment variables
const openai = new OpenAI({
    apiKey: ""
});

export default async function POST(req, res) {
    const { messages } = await req.json();

    // Transform messages to the format that OpenAI expects
    const transformedMessages = messages.map(message => {
        return {
            role: message.role,
            content: message.content,
        };
    });

    console.log(transformedMessages);

    const stream = await openai.chat.completions.create({
        model: "gpt-4",
        stream: true, 
        messages: transformedMessages,   
        temperature: 0.2,
        top_p: 1.0,
        n: 1,
        presence_penalty: 0.0,
        frequency_penalty: 0.0,
        logit_bias: {},
    });

    // Create instance of CustomStreamingTextResponse with added fields
    const customStreamResponse = new CustomStreamingTextResponse(stream, {
        extraField1: 'value1',
        extraField2: 'value2',
    });

    // Process and accumulate prompt response, adding it to customStreamResponse instance of CustomStreamingTextResponse
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        customStreamResponse.response += content;
    }

    // Pass extra field with res
    res.write(JSON.stringify(customStreamResponse));
  
    // return original, unmodified stream
    return new StreamingTextResponse(stream);
}
