import * as React from "react";
import { useNavigate } from "react-router-dom"
import {LinkModel} from "@/model/linkModel";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import {LinkService} from "@/service/linkService";
import {toast} from "react-toastify";
import {PATH_LINK_FORM} from "@/components/MainRouter";
import TextTruncate from "react-text-truncate";

interface TableLinkProps {
  link: LinkModel,
  links: LinkModel[],
  setLinks: React.Dispatch<React.SetStateAction<LinkModel[]>>
}

const TableLink = (props: TableLinkProps) => {

  const navigate = useNavigate()

  const booleanDivStyle = "flex items-center my-0"
  const booleanPStyle = "my-0 px-2 text-sm"
  const faCheckStyle = "text-green-500 text-lg"
  const imCrossStyle = "text-rose-500 text-sm"

  function deleteLink(id: number) {
    if(window.confirm("Delete this link?")) {
      LinkService.deleteLink(id).then(() => {
        props.setLinks!(props.links!.filter(item => item.id !== id))
      })
      toast.info("Link deleted")
    }
  }

  return (
      <div className="flex flex-col items-center bg-gray-100 rounded-lg my-4 mb-6 shadow-[0_0_10px_0_rgb(0,0,0,0.3)] w-full">
        <div className="flex items-center mt-4 w-full">
          <h3 className="my-0 pl-4">{props.link.name}</h3>
          <div className="my-0 pl-4 w-1/2"><TextTruncate line={1} text={props.link.url}/></div>
        </div>

        <div className="mt-4 w-full">
          <div className="my-0 px-4"><TextTruncate line={2} text={props.link.description}/></div>
        </div>

        <div className="flex mt-4 pl-4 w-full">
          <div className={booleanDivStyle}>
            <p className={booleanPStyle}>Firefox: </p>
            {props.link.availableFirefox ? <FaCheck className={faCheckStyle} /> : <ImCross className={imCrossStyle} />}
          </div>

          <div className={booleanDivStyle}>
            <p className={booleanPStyle}>Chrome: </p>
            {props.link.availableChrome ? <FaCheck className={faCheckStyle} /> : <ImCross className={imCrossStyle} />}
          </div>

          <div className={booleanDivStyle}>
            <p className={booleanPStyle}>Active: </p>
            {props.link.active ? <FaCheck className={faCheckStyle} /> : <ImCross className={imCrossStyle} />}
          </div>

          <div className={booleanDivStyle}>
            <p className={booleanPStyle}>New tab: </p>
            {props.link.newTab ? <FaCheck className={faCheckStyle} /> : <ImCross className={imCrossStyle} />}
          </div>
        </div>

        <br/>

        <div className="grid grid-cols-2 w-full">
          <p className="w-full text-center m-1 text-xl cursor-pointer hover:text-indigo-300"
             onClick={() => navigate(`${PATH_LINK_FORM}/${props.link.id}`)}>
            <MdEdit />
          </p>
          <p className="w-full text-center m-1 text-xl cursor-pointer hover:text-rose-600"
             onClick={() => deleteLink(props.link.id)}>
            <RiDeleteBinFill />
          </p>
        </div>

      </div>
  )
}

export default TableLink