import {
    Flex,
    Image,
    Box,
    Text,
    Center,
    Icon,
    AspectRatio,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { LikeIcon } from '../Icon';
import { BsPlay, BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PlayerContext } from '../../stores/playerStore';
import './styles.scss';
import waveGif from '../../assets/animated.gif';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';
import { PlaylistContext, UserContext } from '../../stores';

const Song = ({ ...props }) => {
    const { data } = props;
    const { id, title, thumbnail, author, playCount, url, duration } = data[props.index];

    const [{ songPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);
    const playlistDispatch = useContext(PlaylistContext)[1];
    const user = useContext(UserContext)[0];

    const addAndPlay = () => setPlayer({ type: 'Add', payload: data[props.index] });

    const togglePlay = () => setPlayer({ type: 'Toggle' });

    const download = () => window.open(url.replace('/upload/', '/upload/fl_attachment/'), '_blank');

    const isPlayThisSong = id === songPlayed?.id;
    const showPauseIcon = id === songPlayed?.id && isPlayed;

    const { isLikeIcon, isViewIcon } = props;
    const [songName, singerName] = title.split(' - ');

    return (
        <Box color={'whiteAlpha.700'} id={id} borderBottom="1px solid rgba(255, 255, 255, 0.2)" padding="12px 0">
            <Flex h="42px" overflow="hidden">
                <Flex flex={1} maxW={['70%', '64%', '64%']}>
                    <Box
                        className="image-song"
                        pos={'relative'}
                        boxSize="42px"
                        overflow={'hidden'}
                        borderRadius={2}
                        cursor={'pointer'}
                    >
                        <AspectRatio maxW={'100%'} ratio={1}>
                            <Image
                                src={thumbnail}
                                fallbackSrc={DEFAULT_SONG_THUMBNAIL}
                                alt="song image"
                                boxSize="100%"
                                objectFit={'cover'}
                                borderRadius={2}
                            />
                        </AspectRatio>
                        <Flex
                            align={'end'}
                            width={'100%'}
                            height={'60%'}
                            bottom={0}
                            left={0}
                            pos={'absolute'}
                            display={showPauseIcon ? 'flex' : 'none'}
                            overflow={'hidden'}
                        >
                            <Image src={waveGif} objectFit={'cover'} />
                            <Image src={waveGif} objectFit={'cover'} />
                        </Flex>
                        <Center
                            className="play-btn"
                            top={'0'}
                            left={'0'}
                            boxSize={'100%'}
                            onClick={isPlayThisSong ? togglePlay : addAndPlay}
                        >
                            <Box
                                boxSize={'30%'}
                                bg={'white'}
                                pos={'absolute'}
                                top={'50%'}
                                left={'50%'}
                                transform={'translate(-50%, -50%)'}
                            />
                            <Icon
                                color={'var(--primary-color)'}
                                as={showPauseIcon ? AiFillPauseCircle : AiFillPlayCircle}
                                fontSize="24px"
                                zIndex={1}
                            />
                        </Center>
                    </Box>
                    <Box ml={2} flex="1" maxW={['75%', '75%']}>
                        {/* Song name */}
                        <Text
                            textOverflow={'ellipsis'}
                            overflow="hidden"
                            whiteSpace={'nowrap'}
                            maxW={['90%', '90%']}
                            fontSize="md"
                            color={showPauseIcon ? 'var(--primary-color)' : 'white'}
                        >
                            <Link to={`/music/${id}`}>
                                {songName}fkdsjf;lsdfj;l sdkjfl; ksdjf sd fjds;klfj sk;lfdjglkdfs glkdfs jgl;kdfs
                                j;lgksj d;lgkjs d;gljdsk fg;lsdjfk gl;fdkj g
                            </Link>
                        </Text>
                        <Flex
                            fontSize="xs"
                            fontWeight={'600'}
                            overflow={'hidden'}
                            whiteSpace={'nowrap'}
                            maxW={['90%', '90%']}
                        >
                            <Link to={`/profile/${author?.id}`}>{author?.name}</Link>
                            <Text m="0 4px">-</Text>
                            <Text textOverflow={'ellipsis'} overflow="hidden">
                                <Link to={''}>{singerName}</Link>
                            </Text>
                            {/* singer */}
                        </Flex>
                    </Box>
                </Flex>
                <Flex ml={'auto'}>
                    {/* like number */}
                    {isLikeIcon && (
                        <Flex alignItems="center" margin="0">
                            <LikeIcon {...props} />
                        </Flex>
                    )}
                    {/* time */}
                    {isViewIcon && (
                        <Flex display={['none', 'flex', 'none', 'flex']} alignItems="center">
                            <BiTimeFive fontSize={'24px'} />
                            <Text minW={'40px'} ml={'4px'}>
                                {duration &&
                                    (duration - (duration % 60)) / 60 +
                                        ':' +
                                        (duration % 60 < 10 ? '0' + (duration % 60) : duration % 60)}
                            </Text>
                        </Flex>
                    )}
                    {/* view number */}
                    {isViewIcon && (
                        <Flex display={['none', 'flex', 'none', 'flex']} alignItems="center">
                            <BsPlay fontSize={'24px'} />
                            <Text minW={'34px'} ml={'2px'}>
                                {playCount}
                            </Text>
                        </Flex>
                    )}

                    <Flex height={'100%'} width={'24px'} align="center" justify="center">
                        <Menu autoSelect="false">
                            <MenuButton cursor={'pointer'} _hover={{ color: 'white' }} fontSize="md">
                                <BsThreeDotsVertical fontSize={'1.2rem'} />
                            </MenuButton>
                            <MenuList zIndex={'1000'} minW="20px" fontSize={'0.875rem'}>
                                {!!user.id && (
                                    <>
                                        <MenuItem
                                            onClick={() => playlistDispatch({ type: 'ShowAddSong', payload: id })}
                                        >
                                            Add playlist
                                        </MenuItem>
                                        <MenuItem onClick={() => {}}>Report</MenuItem>
                                    </>
                                )}
                                <MenuItem onClick={download}>Download</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Song;
