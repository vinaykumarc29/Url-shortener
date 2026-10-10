import { useMutation , useQueryClient } from "@tanstack/react-query";
import { delete_url } from "@/lib/api/url";


export const useDeleteUrl = ()=>{   
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:delete_url,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['urls']
            });
        }
    });
}