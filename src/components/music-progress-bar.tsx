import { Center, Progress } from "@chakra-ui/react";

const MusicProgressBar = (props: {progressVal: number}) => (
  <div style={{ marginTop: 10, position: "relative" }}>
    <div id="progress" className="child child-1" style={{ zIndex: 1 }}>
      <div id="xa"></div>
      <div id="xb"></div>
      <div id="xc"></div>
      <div id="xd"></div>
      <div id="xe"></div>
      <div id="xf"></div>
      <div id="xg"></div>
      <div id="xh"></div>
    </div>

    <Center>
      <Progress
        w={{
          base: "90%",
          md: "50.5%",
        }}
        h={15}
        value={props.progressVal}
        className="child child-1"
      />
    </Center>
  </div>
);

export default MusicProgressBar;
