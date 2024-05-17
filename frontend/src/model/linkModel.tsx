import { HistoryModel } from "@/model/historyModel";

export interface LinkModel {
  id: number,
  name: string,
  url: string,
  image: string,
  description: string,
  availableFirefox: boolean,
  availableChrome: boolean,
  active: boolean,
  newTab: boolean,
  history: HistoryModel[]
}