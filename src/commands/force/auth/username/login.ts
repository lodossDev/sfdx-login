import {flags, SfdxCommand} from '@salesforce/command';
import {AuthInfo, Connection, Org} from '@salesforce/core';
import {AnyJson} from '@salesforce/ts-types';
import * as jsforce from 'jsforce';
import {JsConnection, SoapUserInfo} from '../../../../index';
import {CLIENT_ID, SECRET_KEY} from '../../../../settings';

export default class UsernameLogin extends SfdxCommand {

    public static description = `This command adds a simple login mechanism missing from sfdx.`;

    public static examples = [
        `$ sfdx force:auth:username:login --username=lodoss118@saasforceltd.com 
                                          --password=xxxxxxxxxx
 
        Logged in as: lodoss118@saasforceltd.com (xxxxxxxxxxx)
        Organization: SAASFORCE LTD (xxxxxxxxxxx)
        `
    ];

    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        server: flags.string({char: 's', required: true, description: 'The instance endpoint i.e. loginUrl', default: 'https://test.salesforce.com'}),
        clientid: flags.string({char: 'c', description: 'The connected app client id.'}),
        secret: flags.string({char: 'k', description: 'The connected app secret key.'}),
        username: flags.string({char: 'u', required: true, description: 'Salesforce username.'}),
        password: flags.string({char: 'p', required: true, description: 'Salesforce password+security token.'})
    };

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = false;

    public async run(): Promise<AnyJson> {
        const clientid = this.flags.clientid || CLIENT_ID;
        const secretkey = this.flags.secret || SECRET_KEY;

        const conn =  (new jsforce.Connection({
            oauth2 : {
                // you can change loginUrl to connect to sandbox or prerelease env.
                loginUrl : this.flags.server,
                clientId : clientid,
                clientSecret : secretkey
            }
        })) as JsConnection;

        await conn.loginBySoap(this.flags.username, this.flags.password);
       
        const userInfo = await conn.soap.getUserInfo() as SoapUserInfo;
        this.ux.log('Logged in as: ' + userInfo.userName + ' (' + userInfo.userId + ')');
        this.ux.log('Organization: ' + userInfo.organizationName + ' (' + userInfo.organizationId + ')');
        
        const globalConfig = this.configAggregator.getGlobalConfig();
        globalConfig.set('defaultusername', this.flags.username);
        globalConfig.set('instanceUrl', conn.instanceUrl);
        await globalConfig.write();

        const authInfo = await AuthInfo.create(
            userInfo.userName,
            {
                tokenServiceUrl: conn.instanceUrl,
                accessToken: conn.accessToken
            }
        );
     
        await authInfo.save({
            username: this.flags.username,
            clientId: clientid,
            clientSecret: secretkey,
            loginUrl: this.flags.server,
            instanceUrl: conn.instanceUrl,
            orgId: userInfo.organizationId
        });

        this.org = await Org.create(await Connection.create(authInfo));
        return {};
    }
}
