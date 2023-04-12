import React from "react";
import { Button, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

const FTD_LIBRARIES: {label: string, link: string}[] = [
    {
        label: "React.js",
        link: "https://react.dev"
    },
    {
        label: "Chakra UI",
        link: "https://github.com/chakra-ui/chakra-ui"
    },
    {
        label: "Luxon",
        link: "https://github.com/moment/luxon"
    },
    {
        label: "Axios",
        link: "https://github.com/axios/axios"
    },
    {
        label: "dotenv",
        link: "https://github.com/motdotla/dotenv"
    },
    {
        label: "react-emojis",
        link: "https://github.com/dreamyguy/react-emojis"
    },
    {
        label: "react-emojis",
        link: "https://github.com/dreamyguy/react-emojis"
    },
    {
        label: "React Icons",
        link: "https://github.com/react-icons/react-icons"
    },
    {
        label: "React Select",
        link: "https://github.com/jedwatson/react-select"
    }
];

const BCK_LIBRARIES : {label: string, link: string}[] = [
    {
        label: "better-sqlite3",
        link: "https://github.com/WiseLibs/better-sqlite3"
    },
    {
        label: "cors",
        link: "https://github.com/expressjs/cors"
    },
    {
        label: "node-cron",
        link: "https://github.com/kelektiv/node-cron"
    },
    {
        label: "dotenv",
        link: "https://github.com/motdotla/dotenv"
    },
    {
        label: "Express",
        link: "https://github.com/expressjs/express"
    },
    {
        label: "js-ffmpeg",
        link: "https://github.com/jsonize/js-ffmpeg"
    },
    {
        label: "js-ffmpeg",
        link: "https://github.com/jsonize/js-ffmpeg"
    },
    {
        label: "Luxon",
        link: "https://github.com/moment/luxon"
    },
    {
        label: "md5",
        link: "https://github.com/pvorb/node-md5"
    },
    {
        label: "yt-dlp-wrap",
        link: "https://github.com/foxesdocode/yt-dlp-wrap"
    },
];


const AboutModal = (props: { isOpen: boolean; onClose: any }) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Run and maintained by <Link style={{color: "#009ad0d7"}} href="https://twitter.com/sinyo_227" target="_blank">@sinyo_227</Link></Text>
          
          <Text
            fontSize="sm"
            mt={10}
          >
            Frontend created by using: {FTD_LIBRARIES.map((e, i) => <Link key={i} style={{color: "#009ad0d7"}} href={e.link}>{e.label}{i === FTD_LIBRARIES.length - 1 ? "" : ", "}</Link>)}
          </Text>
          <Text
            fontSize="sm"
            mt={3}
          >
            Backend created by using: {BCK_LIBRARIES.map((e, i) => <Link key={i} style={{color: "#009ad0d7"}} href={e.link}>{e.label}{i === BCK_LIBRARIES.length - 1 ? "" : ", "}</Link>)}
          </Text>
          <Text
          fontSize="sm"
          mt={3}
          >
            Disclaimer: Any stored music in backend side are temporary and will be removed in the next day. Each music are taken from Youtube using yt-dlp wrappers and cropped into 30-seconds duration.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
