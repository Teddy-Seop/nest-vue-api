interface ILog {
    index: string;
    type: string;
    id: number;
    version: number;
    headers: IHeaders;
    source: ISource;
}

interface ISource {
    message: JSON;
    level: string;
    createdAt: Date;
}

interface IHeaders {
    request_method: string;
    http_version: string;
    request_url: string;
    status_code: number;
    http_host: string;
    http_accept: string;
    connection: string;
    content_type: string;
    content_length: number;
}

// 수정 여부가 필요한가?