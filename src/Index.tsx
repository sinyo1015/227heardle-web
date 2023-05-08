import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  Box,
  Center,
  Icon,
  Text,
  Grid,
  GridItem,
  Button,
  Stack,
  Spinner,
  Heading,
  useToast,
} from "@chakra-ui/react";
import {
  RiArrowDownSLine,
  RiPlayCircleLine,
  RiPauseCircleLine,
} from "react-icons/ri";
import axios from "axios";
import { AnswerType } from "./enums/answer-type";
import SummaryResult from "./components/summary-result";
import MusicProgressBar from "./components/music-progress-bar";
import AnswerPlaceholders from "./components/answer-placeholders";
import Select  from 'react-select';

const API_URL = "http://localhost:3000";

const AboutModal = lazy(() => import("./modals/about"));
const HowToPlayModal = lazy(() => import("./modals/how-to-play"));
const AnnouncementModal = lazy(() => import("./modals/announcement"));

const IconAnswer = lazy(() => import("./components/icon-answer"));

const HeaderBar = lazy(() => import("./components/header"));
const MusicInfo = lazy(() => import("./components/music-info"));
const ButtonSharer = lazy(() => import("./components/button-sharer"));

function Index() {
  const SONG_INCREMENT_STEP: number[] = [1, 2, 3, 4, 5];
  const PROGRESS_BAR_RESPONSIVE: { md: number; base: number }[] = [
    {
      md: 6,
      base: 11,
    },
    {
      md: 14,
      base: 22,
    },
    {
      md: 28,
      base: 34,
    },
    {
      md: 47,
      base: 50,
    },
    {
      md: 67,
      base: 72,
    },
    {
      md: 100,
      base: 100,
    },
  ];

  const selectRef = useRef<any>();

  const toast = useToast();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isGonnaGiveUp, setIsGonnaGiveUp] = useState<boolean>(false);
  const [sumMusicLength, setSumMusicLength] = useState<number>(1);
  const [currentSongTimestamp, setCurrentSongTimestamp] =
    useState<string>("00:00");

  const [playTimeout, setPlayTimeout] = useState<number>();

  const [musicPlayer, setMusicPlayer] =
    useState<Nullable<HTMLAudioElement>>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [screenType, setScreenType] = useState<string>("base");
  const [progressVal, setProgressVal] = useState<number>(0);
  const [tempAnswer, setTempAnswer] = useState<Nullable<number>>();

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [todayAnswer, setTodayAnswer] = useState<Nullable<number>>(18);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isAudioLoaded, setAudioLoaded] = useState<boolean>(false);
  const [isPlayerWon, setIsPlayerWon] = useState<boolean>(false);

  const [albumCover, setAlbumCover] = useState<string>("");
  const [streamingLinks, setStreamingLinks] = useState<StreamingLink[]>([]);

  const [musics, setMusics] = useState<SongChoice[]>([]);
  const [divider, setDivider] = useState<number>(16.0);

  const [musicTitle, setMusicTitle] = useState<string>("");
  const [musicArtist, setMusicArtist] = useState<string>("22/7");

  const [timeRemainingReset, setTimeRemainingReset] = useState("00:00:00");
  const [heardleId, setHeardleId] = useState<number>();

  const [announcements, setAnnouncements] = useState<Announcement[]>();

  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState<boolean>(false);
  const [showAnnouncementModal, setShowAnnouncementModal] =
    useState<boolean>(false);

  const skipCurrentStep = (): void => {
    let _tempAnswer: Answer[] = answers;
    _tempAnswer.push({
      answerType: AnswerType.Skipped,
      label: "Skipped",
    });
    setAnswers(_tempAnswer);

    setProgressVal(
      PROGRESS_BAR_RESPONSIVE[currentStepIndex + 1][screenType] as number
    );
    setCurrentStepIndex(currentStepIndex + 1);
    setSumMusicLength(sumMusicLength + SONG_INCREMENT_STEP[currentStepIndex]);

    pushStateToLocalStorage({
      label: "Skipped",
      value: null,
      answer_type: AnswerType.Skipped,
    });
    if (currentStepIndex === SONG_INCREMENT_STEP.length - 1) {
      setIsGonnaGiveUp(true);
    }
  };

  const giveUp = (): void => {
    let _tempAnswer: Answer[] = answers;
    _tempAnswer.push({
      answerType: AnswerType.Skipped,
      label: "Skipped",
    });
    pushStateToLocalStorage({
      label: "Skipped",
      value: null,
      answer_type: AnswerType.Skipped,
    });
    finishAll();
  };

  const playSection = (): void => {
    setIsPlaying(true);
    if (musicPlayer) {
      musicPlayer.currentTime = 0;

      musicPlayer?.play()?.then(() => {
        let _musicTimeout = setTimeout(() => {
          if (musicPlayer) setIsPlaying(false);
          musicPlayer?.pause();
          setTimeout(() => {
            setProgressVal(
              PROGRESS_BAR_RESPONSIVE[currentStepIndex][screenType]
            );
          }, 10);
        }, sumMusicLength * 1000);
        setPlayTimeout(_musicTimeout);
      });
    }
  };

  const finishAll = (playMusicUponStart = true) => {
    markAsFinish();
    setIsFinish(true);
    setDivider(30);
    removeAudioTimeUpdateListener(musicPlayer);
    addAudioTimeUpdateListener(musicPlayer);
    setProgressVal(100);
    setSumMusicLength(30);
    if (playMusicUponStart) {
      musicPlayer.currentTime = 0;
      musicPlayer?.play();
      setIsPlaying(true);
    }
  };

  const pauseSection = (): void => {
    clearTimeout(playTimeout);
    setIsPlaying(false);
    setProgressVal(PROGRESS_BAR_RESPONSIVE[currentStepIndex][screenType]);
    musicPlayer?.pause();
  };

  const submitAnswer = (): void => {
    if (isFinish) return;
    if (tempAnswer === null || tempAnswer === undefined) {
      toast({
        title: "Failed",
        description: "You must choose the song first!",
        status: "error",
        duration: 1500,
        isClosable: true,
      });

      return;
    }

    let _answers: Answer[] = answers;

    if (tempAnswer === todayAnswer) {
      _answers.push({
        answerType: AnswerType.Correct,
        label: musics?.find((e) => e.value === tempAnswer)?.label ?? "",
      });
      pushStateToLocalStorage({
        label: musics?.find((e) => e.value === tempAnswer)?.label ?? "",
        value: tempAnswer,
        answer_type: AnswerType.Correct,
      });
      for (let x = 0; x < 6; ++x) {
        if (_answers[x] === null || _answers[x] === undefined) {
          _answers.push({
            answerType: AnswerType.Skipped,
            label: musics?.find((e) => e.value === tempAnswer)?.label ?? "",
          });
          pushStateToLocalStorage({
            label: "Skipped",
            value: null,
            answer_type: AnswerType.Skipped,
          });
        }
      }
      setIsPlayerWon(true);
      markAsClear();
      finishAll();
      return;
    } else {
      _answers.push({
        answerType: AnswerType.Incorrect,
        label: musics?.find((e) => e.value === tempAnswer)?.label ?? "",
      });
      pushStateToLocalStorage({
        label: musics?.find((e) => e.value === tempAnswer)?.label ?? "",
        value: tempAnswer,
        answer_type: AnswerType.Incorrect,
      });
      incrementFailed();
    }

    if (currentStepIndex !== SONG_INCREMENT_STEP.length) {
      setProgressVal(
        PROGRESS_BAR_RESPONSIVE[currentStepIndex + 1][screenType] as number
      );
      setCurrentStepIndex(currentStepIndex + 1);
      setSumMusicLength(sumMusicLength + SONG_INCREMENT_STEP[currentStepIndex]);
    }

    setTempAnswer(null);
    setAnswers(_answers);

    if (currentStepIndex === SONG_INCREMENT_STEP.length) {
      finishAll();
    }
    if (selectRef && selectRef.current) selectRef.current.clearValue();
  };

  const msToTime = (s: number) =>  {
    let pad = (n: number, z: number = 2) => ('00' + n).slice(-z);
    return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0);
  };

  const setTimerResetChallange = () => {
    let dateFinish = new Date();
    dateFinish.setHours(23);
    dateFinish.setMinutes(59);
    dateFinish.setSeconds(59);

    setInterval(() => {
      const dateStart = +new Date();
      const formattedDiff = msToTime(dateFinish.valueOf() - dateStart.valueOf());
      
      setTimeRemainingReset(formattedDiff);
    }, 1000);
  };

  const addAudioTimeUpdateListener = (audio: Nullable<HTMLAudioElement>) => {
    audio!.addEventListener("timeupdate", (e) => {
      const duration = new Date(Math.round(audio!.currentTime) * 1000).toISOString().substr(14, 5);
      const progress = (audio!.currentTime / divider) * 100;
      setProgressVal(progress);
      setCurrentSongTimestamp(duration);
    });
  };

  const removeAudioTimeUpdateListener = (audio: Nullable<HTMLAudioElement>) =>
    audio!.removeEventListener("timeupdate", () => {});

  const copyText = (shouldReturnVal: boolean = false): void | string => {
    let textTemplate = `22/7 Heardle #${heardleId}

🔉 `;
    for (const _answer of answers) {
      switch (_answer.answerType) {
        case AnswerType.Correct:
          textTemplate += "🟩";
          break;
        case AnswerType.Incorrect:
          textTemplate += "🟥";
          break;
        case AnswerType.Skipped:
          textTemplate += "⬛";
          break;
      }
    }
    textTemplate += `

#22_7 #227 #227_heardle #ナナニジ #227_ハートル
https://227.sinyo.my.id/heardle`;

    if (shouldReturnVal) return textTemplate;
    else {
      navigator.clipboard.writeText(textTemplate);
      toast({
        title: "Success",
        description: "Text copied!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const shareToTwitter = (): void => {
    let textTemplate = copyText(true);
    const textEncoded = encodeURIComponent(textTemplate as string);
    window.open(
      `https://twitter.com/intent/tweet?text=${textEncoded}`,
      "_blank"
    );
  };

  const loadData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/daily_challanges`);
      const songListResponse = await axios.get(`${API_URL}/song_list`);
      const decoded = JSON.parse(atob(data.data));

      const audio = new Audio(
        `${API_URL}/cropped_music/${decoded.today.file_name}`
      );
      audio.preload = "auto";
      setMusicPlayer(audio);
      audio.addEventListener("loadeddata", (e) => setAudioLoaded(true));
      addAudioTimeUpdateListener(audio);

      setAlbumCover(decoded.today.thumbnail);

      const transformStreamingLinks: StreamingLink[] =
        decoded.streaming_links.map((e: StreamingLink, i: number) => {
          const _transformStreamingLinks = {
            type: e.type,
            link: e.link,
          };
          return _transformStreamingLinks;
        });
      setStreamingLinks(transformStreamingLinks);

      const transformSongList: SongChoice[] = songListResponse.data.data.map(
        (e: ReceivedSongChoice, i: number) => {
          const _transformSongList = {
            label: e.name,
            value: e.id,
          };
          return _transformSongList;
        }
      );
      setMusics(transformSongList);

      setTodayAnswer(decoded.today.tl_id);
      setMusicTitle(decoded.today.tl_name);
      fillLocalStorage(decoded.today.dc_id);
      setHeardleId(decoded.today.dc_id);
    } catch (err) {
      alert("Cannot load data");
    }
  };

  const loadStateFromLocalStorage = () => {
    let getLocalState = localStorage.getItem("play_states");
    if (localStorage !== null) {
      let parsed: any[] = JSON.parse(getLocalState as string);
      let findToday = parsed.find((e) => e.heardle_id === heardleId);
      if (findToday !== undefined) {
        let temporary: Answer[] = [];
        for (const _entry of findToday.guesses) {
          temporary.push({
            answerType: _entry.answer_type as number as AnswerType,
            label: _entry.label,
          });
        }
        setAnswers(temporary);
        const isPrePlayerWon =
          temporary.find((x) => x.answerType === AnswerType.Correct) !==
          undefined;
        if (isPrePlayerWon) {
          setIsPlayerWon(true);
          markAsClear();
          finishAll(false);
          return;
        }
        if (!findToday.finished) return;

        finishAll(false);
      }
    }
  };

  const initLocalStorage = () => {
    if (localStorage.getItem("play_states") === null) {
      localStorage.setItem("play_states", JSON.stringify([]));
    }
  };

  const fillLocalStorage = (heardle_id: number) => {
    let getLocalState = localStorage.getItem("play_states");
    if (localStorage !== null) {
      let parsed: any[] = JSON.parse(getLocalState as string);
      let findToday = parsed.find((e) => e.heardle_id === heardle_id);
      if (findToday === undefined) {
        parsed.push({
          cleared: false,
          failed: 0,
          finished: false,
          guesses: [],
          heardle_id: heardle_id,
          played: false,
        });
        localStorage.setItem("play_states", JSON.stringify(parsed));
      }
    }
  };

  const pushStateToLocalStorage = (id: StoredStateSong) => {
    let getLocalState = localStorage.getItem("play_states");
    if (getLocalState === null) location.reload();
    let parsed: any[] = JSON.parse(getLocalState as string);
    let findToday = parsed.findIndex((e) => e.heardle_id === heardleId);
    if (findToday !== undefined) {
      parsed[findToday].played = true;
      parsed[findToday].guesses.push(id);
      localStorage.setItem("play_states", JSON.stringify(parsed));
    }
  };

  const markAsFinish = () => {
    let getLocalState = localStorage.getItem("play_states");
    let parsed: any[] = JSON.parse(getLocalState as string);
    let findToday = parsed.findIndex((e) => e.heardle_id === heardleId);
    if (findToday !== undefined) {
      parsed[findToday].finished = true;
      localStorage.setItem("play_states", JSON.stringify(parsed));
    }
  };

  const showInitialHelpIfNeeded = () => {
    let getLocalState = localStorage.getItem("play_states");
    if (getLocalState === null) {
      setShowHowToPlayModal(true);
    }
  };

  const markAsClear = () => {
    let getLocalState = localStorage.getItem("play_states");
    let parsed: any[] = JSON.parse(getLocalState as string);
    let findToday = parsed.findIndex((e) => e.heardle_id === heardleId);
    if (findToday !== undefined) {
      parsed[findToday].cleared = true;
      localStorage.setItem("play_states", JSON.stringify(parsed));
    }
  };

  const incrementFailed = () => {
    let getLocalState = localStorage.getItem("play_states");
    let parsed: any[] = JSON.parse(getLocalState as string);
    let findToday = parsed.findIndex((e) => e.heardle_id === heardleId);
    if (findToday !== undefined) {
      parsed[findToday].failed += 1;
      localStorage.setItem("play_states", JSON.stringify(parsed));
    }
  };

  const getAnnouncements = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/announcements`);
      setAnnouncements(data.data);
    } catch (err) {
      //Ignore
    }
  };

  const getStats = () => {
    toast({
      title: "Not available",
      description: "This feature is coming soon!",
      status: "warning",
      duration: 1000,
      position: "top"
    });
  };

  useEffect(() => {
    showInitialHelpIfNeeded();
    loadData();
    getAnnouncements();
    setTimerResetChallange();
    initLocalStorage();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", (e: Event) => {
      if ((e.target as Window).innerWidth <= 768) {
        setProgressVal(PROGRESS_BAR_RESPONSIVE[currentStepIndex]["base"]);
      } else {
        setProgressVal(PROGRESS_BAR_RESPONSIVE[currentStepIndex]["md"]);
      }
    });

    const _screenType = window.innerWidth <= 768 ? "base" : "md";
    setProgressVal(PROGRESS_BAR_RESPONSIVE[0][_screenType]);
    setScreenType(_screenType);
  }, []);

  useEffect(() => {
    if (heardleId !== undefined) loadStateFromLocalStorage();
  }, [heardleId]);

  return (
    <div>
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <HowToPlayModal
        isOpen={showHowToPlayModal}
        onClose={() => setShowHowToPlayModal(false)}
      />
      <AnnouncementModal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
        data={announcements}
      />
      <HeaderBar
        showModalAboutTrigger={setShowAboutModal}
        showModalAnnoucementTrigger={setShowAnnouncementModal}
        showModalHowToPlayTrigger={setShowHowToPlayModal}
        showModalStats={getStats}
      />
      <div className="content">
        {isFinish ? (
          <div>
            <Center>
              <Box
                w={{
                  base: "90%",
                  md: "50%",
                }}
                h={120}
                mt={5}
              >
                <Suspense
                  fallback={
                    <Center>
                      <Spinner size="xl" />
                    </Center>
                  }
                >
                  <MusicInfo
                    albumCover={albumCover}
                    musicArtist={musicArtist}
                    musicTitle={musicTitle}
                    streamingLinks={streamingLinks}
                  />
                </Suspense>
              </Box>
            </Center>
            <Center>
              <Box
                h={{
                  base: "40vh",
                  md: "45vh",
                }}
                display="flex"
                flexDirection="column"
                placeContent="center"
              >
                <Box>
                  <Stack textAlign="center">
                    <SummaryResult
                      isPlayerWon={isPlayerWon}
                      answers={answers}
                    />
                    <Suspense
                    fallback={
                      <Center>
                        <Spinner size="xl" />
                      </Center>
                    }
                    >
                      <ButtonSharer
                        copyToText={copyText}
                        shareToTwitter={shareToTwitter}
                      />
                    </Suspense>
                  </Stack>
                </Box>
              </Box>
            </Center>
          </div>
        ) : (
          <AnswerPlaceholders
            answers={answers}
          />
        )}
      </div>

      <div className="footer">
        {isAudioLoaded ? (
          <div>
            {!isFinish ? (
              <div>
                <Center pt={10}>
                  <Text>Turn up the volume and tap to start the track!</Text>
                </Center>
                <Center>
                  <Icon fontSize="24pt" as={RiArrowDownSLine} />
                </Center>
              </div>
            ) : (
              <div>
                <Center pt={10}>
                  <Text>Next heardle challange start in:</Text>
                </Center>
                <Center>
                  <Heading>{timeRemainingReset}</Heading>
                </Center>
              </div>
            )}
            <MusicProgressBar
              progressVal={progressVal}
            />
            <Center>
              <table id="playbackStatus">
                <tbody>
                  <tr
                    style={{
                      verticalAlign: "top",
                    }}
                  >
                    <td
                      style={{
                        width: "25%",
                        textAlign: "left",
                      }}
                    >
                      {currentSongTimestamp}
                    </td>
                    <td
                      style={{
                        width: "50%",
                        fontSize: "48pt",
                        textAlign: "center",
                      }}
                    >
                      {isPlaying ? (
                        <Icon onClick={pauseSection} as={RiPauseCircleLine} />
                      ) : (
                        <Icon onClick={playSection} as={RiPlayCircleLine} />
                      )}
                    </td>
                    <td
                      style={{
                        width: "25%",
                        textAlign: "right",
                      }}
                    >
                      00:{Number(divider)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Center>
            {!isFinish && (
              <div>
                <Center>
                  <Box
                    w={{
                      base: "90%",
                      md: "50%",
                    }}
                  >
                    <Select
                      ref={selectRef}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Know this song? Find the answer right here!"
                      options={musics}
                      onChange={(val) => setTempAnswer(val?.value)}
                      menuPlacement="top"
                    />
                  </Box>
                </Center>
                <Center>
                  <Grid
                    mt={5}
                    w={{
                      base: "90%",
                      md: "50%",
                    }}
                    templateColumns="repeat(2, 1fr)"
                  >
                    <GridItem w="100%">
                      {isGonnaGiveUp ||
                      SONG_INCREMENT_STEP[currentStepIndex] === undefined ? (
                        <Button
                          onClick={giveUp}
                          isDisabled={isPlaying}
                          colorScheme="yellow"
                        >
                          Give Up
                        </Button>
                      ) : (
                        <Button
                          isDisabled={isPlaying}
                          onClick={skipCurrentStep}
                          colorScheme="yellow"
                        >
                          {`SKIP (+${SONG_INCREMENT_STEP[currentStepIndex]} second)`}
                        </Button>
                      )}
                    </GridItem>
                    <GridItem w="100%">
                      <Button
                        style={{
                          float: "right",
                          backgroundColor: "#009ad0d7",
                          color: "white",
                        }}
                        isDisabled={isPlaying}
                        onClick={submitAnswer}
                      >
                        Submit
                      </Button>
                    </GridItem>
                  </Grid>
                </Center>
              </div>
            )}
          </div>
        ) : (
          <Center mt={10}>
            <Stack direction="column">
              <Center>
                <Spinner size="xl" />
              </Center>
              <Text>Loading the audio player</Text>
            </Stack>
          </Center>
        )}
      </div>
    </div>
  );
}

export default Index;
