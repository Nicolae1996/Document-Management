export class BaseModel {
    is_error: boolean;
    is_success: boolean;
    error_keys: any;
    result: result;
}
class result {
    total_count: number;
    page: number;
    page_size: number;
    total_pages: number;
    result: any;
}