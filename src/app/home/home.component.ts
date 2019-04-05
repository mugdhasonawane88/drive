import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alldata: any = [];
  displaydata: any = [];
  reloaddata: any = [];
  currenturlid: string = '#';
  newurlid: string;
  public id: string;
  folder: any = [];
  urlparam: any = [];
  newUrl: string = '#';
  searchvalue: string = '';
  filteredData: any = [];
  checkboxArr: any = [];
  newFolderObj: {};
  foldername: string;
  owner: string;
  modifieddate: string;
  filesize: string;
  deleteItemIndexArr: any = [];
  _searchterm: string = '';
  serverData: any = [];
  constructor(private data: DataService, private activatedRoute: ActivatedRoute, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.getFolders().subscribe(data => {

      this.alldata = data;
      this.displaydata = data;
      // this.reloaddata = this.displaydata;
      this.filteredData = data;

      data = this.displaydata;

      var urlparam = window.location.hash.split('/').slice(1);
      for (var i = 0; i < urlparam.length; i++) {
        var newObj = {
          objname: this.displaydata.filter(obj => obj.id == urlparam[i])[0].name,
          objid: urlparam[i]
        };
        this.folder.push(newObj);
        this.currenturlid = this.currenturlid + '/' + urlparam[i];
        this.displaydata = this.displaydata.filter(obj => obj.id == urlparam[i])[0].folder;
      }
    });
  }

  onFolderClick(userid, username) {
    var newObj = {
      objname: username,
      objid: userid
    };
    this.folder.push(newObj);
    this.currenturlid = this.currenturlid + '/' + userid;
    window.history.replaceState({}, '', this.currenturlid);
    this.displaydata = this.displaydata.filter(obj => obj.id === userid)[0].folder;
    this.filteredData = this.displaydata;
  }

  onFolderLinkClick(foldernameobjname, foldernameobjid, index) {
    this.folder.splice(index + 1);
    var urlparam = window.location.hash.split('/').slice(1);
    var newLink = urlparam.slice(0, index + 1);
    let data = this.alldata;
    this.currenturlid = "#";
    for (var i = 0; i < this.folder.length; i++) {
      this.currenturlid = this.currenturlid + '/' + this.folder[i].objid;
      window.history.replaceState({}, '', this.currenturlid);
      data = data.filter(obj => obj.id == this.folder[i].objid)[0].folder;
    }
    console.log("data - " + data);
    this.displaydata = data;
    this.filteredData = this.displaydata;
  }


  deleteSeletedFolder(id) {
    let deldata = this.filteredData;
    for (var i = 0; i < this.checkboxArr.length; i++) {
      deldata = deldata.filter(obj => obj.id !== this.checkboxArr[i]);
     
    }
    console.log("deldata - " + deldata);
    this.displaydata = deldata;
    this.filteredData =  this.displaydata;
  }

  clickCheckbox(folderid) {
    if (this.checkboxArr.includes(folderid) == true) {
      var index = this.checkboxArr.indexOf(folderid);
      this.checkboxArr.splice(index, 1);
    }
    else {
      this.checkboxArr.push(folderid);
    }
  }

  onFormSubmit() {
    var d = new Date(this.modifieddate), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    var modifieddate = [month, day, year].join('-');

    var updateObj = {
      name: this.foldername,
      id: new Date().getTime(),
      owner: this.owner,
      lastmodified: modifieddate,
      filesize: this.filesize
    }
    if (this.displaydata === undefined) {
      this.displaydata = [];
    }
    this.displaydata.push(updateObj);
    this.serverData = this.displaydata;
    this.data.updateFolders(this.serverData);
  }

  onClickName() {
    this.displaydata.sort(function (a, b) {
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      return 0
    })
  }
  onClickDate() {
    this.displaydata.sort(function (a, b) {
      var nameA = new Date(a.lastmodified).getTime();
      var nameB = new Date(b.lastmodified).getTime();
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      return 0
    })
  }
  onClickSize() {
    this.displaydata.sort(function (a, b) {
      var nameA = a.filesize;
      var nameB = b.filesize;
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      return 0
    })
  }

  onKey(event: any) {
    this.searchvalue = event.target.value;
    let data = this.filteredData;
    data = data.filter(obj => obj.name.toLowerCase().indexOf(this._searchterm.toLowerCase()) > -1 ||
      obj.owner.toLowerCase().indexOf(this._searchterm.toLowerCase()) > -1 ||
      obj.filesize.toString().indexOf(this._searchterm.toLowerCase()) > -1 ||
      obj.lastmodified.toLowerCase().indexOf(this._searchterm.toLowerCase()) > -1);
    this.displaydata = data;
  }

}
