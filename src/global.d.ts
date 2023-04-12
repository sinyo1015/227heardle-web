type Nullable<T> = T | null;

type Announcement = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type Answer = {
  answerType: AnswerType;
  label: string;
};

type StreamingLink = {
  type: string;
  link: string;
};

type SongChoice = {
  label: string;
  value: number;
};

type ReceivedSongChoice = {
  name: string;
  id: number;
};

type StoredStateSong = {
  answer_type: AnswerType;
  value: Nullable<number>;
  label: string;
};
