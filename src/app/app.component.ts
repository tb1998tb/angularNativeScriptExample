import { Component, OnInit } from "@angular/core";
import { LocalNotifications } from "nativescript-local-notifications";
import * as Toast from "nativescript-toast";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    timer;
    public count = 1;
    public constructor() {
       
    }

    public ngOnInit() {
        LocalNotifications.addOnMessageReceivedCallback(notificationData => {
            Toast.makeText("Notification received," + "  ID: " + notificationData.id +
                "\nTitle: " + notificationData.title +
                "\nBody: " + notificationData.body );
        }
        );
    }

    public schedule() {
        if (this.timer)
            clearInterval(this.timer);
        this.timer=setInterval(() => {
        LocalNotifications.requestPermission().then(granted => {

            if (granted) {
                LocalNotifications.schedule([{
                    title: 'check_' + this.count++,
                    body:'success',
                    at: new Date(new Date().getTime() + 5000)
                }]).then(() => {
                    Toast.makeText("Notification scheduled!").show();
                }, error => {
                    console.dir(error);
                });
            }
        });
        },5000);
    }

}
