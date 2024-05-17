import { useNavigate, useParams } from "react-router-dom"
import {useEffect} from "react";
import {LinkService} from "@/service/linkService";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {PATH_LINKS} from "@/components/MainRouter";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrReturn } from "react-icons/gr";
import HistoryList from "@/components/history/HistoryList";

const LinkForm = () => {

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if(params.linkId) {
      LinkService.linkDetail(Number(params.linkId)).then(item => {
        setValue("name", item?.name)
        setValue("url", item?.url)
        setValue("image", item?.image)
        setValue("description", item?.description)
        setValue("availableFirefox", item?.availableFirefox)
        setValue("availableChrome", item?.availableChrome)
        setValue("active", item?.active)
        setValue("newTab", item?.newTab)
      })
    }
  }, [])

  const {handleSubmit, setValue, control, register, formState: {errors}} = useForm({
    defaultValues: {
      name: "",
      url: "",
      image: "",
      description: "",
      availableFirefox: true,
      availableChrome: true,
      active: true,
      newTab: true
    }
  })

  const onSubmit = (data: any) => {
    if(!params.linkId) {
      LinkService.createLink(data).then(item => {
        if(item.status === 201) {
          toast.success('Link created')
          navigate(PATH_LINKS)
        } else {
          let errorStr = ''
          item.json().then(err => errorStr = err.message).then(() => toast.error(errorStr))
        }
      })
    } else {
      LinkService.updateLink(data, Number(params.linkId)).then(item => {
        if(item.status === 200) {
          toast.success('Link updated')
          navigate(PATH_LINKS)
        } else {
          let errorStr = ''
          item.json().then(err => errorStr = err.message).then(() => toast.error(errorStr))
        }
      })
    }
  }

  function deleteLink(){
    if(window.confirm("Delete this link?")) {
      LinkService.deleteLink(Number(params.linkId)).then(() => {
        navigate(PATH_LINKS)
      })
      toast.info("Link deleted")
    }
  }

  return (
      <div className="md:grid xl:grid-cols-2">
        <div className="flex flex-col items-center mx-4">
          <div className="flex justify-between w-11/12 max-w-xl mb-4">
            <button className="border-none bg-transparent cursor-pointer text-2xl hover:text-indigo-300"
             onClick={() => navigate(PATH_LINKS)}>
              <GrReturn />
            </button>
            <button className="border-none bg-transparent cursor-pointer text-2xl hover:text-rose-600"
             onClick={() => deleteLink()}>
              <RiDeleteBinFill />
            </button>
          </div>


          <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col w-full max-w-xl items-left bg-white"}>

            <p className="my-1">Name</p>
            <input className={"p-2 w-11/12 font-montserrat rounded-lg border-solid border-indigo-200 border-2"}
                   placeholder="Name"
                   {...register("name", {required: "This field is required."})}
            />
            <p className="text-rose-600 text-sm mt-1">{errors.name && errors.name.message}</p>

            <p className="my-1">URL</p>
            <input className={"p-2 w-11/12 font-montserrat rounded-lg border-solid border-indigo-200 border-2"}
                   placeholder="URL"
                   {...register("url", {required: "This field is required."})}
            />
            <p className="text-rose-600 text-sm mt-1">{errors.url && errors.url.message}</p>

            <p className="my-1">Image</p>
            <input className={"p-2 mb-4 w-11/12 font-montserrat rounded-lg border-solid border-indigo-200 border-2"}
                   placeholder="Image"
                   {...register("image")}
            />

            <p className="my-1">Description</p>
            <textarea className={"p-2 mb-4 w-11/12 h-24 focus:outline-none font-montserrat rounded-lg border-solid border-indigo-200 border-2"}
                   placeholder="Description"
                   {...register("description")}
            />

            <div className="grid grid-cols-2">
              <p className="my-1">Available in Firefox</p>
              <input type="checkbox" className="accent-indigo-300 cursor-pointer"
                     {...register("availableFirefox")}
              />
              <p className="my-1">Available in Chrome</p>
              <input type="checkbox" className="accent-indigo-300 cursor-pointer"
                     {...register("availableChrome")}
              />
              <p className="my-1">Active</p>
              <input type="checkbox" className="accent-indigo-300 cursor-pointer"
                     {...register("active")}
              />
              <p className="my-1">Open in new tab</p>
              <input type="checkbox" className="accent-indigo-300 cursor-pointer"
                     {...register("newTab")}
              />
            </div>

            <button type="submit" className={"my-4 w-20 h-8 border-none rounded-lg bg-indigo-300 cursor-pointer font-montserrat hover:bg-black hover:text-white"}>
              Submit
            </button>

          </form>


        </div>
        <div className="flex flex-col items-center">
          {params.linkId && <HistoryList linkId={params.linkId} />}
        </div>
      </div>
  )

}

export default LinkForm