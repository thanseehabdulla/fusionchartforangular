import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpConnectionService {
    url = '/api';
    headers = new HttpHeaders();

    constructor(private httpclient: HttpClient) {
    }

    get(path: string, payload?: any) {
        return this.httpclient.get(this.url + path, payload);
    }
    post(path: string, payload?: any) {
        return this.httpclient.post<any>(this.url + path, payload);
    }
    put(path: string, payload?: any) {
        return this.httpclient.put(this.url + path, payload);
    }
    delete(path: string, payload?: any) {
        return this.httpclient.delete(this.url + path, payload);
    }
    patch(path: string, payload?: any) {
        return this.httpclient.patch(this.url + path, payload);
    }

    // async
    async asyncget(path: string, payload?: any) {
        const response: object = await this.httpclient.get(this.url + path, payload).toPromise();
        return response;
    }
    async asyncpost(path: string, payload?: any) {
        const response: object = await this.httpclient.post(this.url + path, payload).toPromise();
        return response;
    }
    async asyncput(path: string, payload?: any) {
        const response: object = await this.httpclient.put(this.url + path, payload).toPromise();
        return response;
    }
    async asyncdelete(path: string, payload?: any) {
        const response: object = await this.httpclient.delete(this.url + path, payload).toPromise();
        return response;
    }
    async asyncupdate(path: string, payload?: any) {
        const response: object = await this.httpclient.patch(this.url + path, payload).toPromise();
        return response;
    }
}
