import {HistoryModel} from "@/model/historyModel";
import {useEffect, useState} from "react";
import {LinkService} from "@/service/linkService";
import History from "@/components/history/History";

interface HistoryListProps {
  linkId: number
}

const HistoryList = (props: HistoryListProps) => {

  const [history, setHistory] = useState<HistoryModel[]>([])

  useEffect(() => {
    LinkService.getLinkHistory(props.linkId).then(data => setHistory(data))
  }, [])

  const historyElement = history.map(item => <History key={item.id} history={item} />)

  return (
      <div className="w-full max-w-xl m-2 p-4 bg-indigo-50 rounded-md">
        <h3 className="mt-0">History</h3>
        <div className="grid grid-cols-3">
          <h4 className="max-w-md">Property</h4>
          <h4 className="max-w-md">From</h4>
          <h4 className="max-w-md">To</h4>
        </div>
        {historyElement}
      </div>
  )
}

export default HistoryList