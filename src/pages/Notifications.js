import { useTheme } from '@mui/material/styles';
import { Avatar, Paper } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { acknowledgeNotifications } from '../actions/notification';
import Container from '../components/Container';
import Context from '../utils/Context';

export default function Notifications() {
  const { notifications, sessionToken, uiMode } = useContext(Context);
  const theme = useTheme();

  useEffect(() => {
    if (notifications.filter((n) => !n.seen).length > 0) {
      acknowledgeNotifications(sessionToken, notifications[0], notifications[notifications.length - 1]);

    }
  }, [notifications]);

  const getNotificationByType = notification => {
    const triggerUser = notification.triggered_by_user;
    const NotificationAvatar = () => (
        <Avatar
        alt={"@" + triggerUser.username}
        src={triggerUser.profile_pic}
        style={{ float: "left", marginRight: 10 }}
        sx={{ width: 56, height: 56 }}
      />
    );
    const TextWrap = ({children}) => (
      <div style={{
        marginLeft: 64,
        backgroundColor: uiMode === "light" ? "#dfdfdf" : "#333",
        borderRadius: 3,
        padding: 4,
      }}>
        {children}
      </div>
    );
    switch (notification.notificationType) {
      case "followed": {
        return (
          <Link to={notification.link}>
            <NotificationAvatar />
            <TextWrap>
              @{triggerUser.username} followed you
            </TextWrap>
            <div style={{clear: "both"}} />
          </Link>
        );
      }
      case "post_liked": {
        const triggerUser = notification.triggered_by_user;
        return (
          <Link to={notification.link}>
            <NotificationAvatar />
            <TextWrap>
              @{triggerUser.username} liked your post
            </TextWrap>
            <div style={{clear: "both"}} />
          </Link>
        );
      }
      default: {
        return (
          <div />
        )
      }
    }
  };

  const backgroundColor = uiMode === "light" ? theme.palette.primary.light : theme.palette.primary.dark;

  return (
    <Container title="Notifications">
      { notifications.map(notification => (
        <Paper
          sx={{ p: 1, mb: 1 }}
          key={notification.uuid}
          style={{
            backgroundColor: notification.seen ? "" : backgroundColor,
            fontFamily: "Arial, sans-serif",
            fontSize: "14pt",
          }}
        >
          {getNotificationByType(notification)}
        </Paper>
      ))}
    </Container>
  );
}
