import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {LinkService} from "@/service/linkService";
import {Controller, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {PATH_LINKS} from "@/components/MainRouter";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrReturn } from "react-icons/gr";
import HistoryList from "@/components/history/HistoryList";
import {handleImageUpload} from "@/utils/handleImage";
import Editor from "react-simple-wysiwyg";

const LinkForm = () => {

  const navigate = useNavigate()
  const params = useParams()

  const [imagePreview, setImagePreview] = useState<string | undefined>()
  const [formDescription, setFormDescription] = useState<string>()

  useEffect(() => {
    if(params.linkId) {
      LinkService.linkDetail(Number(params.linkId)).then(item => {
        setValue("name", item?.name)
        setValue("url", item?.url)
        setValue("description", item?.description)
        setValue("availableFirefox", item?.availableFirefox)
        setValue("availableChrome", item?.availableChrome)
        setValue("active", item?.active)
        setValue("newTab", item?.newTab)
        setImagePreview(item?.image)
        setFormDescription(item?.description)
      })
    }
  }, [])

  const {handleSubmit, control, setValue, register, formState: {errors}} = useForm({
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

  function deleteLink(){
    if(window.confirm("Delete this link?")) {
      LinkService.deleteLink(Number(params.linkId)).then(() => {
        navigate(PATH_LINKS)
      })
      toast.info("Link deleted")
    }
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  }

  async function onSubmit (data: any){
    if(data.image) {
      await handleImageUpload(data.image).then(item => data.image = item)
    }
    data.image = imagePreview

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

            <p className="my-1">Description</p>
            <div className="mb-4 w-11/12 rounded-lg border-solid border-indigo-200 border-2">
              <Controller control={control} name="description"
                  render={() => (
                      <Editor className={"font-montserrat"}
                          value={formDescription}
                          onChange={e => {
                            setValue("description", e.target.value)
                            setFormDescription(e.target.value)
                          }}
                      />
                  )}
              />
            </div>


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

            <p className="mt-4 mb-1">Image</p>
            <input type="file" accept="image/jpeg" onInput={(event) => onImageChange(event)}
                   className={"p-2 mb-4 w-1/2 font-montserrat rounded-lg border-solid border-indigo-200 border-2"}
                   placeholder="Image"
                   {...register("image")}
            />

            {imagePreview && <img className="w-64" alt="image" src={imagePreview} />}

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