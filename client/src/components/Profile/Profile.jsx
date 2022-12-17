import { Avatar, Box, Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import fetchAPI from '../../utils/fetchAPI';
import Describe from './Describe';
import EditProfile from './EditProfile/EditProfile';

const Profile = ({ data, ...props }) => {
    const { userId } = props;
    const [isFollowed, setisFollowed] = useState(data?.isFollowed);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const toast = useToast();

    const toggleFollow = () => {
        const callAPI = async (type) => {
            try {
                await fetchAPI(`/user/${type}/${data.id}`, {
                    method: 'POST',
                });
                isFollowed ? --data.followerNumber : ++data.followerNumber;
                setisFollowed(!isFollowed);
            } catch (e) {
                toast({
                    position: 'top',
                    title: e.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        isFollowed ? callAPI('unfollow') : callAPI('follow');
    };

    return (
        <Box maxW={['100%', '100%', '180px']}>
            {<EditProfile {...{ isEditProfile, setIsEditProfile }} data={data} />}
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Avatar
                    mt={[0, '24px']}
                    mb={['8px', '16px']}
                    size={['2xl', '2xl', 'xl']}
                    name={data?.name}
                    src={data?.avatar}
                />
                <Heading class="user-name" fontSize={['lg']} mb={['18px', '24px']}>
                    {data?.name}
                </Heading>
                {/* <Text mb="16px">{data?.followerNumber} Followers</Text> */}
                <Flex w={['100%', '40%', '100%']} flexDirection="column">
                    {userId !== data?.id ? (
                        <Button
                            colorScheme="whiteAlpha"
                            variant="outline"
                            textColor={!isFollowed ? 'white' : 'var(--primary-color)'}
                            borderRadius="20px"
                            margin="8px 0"
                            onClick={toggleFollow}
                            leftIcon={!isFollowed && <FaUserPlus style={{ 'margin-bottom': '2px' }} />}
                        >
                            {isFollowed ? 'Followed' : 'Follow'}
                        </Button>
                    ) : (
                        <Button
                            colorScheme="whiteAlpha"
                            variant="outline"
                            textColor="white"
                            borderRadius="20px"
                            margin="8px 0"
                            onClick={() => setIsEditProfile(true)}
                        >
                            Edit Profile
                        </Button>
                    )}
                </Flex>
            </Flex>
            <Box>
                <Describe data={data} />
            </Box>
        </Box>
    );
};

export default Profile;
