import {Connection, BaseConnection} from 'jsforce'

export class JsConnection extends Connection {
    soap: SoapApi;
    identity(options?: any, callback?: any): Promise<any>;
}

export class SoapApi extends BaseConnection {
    getUserInfo(): Promise<any>;
}

export interface SoapUserInfo {
    accessibilityMode: boolean;
    currencySymbol?: any;
    orgAttachmentFileSizeLimit: number;
    orgDefaultCurrencyIsoCode?: any;
    orgDefaultCurrencyLocale?: any;
    orgDisallowHtmlAttachments: boolean;
    orgHasPersonAccounts: boolean;
    organizationId: string;
    organizationMultiCurrency: boolean;
    organizationName: string;
    profileId: string;
    roleId: string;
    sessionSecondsValid: number;
    userDefaultCurrencyIsoCode: string;
    userEmail: string;
    userFullName: string;
    userId: string;
    userLanguage: string;
    userLocale: string;
    userName: string;
    userTimeZone: string;
    userType: string;
    userUiSkin: string;
}

