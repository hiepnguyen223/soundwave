import Song from '../Song';
import { Box, Heading, List, Text, Flex, Link } from '@chakra-ui/react';
import { LineRightIcon } from '../Icon';
import { data } from '../FeaturedTracks/dataTest';

const RecentlyLikes = () => {
    return (
        <Box>
            <Flex>
                <Heading fontSize="xl">Recently Likes</Heading>
            </Flex>
            <List>
                {data.map((song, index) => {
                    if (index >= 5) {
                        return null;
                    }
                    return (
                        <Song
                            key={song.id}
                            {...song}
                            userName={'user name'}
                            borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                        />
                    );
                })}
            </List>
            {data.length > 5 && (
                <Flex justifyContent="end" mt="4px">
                    <Link href="#">
                        <Text mr="4px" fontSize="xs" display="inline-flex" alignItems="center" cursor="pointer">
                            See more
                            <LineRightIcon />
                        </Text>
                    </Link>
                </Flex>
            )}
        </Box>
    );
};

export default RecentlyLikes;
