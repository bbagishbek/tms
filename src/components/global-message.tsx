import type { MessageType } from '../../types/messages';

type GlobalMessageComponent = React.FC<{
  children?: string | null;
  type?: MessageType;
}>;

const StylesByMessageType: Record<MessageType, string> = {
  ERROR: 'bg-red-400 text-red-900',
  WARN: 'bg-yellow-400 text-yellow-900',
  INFO: 'bg-blue-400 text-blue-900',
  SUCCESS: 'bg-green-400 text-green-900'
};

const IconByMessageType: Record<MessageType, string> = {
  ERROR: '⛔️',
  WARN: '⚠️',
  INFO: 'ℹ️',
  SUCCESS: '✅'
};

const getStylesByMessageType = (messageType?: MessageType) =>
  messageType ? StylesByMessageType[messageType] : 'bg-slate-900 text-white';

const getIconByMessageType = (messageType?: MessageType) =>
  messageType ? IconByMessageType[messageType] : '';

export const GlobalMessage: GlobalMessageComponent = ({ children, type }) => {
  if (!children) return null;
  return (
    <div
      className={`absolute top-0 z-50 flex h-8 w-screen items-center ${getStylesByMessageType(
        type
      )}`}
    >
      <p className="px-4">
        <span className="mr-3">{getIconByMessageType(type)}</span>
        {children}
      </p>
    </div>
  );
};
