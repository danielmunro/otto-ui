import { Avatar, Paper } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Context from '../utils/Context';

export default function Notifications() {
  const { notifications } = useContext(Context);

  const getNotificationByType = notification => {
    switch (notification.notificationType) {
      case "followed": {
        const triggerUser = notification.triggered_by_user;
        return (
          <div>
            <Link to={`/u/${triggerUser.username}`}>
              <Avatar
                alt={"@" + triggerUser.username}
                src={triggerUser.profile_pic}
                style={{ float: "left", marginRight: 10 }}
                sx={{ width: 56, height: 56 }}
              />
              @{triggerUser.username} followed you!
              <div style={{clear: "both"}} />
            </Link>
          </div>
        );
      }
      default: {
        return (
          <div />
        )
      }
    }
  };

  return (
    <Container title="Notifications">
      { notifications.map(notification => (
        <Paper sx={{ p: 1 }} key={notification.uuid}>
          {getNotificationByType(notification)}
        </Paper>
      ))}
    </Container>
  );
}
