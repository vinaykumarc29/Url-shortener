import { useMutation , useQueryClient } from "@tanstack/react-query";
import { create_url } from "@/lib/api/url";
import { UrlPayload } from "@/types/url";


export const useCreateUrl = (payload:UrlPayload)=>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:create_url,
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:['urls']
            });
        }
    });
}