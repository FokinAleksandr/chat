import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import type { MessageType } from '~/src/App';
import { colors } from '~/src/colors';
import readArrow from '~/src/icons/readArrow/readArrow.png';
import sentArrow from '~/src/icons/sentArrow/sentArrow.png';

type MessageBoxProps = MessageType & { isMe: boolean };

const styles = StyleSheet.create({
  messageWrapper: { flexDirection: 'row', alignItems: 'flex-end', maxWidth: '70%' },
  message: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  username: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: colors.blue,
  },
  messageText: { fontSize: 17, lineHeight: 24 },
  messageTimeWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageTime: { fontSize: 13, lineHeight: 20 },
  sendIcon: { marginLeft: 4 },
  myMessage: { backgroundColor: colors.blue, borderBottomRightRadius: 2 },
  otherMessage: { backgroundColor: colors.cultured, borderBottomLeftRadius: 2 },
  emptySpace: { width: 60 },
});

export function MessageBox(props: MessageBoxProps) {
  const { body, isMe, createdAt, isRead, avatar, username } = props;

  const date = new Date(createdAt);
  const messageTime = `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return (
    <View style={styles.messageWrapper}>
      {!isMe && <Image style={styles.avatar} source={{ uri: avatar }} />}
      <View style={[styles.message, isMe ? styles.myMessage : styles.otherMessage]}>
        {!isMe && <Text style={styles.username}>{username}</Text>}
        <Text>
          <Text
            style={[
              styles.messageText,
              {
                color: isMe ? colors.white : colors.charcoal,
              },
            ]}
          >
            {body}
          </Text>
          <View style={styles.emptySpace} />
        </Text>
        <View style={styles.messageTimeWrapper}>
          <Text style={[styles.messageTime, { color: isMe ? colors.white : colors.cadetBlue }]}>
            {messageTime}
          </Text>
          {isMe && <Image source={isRead ? readArrow : sentArrow} style={styles.sendIcon} />}
        </View>
      </View>
    </View>
  );
}
