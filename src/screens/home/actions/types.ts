import { ActionType } from "typesafe-actions";
import * as getNewsActions from "./getNewsActions";
import * as deleteNewsActions from "./deleteNewsActions";

export type GetNewsActions = ActionType<typeof getNewsActions>;
export type DeleteNewsActions = ActionType<typeof deleteNewsActions>;

export type NewsAction = GetNewsActions | DeleteNewsActions;
