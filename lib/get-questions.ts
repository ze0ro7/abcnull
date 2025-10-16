import fs from 'fs/promises';
import path from 'path';

// Define the structure of a question based on your JSON
interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  solution: string;
  marks: number;
  type: string;
}

export async function getQuestions(year: string): Promise<Question[]> {
  const filePath = path.join(process.cwd(), 'public', `${year}-che-pyqs.json`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const questions = JSON.parse(fileContent);
    return questions;
  } catch (error) {
    // If the file doesn't exist, or there's a parsing error, return an empty array.
    // This prevents the app from crashing for years without a question paper.
    console.error(`Could not load questions for year ${year}:`, error);
    return [];
  }
}
