import {LinkModel} from "@/model/linkModel";
import TextTruncate from "react-text-truncate";
import * as React from "react";

interface PreviewProps {
  link: LinkModel
}

const Preview = (props: PreviewProps) => {

  // poor workaround for react-router-dom external link issue - all links not starting with "https://" will fail to open externally
  const finalUrl = props.link.url.substring(0, 8) !== 'https://' ? `https://${props.link.url}` : props.link.url

  return (
      <a href={finalUrl} target={props.link.newTab ? "_blank" : ""} className="text-black no-underline">
        <div className="grid grid-cols-4 rounded-xl border-solid border-transparent hover:border-black cursor-pointer">
          <div className="flex items-center justify-center w-full h-20 m-2">
            <img className="w-full" alt="image" src={props.link.image ? props.link.image : "/empty_icon.jpg"} />
          </div>

          <div className="col-span-3 pl-4">
            <p className="my-1 font-bold">{props.link.name}</p>
            <div className="my-1 text-sm text-sky-500"><TextTruncate line={1} text={props.link.url}/></div>
            <div className="my-1 text-xs" dangerouslySetInnerHTML={{ __html: props.link.description }} />
          </div>

        </div>
      </a>
  )
}

export default Preview