export interface UrlRecord{
    id: number,
    name: string,
    short_code:string,
    original_url:string,
    click_count:number,
    created_at:string
}

export interface UrlPayload{
    name:string,
    original_url:string
}