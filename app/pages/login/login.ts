/**
 * Login component
 * Created by Michael DESIGAUD on 02/02/2016.
 */

import {Page, NavController, Alert} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {NFCPage} from '../nfc/nfc';
import {User,Profile} from '../../classes/user';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';

@Page({
    templateUrl: 'build/pages/login/login.html',
    pipes: [TranslatePipe]
})
export class LoginPage {
    nav:NavController;
    loginForm;
    user:User;
    translate: TranslateService;
    // We inject the router via DI
    constructor(@Inject(FormBuilder) form: FormBuilder, @Inject(NavController) nav: NavController, @Inject(TranslateService) translate: TranslateService) {
        this.nav = nav;
        this.user = new User();
        this.translate = translate;
        this.loginForm = form.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: ['', Validators.required]
        });
    }
    login(event:any):void {
        // This will be called when the user clicks on the Login button
        event.preventDefault();

        if (this.user.isValid()) {
            this.nav.setRoot(NFCPage);
            this.user.lastConnection = new Date();
            this.user.role = Profile.ADMIN;
            localStorage.setItem('NFC-APP-TOKEN', JSON.stringify(this.user));
        } else {
            let alert = Alert.create({
                title: 'Invalid credentials',
                subTitle: 'You entered invalid credentials !',
                buttons: ['Ok']
            });
            this.nav.present(alert);
        }

        // We call our API to log the user in. The username and password are entered by the user
        /*fetch('http://localhost:3001/sessions/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
            .then(status)
            .then(json)
            .then((response) => {
                // Once we get the JWT in the response, we save it into localStorage
                localStorage.setItem('jwt', response.id_token);
                // and then we redirect the user to the home
                this.router.parent.navigate('/home');
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.message);
            });*/

    }
}
