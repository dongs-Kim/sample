import { CollapseButton } from '@components/DMList/styles';
import EachChannel from '@components/EachChannel';
// import EachChannel from '@components/EachChannel';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { channel } from 'diagnostics_channel';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

interface Props {
  channelData?: IChannel[];
  userData?: IUser;
}

const ChannelList: FC<Props> = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState<{ [key: string]: number | undefined }>({});

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const resetCount = useCallback((id) => {
    setCountList((list) => {
      return {
        ...list,
        [id]: undefined,
      };
    });
  }, []);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            // console.log('여긴언제쯤탐');
            return <EachChannel key={channel.id} channel={channel} />;
            // return <div>{channel.name}</div>;
          })}
        {/* {!channelCollapse &&
          channelData?.map((channel) => {
            const count = countList[`c-${channel.id}`];
            return (
              <NavLink
                key={channel.name}
                activeClassName="selected"
                to={`workspace/${workspace}/channel/${channel.name}`}
                onClick={resetCount(`c-${channel.id}`)}
              >
                <span className={count !== undefined && count >= 0 ? 'bold' : undefined}># {channel.name}</span>
                {count !== undefined && count > 0 && <span className="count">{count}</span>}
              </NavLink>
            );
          })} */}
      </div>
    </>
  );
};

export default ChannelList;
