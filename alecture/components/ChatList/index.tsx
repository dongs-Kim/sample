// import Chat from '@components/Chat';
import Chat from '@components/Chat';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IChat, IDM } from '@typings/db';
import React, { VFC, RefObject, useCallback, useRef ,forwardRef} from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface Props {
  // scrollbarRef: RefObject<Scrollbars>;
  scrollbarRef: RefObject<Scrollbars>;
  isReachingEnd?: boolean;
  isEmpty: boolean;
  chatSections: { [key: string]: (IDM|IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
}

// interface Props {
//   chatSections: {[key: string] : IDM[]};
// }
const ChatList = forwardRef<Scrollbars, Props >(({chatSections, setSize, isEmpty, isReachingEnd , scrollbarRef}) => {
  // const scrollbarRef = useRef(null);
  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
          setSize((size) => size + 1).then(() => {
          scrollbarRef.current?.scrollTop(scrollbarRef.current?.getScrollHeight() - values.scrollHeight);
        });
      }
    },
    [setSize, scrollbarRef, isReachingEnd, isEmpty],
  );

  
  
  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
    // <ChatZone>
    //     <Scrollbars autoHide  ref = {scrollbarRef} onScrollFrame={onScroll}>
    //       {Object.entries(chatSections).map(([date, chats]) => {
    //         return (

    //         )
    //       })}
    //       { chatSections?.map((chat) => (
    //       <Chat key = {chat.id} data = {chat}></Chat>
    //       ))}
    //     </Scrollbars>
    // </ChatZone>
  );
});

export default ChatList;
