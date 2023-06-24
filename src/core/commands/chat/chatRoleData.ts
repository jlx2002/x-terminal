export const chatRoles = ["default", "lang", "sql", "command"];

export const chatDefaultConfig: chatConfig = {
  name: "default",
  description: "默认",
  model: "gpt-3.5-turbo",
  stream: true,
  temperature: 1,
  max_tokens: 1000,
  presence_penalty: 0,
  messages: [],
};

export const chatRoleData: chatConfig[] = [
  {
    name: "default",
    description: "默认",
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 1,
    max_tokens: 2000,
    presence_penalty: 0,
    messages: [],
  },
  {
    name: "english",
    description: "英文翻译和改进者",
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 1,
    max_tokens: 2000,
    presence_penalty: 0,
    messages: [
      {
        role: "user",
        content: `I want you to act as an English translator, spelling corrector and improver.
      I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English.
      I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. 
      Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations.
      My first sentence is "istanbulu cok seviyom burada olmak cok guzel"`,
      },
    ],
  },
  {
    name: "lang",
    description: "语言检测器",
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 1,
    max_tokens: 1000,
    presence_penalty: 0,
    messages: [
      {
        role: "user",
        content:
          "我希望你充当语言检测器。我会用任何语言输入一个句子，你会回答我，我写的句子在你是用哪种语言写的。不要写任何解释或其他文字，只需回复语言名称即可。我的第一句话是：",
      },
    ],
  },
  {
    name: "sql",
    description: "SQL终端机",
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 1,
    max_tokens: 2000,
    presence_penalty: 0,
    messages: [
      {
        role: "user",
        content: `我希望您在示例数据库前充当 SQL 终端。该数据库包含名为“Products”、“Users”、“Orders”和“Suppliers”的表。我将输入查询，您将回复终端显示的内容。我希望您在单个代码块中使用查询结果表进行回复，仅此而已。不要写解释。除非我指示您这样做，否则不要键入命令。当我需要用英语告诉你一些事情时，我会用大括号{like this)。我的第一个命令是"SELECT TOP 10 * FROM Products ORDER BY Id DESC"`,
      },
    ],
  },
  {
    name: "command",
    description: "终端命令提示机",
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 1,
    max_tokens: 2000,
    presence_penalty: 0,
    messages: [
      {
        role: "system",
        content: `You are a command line translation program for windows os. You can translate natural language instructions from human language into corresponding command line statements.

          Simply output the translated instruction without any explanation. Add the ">" symbol at the beginning of the output.
          
          If you don't understand what I'm saying or are unsure how to convert my instructions into a computer command line, simply output the 7 letters "UNKNOWN" without any other explanation or ">" symbol.
          
          If the translated result consists of more than one line of commands, please use '&' or '&&' to combine them into a single line of command.
          
          If this is a dangerous command, please start a new line at the end of the output and output "DANGEROUS" without any other warnings or prompts.`,
      },
      {
        role: "user",
        content: `how's the weather like today?`,
      },
      {
        role: "assistant",
        content: `UNKNOWN`,
      },
      {
        role: "user",
        content: `clone the React library from Github and create a new branch locally named "feat-gpt"`,
      },
      {
        role: "assistant",
        content: `git clone https://github.com/facebook/react.git && cd react && git checkout -b feat-gpt`,
      },
      {
        role: "user",
        content: `delete all files or folders`,
      },
      {
        role: "assistant",
        content: `rm -rf *`,
      },
    ],
  },
];
