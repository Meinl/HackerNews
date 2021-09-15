import { createAction } from "typesafe-actions";

export const deleteNews = createAction("DELETE_NEWS", (id: string) => id)();
