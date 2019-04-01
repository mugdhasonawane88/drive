import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//const data = require('data.json');

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }
    public serverData = [
        {
            "name": "folder31",
            "id": 1,
            "owner": "user1",
            "lastmodified": "7-23-2014",
            "filesize": 325,
            "folder": [
                {
                    "name": "subfolder34",
                    "id": 34,
                    "owner": "user1",
                    "lastmodified": "4-24-2014",
                    "filesize": 925,
                    "folder": [
                        {
                            "name": "supersubfolder33",
                            "id": 33,
                            "owner": "me",
                            "lastmodified": "2-6-2014",
                            "filesize": 625
                        },
                        {
                            "name": "supersubfolder32",
                            "id": 32,
                            "owner": "user1",
                            "lastmodified": "3-15-2014",
                            "filesize": 525
                        },
                        {
                            "name": "supersubfolder31",
                            "id": 31,
                            "owner": "user2",
                            "lastmodified": "3-1-2014",
                            "filesize": 125
                        }
                    ]
                },
                {
                    "name": "subfolder2",
                    "id": 2,
                    "owner": "me",
                    "lastmodified": "3-2-2014",
                    "filesize": 425
                },
                {
                    "name": "subfolder66",
                    "id": 66,
                    "owner": "user3",
                    "lastmodified": "3-11-2014",
                    "filesize": 1425,
                    "folder": [
                        {
                            "name": "supersubfolder3",
                            "id": 3,
                            "owner": "user5",
                            "lastmodified": "3-12-2014",
                            "filesize": 165
                        }
                    ]
                }
            ]
        },
        {
            "name": "folder11",
            "id": 11,
            "owner": "user3",
            "lastmodified": "8-8-2014",
            "filesize": 825,
            "folder": [
                {
                    "name": "subfolder26",
                    "id": 26,
                    "owner": "me",
                    "lastmodified": "2-8-2014",
                    "filesize": 105,
                    "folder": [
                        {
                            "name": "supersubfolder20",
                            "id": 20,
                            "owner": "user6",
                            "lastmodified": "12-8-2014",
                            "filesize": 1655
                        },
                        {
                            "name": "supersubfolder21",
                            "id": 21,
                            "owner": "user2",
                            "lastmodified": "2-10-2014",
                            "filesize": 1155
                        },
                        {
                            "name": "supersubfolder22",
                            "id": 22,
                            "owner": "user4",
                            "lastmodified": "7-3-2014",
                            "filesize": 125
                        }
                    ]
                },
                {
                    "name": "subfolder27",
                    "id": 27,
                    "owner": "user",
                    "lastmodified": "2-8-2014",
                    "filesize": 4255,
                    "folder": [
                        {
                            "name": "supersubfolder29",
                            "id": 29,
                            "owner": "user2",
                            "lastmodified": "6-1-2014",
                            "filesize": 2325
                        },
                        {
                            "name": "supersubfolder27",
                            "id": 27,
                            "owner": "user1",
                            "lastmodified": "3-8-2014",
                            "filesize": 125,
                            "folder": [
                                {
                                    "name": "supersubfolder56",
                                    "id": 56,
                                    "owner": "user5",
                                    "lastmodified": "6-2-2014",
                                    "filesize": 2325
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "subfolder67",
                    "id": 67,
                    "owner": "user1",
                    "lastmodified": "2-12-2014",
                    "filesize": 25,
                    "folder": [
                        {
                            "name": "supersubfolder3",
                            "id": 3,
                            "owner": "me",
                            "lastmodified": "3-12-2014",
                            "filesize": 1125
                        }
                    ]
                }
            ]
        }
    ];

    getUsers() {
        return new Observable(observer => {
            observer.next(this.serverData);
        });
    }
    updateUsers(obj) {
        //  console.log("obj", obj);
        // for (var i = 0; i < this.serverData.length; i++) {
        //     console.log("obj", obj);
        // }
        var urlparam = window.location.hash.split('/').slice(1);
        console.log("urlparam", urlparam);
        for (var i = 0; i < urlparam.length; i++) {
            this.serverData.push(obj);
            // this.displaydata = this.displaydata.filter(obj => obj.id == urlparam[i])[0].folder;
        }

    }

}
