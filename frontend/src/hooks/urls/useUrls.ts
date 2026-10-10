import { useQuery } from "@tanstack/react-query";
import { getUrls } from "@/lib/api/url";


export const useUrls = (search:string)=>{
    return useQuery({
        queryKey: ["urls",search],
        queryFn:()=>getUrls(search)
    }); 
}