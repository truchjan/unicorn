import {useEffect, useState} from "react";
import {LinkModel} from "@/model/linkModel";
import {LinkService} from "@/service/linkService";
import Preview from "@/components/preview/Preview";

const PreviewList = () => {

  const [links, setLinks] = useState<LinkModel[]>([])

  useEffect(() => {
    LinkService.linkList().then(data => setLinks(data))
  }, [])

  const previewsElement = links.map(item => {

    const isFirefox = navigator.userAgent.indexOf("Firefox") != -1
    const isChrome = navigator.userAgent.indexOf("Chrome") != -1

    if(item.active) {
      if(isFirefox && !item.availableFirefox) return
      if(isChrome && !item.availableChrome) return
      return <Preview key={item.id} link={item} />
    }
  })

  return (
      <div className="m-8 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {previewsElement}
      </div>
  )

}

export default PreviewList