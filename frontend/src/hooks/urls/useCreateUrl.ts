import { useMutation , useQueryClient } from "@tanstack/react-query";
import { create_url } from "@/lib/api/url";



export const useCreateUrl = ()=>{
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