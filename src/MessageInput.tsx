import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, setOpacity } from '~/src/colors';

type MessageInputProps = {
  onSend: (text: string) => void;
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: setOpacity(colors.charcoal, 0.1),
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    maxHeight: 120,
    lineHeight: 24,
    fontSize: 17,
    color: colors.charcoal,
    padding: 0,
    paddingTop: 0,
  },
  send: { marginLeft: 8, fontSize: 17, lineHeight: 24, color: colors.electric },
});

export function MessageInput(props: MessageInputProps) {
  const [inputText, setInputText] = React.useState('');

  const { onSend } = props;

  const handleSend = () => {
    onSend(inputText);
    setInputText('');
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        multiline
        value={inputText}
        placeholder="Write here…"
        placeholderTextColor={colors.cadetBlue}
        style={styles.input}
        textAlignVertical="bottom"
        onChangeText={setInputText}
      />
      {inputText.length > 0 && (
        <Text style={styles.send} onPress={handleSend}>
          Send
        </Text>
      )}
    </View>
  );
}
