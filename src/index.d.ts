import {Connection, BaseConnection} from 'jsforce'

export class JsConnection extends Connection { 
    soap: SoapApi;
    identity(options?: any, callback?: any): Promise<any>;
}

export class SoapApi extends BaseConnection {
    getUserInfo(): Promise<any>;
}


