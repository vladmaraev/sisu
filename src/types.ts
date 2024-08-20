import { SpeechStateExternalEvent } from "speechstate";

export type DomainRelation = {
  type: "resolves" | "relevant";
  content: [ShortAnswer | Proposition, Question];
};

type ShortAnswer = string;
type Proposition = string;

export type Question = WhQuestion;
type WhQuestion = (a: ShortAnswer) => Proposition;

export interface Move {
  // no difference between Move and Action for now
  type:
    | "ask"
    | "answer"
    | "respond"
    | "greet"
    | "unknown"
    | "raise"
    | "findout";
  content: null | Proposition | ShortAnswer | Question;
}

type Speaker = "usr" | "sys";

export interface InformationState {
  next_move: Move | null;
  domain: DomainRelation[];
  private: { agenda: Move[]; plan: Move[]; bel: Proposition[] };
  shared: {
    lu?: { speaker: Speaker; move: Move };
    qud: Question[];
    com: Proposition[];
  };
}

export interface DMContext extends TotalInformationState {
  ssRef: any;
}

export interface DMEContext extends TotalInformationState {
  parentRef: any;
}

export interface TotalInformationState {
  /** interface variables */
  latest_speaker?: Speaker;
  latest_move?: Move;

  /** information state */
  is: InformationState;
}

export type DMEvent =
  | { type: "CLICK" }
  | SpeechStateExternalEvent
  | NextMoveEvent;

export type DMEEvent = SaysMoveEvent;

export type SaysMoveEvent = {
  type: "SAYS";
  value: { speaker: Speaker; move: Move };
};

export type NextMoveEvent = {
  type: "NEXT_MOVE";
  value: Move;
};
