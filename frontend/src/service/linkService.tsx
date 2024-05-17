import {LinkModel} from "@/model/linkModel";
import {HistoryModel} from "@/model/historyModel";

export namespace LinkService {

  const api = 'http://localhost:8080/link'

  export async function linkList(): Promise<LinkModel[]> {
    try {
      const response = await fetch(`${api}/all`)

      return response.json()
    } catch(error) {
      return []
    }
  }

  export async function linkDetail(id: number): Promise<LinkModel | null> {
    try {
      const response = await fetch(`${api}/${id}`)

      return response.json()
    } catch(error) {
      return null
    }
  }

  export async function createLink(link: LinkModel): Promise<Response> {
    return await fetch(`${api}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(link)}
    )
  }

  export async function updateLink(link: LinkModel, id: number): Promise<Response> {
    return await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(link)}
    )
  }

  export async function getLinkHistory(id: number): Promise<HistoryModel[]> {
    try {
      const response = await fetch(`${api}/${id}/history`)

      return response.json()
    } catch(error) {
      return []
    }
  }

  export async function deleteLink(id: number) {
    try {
      await fetch(`${api}/${id}`, {
        method: 'DELETE'
      })

    } catch(error) {
      return
    }
  }
}