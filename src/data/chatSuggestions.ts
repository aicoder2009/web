const suggestions: Record<string, string[]> = {
  home: [
    "What projects has Karthick built?",
    "Tell me about Setu Labs",
    "What is Lucky?",
    "What's Karthick's background?",
    "What tech stack does Karthick use?",
    "How can I contact Karthick?",
    "What certifications does Karthick have?",
    "Tell me about KidCon",
    "Tell me about Karthick's AWS keynote",
    "What leadership roles does Karthick have?",
  ],
  about: [
    "What are Karthick's interests?",
    "How can I contact Karthick?",
    "What certifications does Karthick have?",
    "Tell me about Karthick's achievements",
    "What's Karthick's education?",
    "What's Setu Labs' mission?",
  ],
  fun: [
    "Tell me about Karthick's side projects",
    "What is Pando?",
    "What's SnakeID?",
    "What is DotClock?",
    "Tell me about Linguarush",
    "What is Jerry?",
  ],
  project: [
    "Tell me more about this project",
    "What tech was used in this project?",
    "What inspired this project?",
    "How does this project work?",
    "Is this project open source?",
  ],
  blog: [
    "What topics does Karthick write about?",
    "Show me articles about AI",
    "What's the most recent blog post?",
    "Summarize Karthick's blog posts",
    "What has Karthick written about entrepreneurship?",
    "Tell me about Karthick's writing",
  ],
  blogPost: [
    "Summarize this article",
    "What are the key takeaways?",
    "Explain this concept in simpler terms",
    "What are related topics to this post?",
    "Tell me more about this topic",
  ],
};

export function getSuggestions(
  page: string,
  projectTitle?: string
): string[] {
  const pool = suggestions[page] || suggestions.home;

  // For project pages, add project-specific suggestions
  if (page === "project" && projectTitle) {
    const projectSpecific = [
      `Tell me more about ${projectTitle}`,
      `What tech was used in ${projectTitle}?`,
      `What inspired ${projectTitle}?`,
    ];
    const shuffled = [...projectSpecific, ...pool].sort(
      () => Math.random() - 0.5
    );
    return shuffled.slice(0, 3);
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

const keywordSuggestions: Record<string, string[]> = {
  "setu labs": [
    "What's Setu Labs' mission?",
    "Tell me about Setu Labs",
    "What does Setu Labs build?",
  ],
  setu: [
    "What's Setu Labs' mission?",
    "Tell me about Setu Labs",
    "What does Setu Labs build?",
  ],
  aigenie: [
    "Why did Aigenie rebrand to Setu Labs?",
    "What does Setu Labs build now?",
    "Is Ktutor still active?",
  ],
  ktutor: [
    "Why was Ktutor sunset?",
    "What is Setu Labs building now?",
    "Tell me about Lucky",
  ],
  lucky: [
    "What is Lucky?",
    "Is Lucky available yet?",
    "Where can I learn more about Lucky?",
  ],
  accessibility: [
    "What is Lucky?",
    "What's Setu Labs' mission?",
    "How does Setu Labs think about accessibility?",
  ],
  keynote: [
    "Tell me about the AWS Public Sector Summit keynote",
    "How did Karthick get the keynote slot?",
    "What was the keynote about?",
  ],
  nhs: [
    "What leadership roles does Karthick have?",
    "Tell me about Karthick's volunteer work",
    "What's the Blood Drive Coordinator role?",
  ],
  myac: [
    "What is MYAC?",
    "Tell me about Karthick's Youth Council role",
    "What community work does Karthick do?",
  ],
  devops: [
    "Tell me about the Basha DevOps Club",
    "What does Karthick do as VP?",
    "What's Karthick rebuilding at the DevOps Club?",
  ],
  infotruster: [
    "What is Infotruster?",
    "Tell me about Leangap",
    "How did Karthick win Most Outstanding Company?",
  ],
  kidcon: [
    "What was KidCon?",
    "Tell me about KidCon 2021",
    "Why did Karthick organize KidCon?",
  ],
  dotclock: [
    "How does DotClock work?",
    "What inspired DotClock?",
    "Is DotClock open source?",
  ],
  opencitation: [
    "What is OpenCitation?",
    "How does OpenCitation work?",
    "What problem does OpenCitation solve?",
  ],
  awsbreak: [
    "What is AWSBreak?",
    "How does AWSBreak help with AWS prep?",
    "What AWS certifications does Karthick have?",
  ],
  snakeid: [
    "How does SnakeID work?",
    "What tech is behind SnakeID?",
    "What inspired SnakeID?",
  ],
  linguarush: [
    "How does Linguarush work?",
    "What languages does Linguarush support?",
    "What inspired Linguarush?",
  ],
  jerry: [
    "What is Jerry?",
    "How does Jerry work?",
    "What tech was used for Jerry?",
  ],
  pando: [
    "What is Pando?",
    "How does Pando work?",
    "What inspired Pando?",
  ],
  aws: [
    "What AWS certifications does Karthick have?",
    "Tell me about Kids Cloud Club",
    "What cloud technologies does Karthick use?",
  ],
  cloud: [
    "What AWS certifications does Karthick have?",
    "Tell me about Kids Cloud Club",
    "What cloud technologies does Karthick use?",
  ],
  design: [
    "How does Karthick balance design and engineering?",
    "What tools does Karthick use?",
    "What's Karthick's design process?",
  ],
  engineer: [
    "How does Karthick balance design and engineering?",
    "What tools does Karthick use?",
    "What's Karthick's engineering background?",
  ],
  podcast: [
    "What's The AI Tripod Podcast about?",
    "Where can I listen to The AI Tripod?",
    "What topics does the podcast cover?",
  ],
  tripod: [
    "What's The AI Tripod Podcast about?",
    "Where can I listen to The AI Tripod?",
    "What topics does the podcast cover?",
  ],
  contact: [
    "How can I contact Karthick?",
    "What are Karthick's social links?",
    "What's the best way to reach Karthick?",
  ],
  email: [
    "How can I contact Karthick?",
    "What are Karthick's social links?",
    "What's the best way to reach Karthick?",
  ],
};

export function getFollowUpSuggestions(
  responseContent: string,
  previousMessages: string[] = []
): string[] {
  const lower = responseContent.toLowerCase();
  const matched: string[] = [];

  for (const [keyword, suggestions] of Object.entries(keywordSuggestions)) {
    if (lower.includes(keyword)) {
      matched.push(...suggestions);
    }
  }

  // Deduplicate and filter out previously asked
  const unique = [...new Set(matched)].filter(
    (s) => !previousMessages.includes(s)
  );

  // Shuffle and pick 3
  const shuffled = unique.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}
