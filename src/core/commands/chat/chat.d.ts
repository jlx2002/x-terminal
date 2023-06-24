interface chatMessageConfig{
    role: 'system' | 'user' | 'assistant',
    content: string
}

interface chatConfig{
    name: string,
    description?: string;
    model: string;
    messages: chatMessageConfig[],
    presence_penalty?: number,
    temperature?: number, 
    stream?:boolean,
    max_tokens: number, // 单条最多token数量
    sendMemory?: boolean, // 发送历史消息
    historyMessageCount?: number, // 历史消息上限
    compressMessageLengthThreshold?: number // 压缩消息长度阈值
}
