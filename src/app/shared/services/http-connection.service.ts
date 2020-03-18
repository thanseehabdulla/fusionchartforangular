// service to handle http requests

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpConnectionService {
    headers = new HttpHeaders();

    constructor(private httpclient: HttpClient) { }

    post_auth(path: string, payload?: any) {
        return this.httpclient.post<any>(path, payload, { withCredentials: true });
    }

    get(path: string, payload?: any) {
        return this.httpclient.get(path, payload);
    }
    post(path: string, payload?: any) {
        return this.httpclient.post<any>(path, payload);
    }
    put(path: string, payload?: any) {
        return this.httpclient.put(path, payload);
    }
    delete(path: string, payload?: any) {
        return this.httpclient.delete(path, payload);
    }
    patch(path: string, payload?: any) {
        return this.httpclient.patch(path, payload);
    }

    // async
    async asyncget(path: string, payload?: any) {
        const response: object = await this.httpclient.get(path, payload).toPromise();
        return response;
    }
    async asyncpost(path: string, payload?: any) {
        const response: object = await this.httpclient.post(path, payload).toPromise();
        return response;
    }
    async asyncput(path: string, payload?: any) {
        const response: object = await this.httpclient.put(path, payload).toPromise();
        return response;
    }
    async asyncdelete(path: string, payload?: any) {
        const response: object = await this.httpclient.delete(path, payload).toPromise();
        return response;
    }
    async asyncupdate(path: string, payload?: any) {
        const response: object = await this.httpclient.patch(path, payload).toPromise();
        return response;
    }
}
