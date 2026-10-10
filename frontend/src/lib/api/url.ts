import {api} from "@/lib/api/axios";
import { UrlPayload ,UrlRecord } from "@/types/url";

export const getUrls = async (search=""): Promise<UrlRecord[]> =>{
    const response = await api.get<UrlRecord[]>('/api/urls/',{
        params:search.trim() ? {search:search.trim()} :{}
    });

    return response.data
}

//create new url 
export const create_url = async(payload:UrlPayload):Promise<UrlRecord> =>{
    const response =await api.post<UrlRecord>("/api/urls/",payload);
    return response.data;
}

export const delete_url = async(url_id:number):Promise<void> =>{
    await api.delete(`/api/urls/${url_id}`)
}
