import {HistoryModel} from "@/model/historyModel";
import TextTruncate from "react-text-truncate";

interface HistoryProps {
  history: HistoryModel
}

const History = (props: HistoryProps) => {

  return (
      <div className="grid grid-cols-3">
        <p className="max-w-md my-2">{props.history.property}</p>
        <div className="max-w-md my-2 mx-2"><TextTruncate line={3} text={props.history.changedFrom}/></div>
        <div className="max-w-md my-2 mx-2"><TextTruncate line={3} text={props.history.changedTo}/></div>
      </div>
  )
}

export default History