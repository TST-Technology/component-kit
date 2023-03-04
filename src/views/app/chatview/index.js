import moment from 'moment/moment';
import React, { Suspense, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getChatViewDetails } from 'utils/API/api';
import './chatinfo.scss';

const Chatview = () => {
  const { id } = useParams();
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getChatViewDetails(id);
      if (res !== -1) {
        setChat(res?.data?.data);
        setMessage(res?.data?.data?.data);
      }
    })();
  }, []);

  return (
    <Suspense fallback={<div className="loading" />}>
      <div className="Container">
        <div className="Profileview">
          <span className="SpanHeading">Profile </span>

          <img className="Picview" src={chat?.advisor?.profile} alt="profile" />

          <div className="ProfileDetails">
            <span className="Spantext">Name : {chat?.advisor?.name}</span>

            <span className="Spantext">Charges : {chat?.advisor?.charges}</span>

            <span className="Spantext">Rating :{chat?.advisor?.ratings}</span>

            <span className="Spantext">
              Language :{chat?.advisor?.languages[0]}
            </span>
          </div>
        </div>

        <div className="Chatview">
          <span className="SpanHeading">Chat </span>

          <div className="chatList">
            {message.map((chatData) => (
              <div key={chatData?.id}>
                {chatData.isUserSender === true ? (
                  <div className="Leftview">
                    {chatData?.type === 'message' ? (
                      <div>
                        <span className="Textmessage">{chatData?.message}</span>
                        <span className="TextTime">
                          {moment(chatData?.createdAt).local().format('h:mm a')}
                        </span>
                      </div>
                    ) : (
                      <a
                        href={chatData?.message}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="simple-icon-arrow-down-circle" />
                        &nbsp;
                        <i className="iconsminds-folders" />
                        &nbsp; File
                        <span className="TextTime">
                          {moment(chatData?.createdAt).local().format('h:mm a')}
                        </span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="Rightview">
                    {chatData?.type === 'message' ? (
                      <div>
                        <span className="Textmessage">{chatData?.message}</span>
                        <span className="rigthTextTime">
                          {moment(chatData?.createdAt).local().format('h:mm a')}
                        </span>
                      </div>
                    ) : (
                      <a
                        href={chatData?.message}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="iconsminds-folders" />
                        &nbsp; File &nbsp;
                        <i className="simple-icon-arrow-down-circle" />
                        <span className="rigthTextTime">
                          {moment(chatData?.createdAt).local().format('h:mm a')}
                        </span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default Chatview;
