import {useEffect, useState} from "react";
import {LinkModel} from "@/model/linkModel";
import {LinkService} from "@/service/linkService";
import TableLink from "@/components/links/TableLink";
import {useNavigate} from "react-router-dom";
import {PATH_LINK_FORM} from "@/components/MainRouter";

const LinkList = () => {

  const navigate = useNavigate()
  const [links, setLinks] = useState<LinkModel[]>([])

  useEffect(() => {
    LinkService.linkList().then(data => setLinks(data))
  }, [])

  const linksElement = links.map(item => <TableLink key={item.id} link={item} links={links} setLinks={setLinks} />)

  return (
      <div className="flex flex-col items-center">
        <div className="flex justify-end w-full max-w-md md:max-w-2xl">
          <button className="w-12 h-12 border-none rounded-full bg-green-400 cursor-pointer text-4xl font-montserrat font-bold hover:bg-black hover:text-white"
            onClick={() => navigate(PATH_LINK_FORM)}> +
          </button>
        </div>
        <div className="w-full max-w-md md:max-w-2xl">
          {linksElement}
        </div>

      </div>
  )

}

export default LinkList