import { Box, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { RiExternalLinkLine } from "react-icons/ri";
import spotifyLogo from "../assets/spotify.png";
import youtubeLogo from "../assets/youtube.png";

const MusicInfo = (props: {albumCover: string, musicArtist: string, musicTitle: string, streamingLinks: {link: string, type: string}[]}) => (
  <Box w="100%" borderStyle="solid" borderWidth={1} p={2}>
    <Box display="flex" flexDirection="row" w="100%">
      <div
        style={{
          flexBasis: "15%",
        }}
      >
        <Image h={75} src={props.albumCover} alt="Album Cover" />
      </div>
      <Box
        flexBasis={{
          base: "60%",
          md: "70%",
        }}
      >
        <Stack pl={2} pr={2}>
          <Text>The answer is...</Text>
          <Box>
            <Text>{props.musicArtist}</Text>
            <Heading fontSize="md">{props.musicTitle}</Heading>
          </Box>
        </Stack>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        {props.streamingLinks.map((e, i) => (
          <a href={e.link} target="_blank" key={i}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <Image
                w={{
                  base: 75,
                  md: 75,
                }}
                objectFit="cover"
                src={e.type === "spotify" ? spotifyLogo : youtubeLogo}
                alt={e.type === "spotify" ? "Spotify" : "Youtube"}
              />
              <Icon as={RiExternalLinkLine} />
            </div>
          </a>
        ))}
      </Box>
    </Box>
  </Box>
);

export default MusicInfo;
