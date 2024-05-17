import { LinkModel } from "@/model/linkModel";

export interface HistoryModel {
  id: number,
  property: string,
  changedFrom: string,
  changedTo: string,
  link: LinkModel
}