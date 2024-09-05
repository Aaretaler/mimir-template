import { CardAction } from "./CardAction";
import { GameAction } from "./GameAction";
import { UserAction } from "./UserAction";

export type AppAction = GameAction | CardAction | UserAction;