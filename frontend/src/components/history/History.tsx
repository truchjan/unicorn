import {HistoryModel} from "@/model/historyModel";

interface HistoryProps {
  history: HistoryModel
}

const History = (props: HistoryProps) => {

  return (
      <div className="grid grid-cols-3">
        <p className="max-w-md my-2">{props.history.property}</p>
        <p className="max-w-md my-2">{props.history.changedFrom}</p>
        <p className="max-w-md my-2">{props.history.changedTo}</p>
      </div>
  )
}

export default History