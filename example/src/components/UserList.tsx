import React, {useState, useEffect} from 'react';
import {Box, InfiniteScroll, Text, Image} from 'grommet';
import {useResource} from '../react-request-hook';
import api, {User} from '../api';
import {Row} from '../styles';

export const UserList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [response] = useResource(api.getUsers, [page]);

  function onMore() {
    if (page < 10) {
      setPage(p => p + 1);
    }
  }

  useEffect(() => {
    if (response.data) {
      setUsersList(prevItems => [...prevItems, ...response.data!]);
    }
  }, [response.data]);

  return (
    <Box flex overflow="auto" pad="medium">
      <InfiniteScroll step={9} items={usersList} onMore={onMore}>
        {(user: User, index: number) => (
          <Row key={user.id} alpha={index + 1}>
            <Image src={user.avatar} />
            <Text size="large">{user.name}</Text>
          </Row>
        )}
      </InfiniteScroll>
    </Box>
  );
};