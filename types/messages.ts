export type MessageType = 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';

export type Message = { type: MessageType; value: string } | null | undefined;
