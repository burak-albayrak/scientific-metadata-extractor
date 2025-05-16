# LLM API Selection

## Decision

We will use **OpenAI GPT-4.1 mini** via the Chat Completions API.

## Reasoning

GPT-4.1 mini provides a strong balance of output quality and cost efficiency. It supports structured JSON output, large context windows (128k tokens), and is reliable for prompt-following in information extraction tasks. The cost is affordable (approx. $0.002 per request for our use case), and OpenAI’s Python SDK simplifies integration.

## Comparison Table

| Provider       | Model             | Price (per 1M tokens)       | Context Limit | Notes |
|----------------|-------------------|-----------------------------|----------------|-------|
| OpenAI         | GPT-4.1 mini      | $0.40 input / $1.60 output  | 128,000 tokens | Accurate, fast, affordable |
| OpenAI         | GPT-4.1 (full)    | $2 input / $8 output        | 256,000 tokens | High-quality, expensive |
| HuggingFace    | LLaMA 3 70B       | Free tier (limited), then $ | ~32,000 tokens | JSON often unstable, slower |