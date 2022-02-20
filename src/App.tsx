import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '~/src/colors';
import { MessageBox } from '~/src/MessageBox';
import { MessageInput } from '~/src/MessageInput';
import { wait } from '~/src/utils';

export type MessageType = {
  createdAt: string;
  avatar: string;
  body: string;
  username: string;
  id: string;
  isRead?: boolean;
};

function useMessages() {
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');

  React.useEffect(() => {
    fetch('https://620120b1fdf5090017249868.mockapi.io/api/v1/messages?page=2&limit=10')
      .then(res => {
        if (!res.ok) {
          throw new Error('error');
        }
        return res.json().then((messages: MessageType[]) => {
          setMessages(
            messages.map(message => ({
              ...message,
              body: message.body,
              // because icons from mockapi don't work for some reason
              avatar: `https://www.w3schools.com/w3images/avatar${Math.floor(
                Math.random() * 5 + 1
              )}.png`,
            }))
          );
          setStatus('success');
        });
      })
      .catch(err => {
        if (__DEV__) {
          console.log(err);
        }
        setMessages([]);
        setStatus('error');
      });
  }, []);

  const sendMessage = async (text: string) => {
    const id = Math.round(100 + Math.random() * 100000).toString();

    setMessages(prevMessages =>
      prevMessages.concat({
        createdAt: new Date().toString(),
        avatar: '',
        body: text,
        username: 'Alexander',
        id,
        isRead: false,
      })
    );

    await wait(800);

    setMessages(messages =>
      messages.map(message => (message.id === id ? { ...message, isRead: true } : message))
    );
  };

  return {
    messages,
    status,
    sendMessage,
  };
}

const styles = StyleSheet.create({
  loader: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: colors.white },
  messagesWrapper: { flex: 1, margin: 12 },
  myMessage: { marginBottom: 8, alignItems: 'flex-end' },
  otherMessage: { marginBottom: 8, alignItems: 'flex-start' },
});

export function App() {
  const ref = React.useRef<ScrollView>(null);
  const { status, messages, sendMessage } = useMessages();

  if (status === 'loading') {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  if (status === 'error') {
    return <Text>Some error occurred</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.messagesWrapper}
      >
        <ScrollView
          ref={ref}
          onContentSizeChange={() => ref.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(message => (
            <View
              key={message.id}
              style={message.username === 'Alexander' ? styles.myMessage : styles.otherMessage}
            >
              <MessageBox {...message} isMe={message.username === 'Alexander'} />
            </View>
          ))}
        </ScrollView>
        <MessageInput onSend={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
