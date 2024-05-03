// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { geminiPro } from '@/services/gen-ai';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RequestPayload {
  company: string;
  industry: string;
  platform: string;
  topics: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { company, industry, platform, topics }: RequestPayload = req.body;
  const prompt = `
  Gere 5 ideias de posts para a empresa '${company}'
  que atua no ramo de '${industry}'
  para a plataforma '${platform}',
  abordando os seguintes tipos de assuntos: '${topics.join(', ')}'

  Retorne uma array json no seguinte schema: { title: string, content: string, hashtags: string[] }. Remove o \`\`\`json no início e no final do texto e caracteres especiais.
  `;

  const result = await geminiPro.generateContent(prompt);
  const text = result.response.text();

  // add zod to validate the response

  res.status(200).json(JSON.parse(text));
}
