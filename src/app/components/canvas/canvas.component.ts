import { Component, ViewEncapsulation, OnInit, Pipe, PipeTransform, ElementRef, AfterViewInit, Inject, OnChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml, SafeScript, SafeStyle } from '@angular/platform-browser';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
import { NgModule } from '@angular/core';
import * as FileSaver from 'file-saver';
import { SidebarServiceService } from '../sidebar/services/sidebar-service.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'canvas-area',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

@NgModule()
export class CanvasComponent implements OnInit {
  @ViewChild('openModal') openModal:ElementRef;
  @ViewChild('closeopenModal') closeopenModal:ElementRef;
  @ViewChild('appBuilder') appBuilder:ElementRef;

  showHide: boolean;
  constructor(private sanitizer: DomSanitizer, private sidebarServiceService: SidebarServiceService) {
    this.showHide = true;
  }
  ngOnInit() {
      //this.openModal.nativeElement.click();
      this.sidebarServiceService.sideBarJson().subscribe(result => {
      this.sourceBuilderTools = result;
    });
    this.sidebarServiceService.getAllProjects().subscribe(result => {
      this.projectsArray = result;
    });
    this.btnFlag = false;
    this.btnName = "Copy";
  }

  backToAppBuilder()  {
  this.appBuilder.nativeElement.click();
}


  projectsArray: any[] = [];
  openProject: string = "";
  saveProject: string = "";
  btnName: string = "Copy";
  btnFlag: boolean = false;
  flag: boolean = false;
  simpleDrop: any = null;
  template: any = null;
  targetList: any[] = [];
  secondList: any[] = [];
  thirdList: any[] = [];
  abc: any = null;
  externalCSSArray: any[] = [];
  externalCSSString: string = ""; //Array For Chips UI External CSS
  selectedElement: any = {};
  attributes: string = "";
  classes: string = "";
  labels: string = "";
  templateArray: any[] = [];
  html: string = "";
  subStringHTMLStart: any[] = [];
  subStringHTMLEnd: any[] = [];
  arrStartString: any[] = [];
  arrEndString: any[] = [];
  generatedHtml: string = "";
  filename: string = "";

  //method to hide modal
  changeShowStatus() {
    console.log(this.showHide);
    this.showHide = !this.showHide;
  }

  chageModalButton() {

    this.btnName = "Copied";

  }
  chageModalButtonBackToOriginal() {
    this.btnName = "Copy";
  }
  addTo($event: any) {
    this.targetList.push($event.dragData);
  }
  receivedData: Array<any> = [];
  rData: any = null;

  transferDataSuccess($event: any) {
    this.rData = $event.dragData;
    this.receivedData.push($event);
  }

  version = null;

  theme = 'dark';

  sourceNestedItems = [
    { label: 'Item 1', children: [] },

    { label: '<h3>Hello World</h3>' }
  ];
  targetNestedItems = [];

  canvasJson: any[] = [];
  droppableItemClass = item => `${item.cssClass}`;
  builderDrag(e) {
    const item = e.value;
    item.data = item.inputType === 'number' ?
      (Math.random() * 100) | 0 :
      Math.random().toString(36).substring(20);
  }
  log(e) {
  }
  subString: any[] = [];
  htmlGen: string = " ";
  childTemplates: any[] = [];

  //This Method Generate HTML Code & Bind the value in 'htmlGen' variable
  generateHtml() {
    this.htmlGen = "";
    for (let sample of this.canvasJson) {
      var childTemplates: any[] = [];
      if (sample.type == "container") {
        var childHTMLTemplates: any[] = this.getChildElement(sample.columns);
        this.subString = sample.templates.split('>');
        for (var i = 0; i < this.subString.length - 1; i++) {
          this.subString[i] += ">";
        }
        this.htmlGen = this.htmlGen + this.subString[0] + childHTMLTemplates.join("") + this.subString[1];
        childHTMLTemplates = [];
        this.subString = [];
        this.childTemplates = [];
      }
      else {
        this.htmlGen = this.htmlGen + sample.templates;
      }
    }
  }

  subStringStart: any[] = [];
  getChildElement(columns: any[]) {
    for (let item of columns) {
      if (item.type == "container") {
        this.subStringStart = item.templates.split('>');
        for (var i = 0; i < this.subStringStart.length - 1; i++) {
          this.subStringStart[i] += ">";
        }
        this.childTemplates.push(this.subStringStart[0]);
        this.getChildElement(item.columns);
      }
      else {

        this.childTemplates.push(item.templates);
        this.childTemplates.push(this.subStringStart[1]);
        this.subStringStart = [];
      }
    }
    return this.childTemplates;
  }


  selectedItemRemove(model) {
    this.selectedElement = {};
    this.flag = false;
  }


  onDrop(event) {
    this.selectedItemChange(event.value);
  }

  onFirstDrop(event) {
    if (event.value.type != "container") {
      console.log("Drop not allowed");
      let indexOfDroppedItem =  this.canvasJson.indexOf(event.value);
      console.log(this.canvasJson);
     
      console.log("Hello From First Drop Method");
      console.log(indexOfDroppedItem);
      console.log(event.value.id);
      this.canvasJson.splice(indexOfDroppedItem,1);

      this.alertMsg = "Please Select A Div/Grid First";
      this.alertFlag = true;
      setTimeout(() => {
        this.alertFlag = false;
      }, 1500);
    }
    else {
      this.selectedItemChange(event.value);
    }

  }

  selectedItemChange(model) {
    this.selectedElement = model;
    this.flag = true;
    for (let i of this.selectedElement.attributes) {
      if (i.name == "class" && i.hasOwnProperty("styleValue")) {
        if (i.styleValue.hasOwnProperty("ExternalCss")) {
          this.externalCSSArray = i.styleValue.ExternalCss.split(" ");

        }
        else {
          this.externalCSSArray = [];
        }

      }
    }
  }

  subChilds: any[] = [];
  changeStylesAndProperties(key, val, attrName) {
    if (attrName == "attributes") {
      for (let prop of this.selectedElement.attributes) {
        if (prop.name == key) {
          prop.value = val;
        }
      }
    }
    if (attrName == "label") {
      for (let prop of this.selectedElement.label) {
        prop.labeltext = val;
      }

    }
    if (attrName == "Options") {
      if (key == "Tags") {
        this.selectedElement.tag = val;
      }
      else {
        for (let prop of this.selectedElement.attributes) {
          if (prop.name == "class") {
            prop.styleValue[key] = val;
            prop.value = this.generateClasses(prop.styleValue);
          }
        }
      }
    }

    if (attrName == "styles") {
      for (let prop of this.selectedElement.attributes) {
        if (prop.name == "style") {
          prop.styles[key] = val;
          prop.value = this.generateStyles(prop.styles);
        }
      }
    }

    for (let item of this.selectedElement.attributes) {

      this.attributes = this.attributes + item.name + "='" + item.value + "' ";


    }

    if (this.selectedElement.type == "container") {
      this.selectedElement.templates = "<" + this.selectedElement.tag + " " + this.attributes + ">" + "</" + this.selectedElement.tag + ">";
    }

    if (this.selectedElement.type == "item") {
      if (this.selectedElement.subtype == "labeltype") {

        for (let item of this.selectedElement.label) {
          this.labels = this.labels + this.labels + item.labeltext;
        }

        this.selectedElement.templates = "<" + this.selectedElement.tag + " " + this.attributes + ">" + this.labels + "</" + this.selectedElement.tag + ">"
      }

      else {
        this.selectedElement.templates = "<" + this.selectedElement.tag + " " + this.attributes + ">"
      }

    }

    if (this.selectedElement.type == "template") {

      this.subChilds = this.selectedElement.templates.split('>');
      for (var i = 0; i < this.subChilds.length - 1; i++) {
        this.subChilds[i] += ">";
      }
      this.subChilds.splice(0, 1);
      this.subChilds.splice(this.subChilds.length - 2, 1);
      this.selectedElement.templates = "<" + this.selectedElement.tag + " " + this.attributes + ">" + this.subChilds.join("") + "</" + this.selectedElement.tag + ">"

    }
    this.attributes = "";
    this.labels = "";
    this.classes = "";
    this.styles = "";
  }
  generateClasses(element) {

    for (const key of Object.keys(element)) {
      this.classes = this.classes + " " + element[key];
    }
    return this.classes;
  }
  styles: string = "";
  generateStyles(element) {
    for (const key of Object.keys(element)) {
      this.styles = this.styles + " " + key + ":" + element[key] + ";";
    }
    return this.styles;
  }

  convertToString(key, attrName) {
    var externalStyles: string = this.externalCSSArray.join(" ");
    this.changeStylesAndProperties(key, externalStyles, attrName);
  }

  demoHtml: string = "";
  subStringHTMLBody: any[] = [];
  arrBodyString: any[] = [];

  getHTMLCode() {
    var start = "<!doctype html><html lang='en'><head><base href='#' target='_blank'/><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1'><meta http-equiv='content-type' content='text/html'><meta name='author' content='App-Builder Team'><meta name='keywords' content='Text, HTML, CSS, JSON, JavaScript'><meta name='description' content='Full-Stack Develpoment Tool App-Builder'><title value='HTML Code Generated By App Builder'></title> <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'></link></head><body>";
    var end = "</body></html>";
    this.subStringHTMLStart = start.split('>');
    for (var i = 0; i < this.subStringHTMLStart.length - 1; i++) {
      this.subStringHTMLStart[i] += ">";
      if (this.subStringHTMLStart[i].charAt(0) === '<' && this.subStringHTMLStart[i + 1].charAt(0) != '<') {
        this.subStringHTMLStart[i] += this.subStringHTMLStart[i + 1];
        this.subStringHTMLStart.splice(i + 1, 1);
      }
      this.arrStartString.push(this.subStringHTMLStart[i]);
    }
    this.subStringHTMLEnd = end.split('>');
    this.arrEndString = [];
    for (var i = 0; i < this.subStringHTMLEnd.length - 1; i++) {
      this.subStringHTMLEnd[i] += ">";
      this.arrEndString.push(this.subStringHTMLEnd[i]);
    }
    this.subStringHTMLBody = this.canavasHTMLBuilder().split('>');
    this.arrBodyString = [];
    for (var i = 0; i < this.subStringHTMLBody.length - 1; i++) {
      this.subStringHTMLBody[i] += ">";
      this.arrBodyString.push(this.subStringHTMLBody[i]);
    }
    this.generatedHtml = this.arrStartString.join("\r\n") + "\n" + this.arrBodyString.join("\r\n") + "\n" + this.arrEndString.join("\r\n");
    this.arrStartString = [];
    this.arrBodyString = [];
    this.arrEndString = [];
  }
  canavasHTMLBuilder() {
    this.html = "";
    for (let item of this.canvasJson) {
      if (item.type == "container") {

        if (item.columns.length == 0) {
          this.html = this.html + item.templates;
        }

        else {
          this.subString = item.templates.split('>');
          for (var i = 0; i < this.subString.length - 1; i++) {
            this.subString[i] += ">";
          }
          this.html = this.html + this.subString[0] + this.getChildHTMLTemplate(item).join("") + this.subString[1];
          this.templateArray = [];
        }
      }
      else {
        this.html = this.html + item.templates;
      }
    }
    return this.html;
  }

  getChildHTMLTemplate(item) {
    for (let child of item.columns) {
      if (child.type == "container") {
        if (child.columns.length == 0) {
          this.templateArray.push(child.templates);
        }
        else {
          this.subStringStart = child.templates.split('>');
          for (var i = 0; i < this.subStringStart.length - 1; i++) {
            this.subStringStart[i] += ">";
          }
          this.templateArray.push(this.subStringStart[0]);
          this.getChildHTMLTemplate(child);
          this.templateArray.push(this.subStringStart[1]);
        }
      }
      else {
        this.templateArray.push(child.templates);
      }
    }
    return this.templateArray;
  }
  downloadFile() {
    this.getHTMLCode();
    if (!this.filename) {
      this.filename = "MyFile";
    }
    var data = new Blob([this.generatedHtml], { type: 'html/plain;charset=utf-8' });
    FileSaver.saveAs(data, this.filename + '.html');
  }
  templateItem: any = {};
  sourceBuilderTools: any = [];
  public addTemplatetoJson(itemId: string, templateName: string): void {
    var attribute = [
      {
        "name": "style",
        "styles": {},
        "value": "padding:0px;margin:0px;color:#EEE;background:#3D6786;height:500px;"
      },
      {
        "name": "style",
        "styles": {},
        "value": ""
      },
      {
        "name": "title",
        "value": "",
        "displayName": "Title",
        "isEditable": true,
        "inputType": "text"
      },
      {
        "name": "name",
        "value": "",
        "displayName": "Name",
        "isEditable": true,
        "inputType": "text"
      },
      {
        "name": "id",
        "value": "",
        "displayName": "Id",
        "isEditable": true,
        "inputType": "text"
      },
      {
        "name": "aria-label",
        "displayName": "Aria-Label",
        "value": "",
        "isEditable": true,
        "inputType": "text"
      },
      {
        "name": "spellcheck",
        "value": "",
        "displayName": "SpellCheck",
        "attrValue": {
          "True": true,
          "False": false
        },
        "isSelectable": "true"
      },
      {
        "name": "contenteditable",
        "value": "",
        "displayName": "Editable",
        "attrValue": {
          "True": true,
          "False": false
        },
        "isSelectable": "true"
      },
      {
        "name": "role",
        "value:": "",
        "displayName": "Role",
        "isEditable": true,
        "inputType": "text"
      },
      {
        "name": "placeholder",
        "value": "",
        "displayName": "PlaceHolder",
        "isEditable": true,
        "inputType": "text"
      }
    ];
    if (templateName) {
      this.templateItem = {
        "name": templateName,
        "templates": this.canavasHTMLBuilder(),
        "attributes": attribute,
        "tag": "customTemplate",
        "columns": []
      };
      for (var i = 0; i < (this.sourceBuilderTools.length); i++) {
        if (this.sourceBuilderTools[i].key == "Templates") {
          this.sourceBuilderTools[i].items.push(this.templateItem);
        }
      }
      this.sidebarServiceService.saveSidebarJson(this.sourceBuilderTools).subscribe(result => {
      });
    }
  }

  dataSaveProject: any = {};
  alertMsg: string = "";
  alertFlag: boolean = false;

  //For Saving Project And Views In File System
  saveJSONFile() {
    if (this.saveProject == "") {
      console.log("Please provide a file name");
      this.dataSaveProject.fName = "AppBuilderDemoFile";
    }
    else {
      this.dataSaveProject.projectName = this.saveProject;
      this.dataSaveProject.fName = this.saveProject;
    }
    this.dataSaveProject.val = this.canvasJson;
    this.sidebarServiceService.saveProjectJson(this.dataSaveProject).subscribe(result => {
      this.alertMsg = result.msg;
      this.alertFlag = true;
      setTimeout(() => {
        this.alertFlag = false;
      }, 1500);
    });
    this.sidebarServiceService.getAllProjects().subscribe(result => {
      this.projectsArray = result;
    });
  }
  dataOpenProject: any = {};

  //For Open Existing Projects & Views
  openJSONFile() {
    this.dataOpenProject.fName = this.openProject;
    this.sidebarServiceService.openProjectJson(this.dataOpenProject).subscribe(result => {
    this.canvasJson = result;
    })
  }

  //For Deleting Existing Views
  public deleteFile() {
    this.sidebarServiceService.deleteProject(this.dataSaveProject).subscribe(result => {
      this.alertMsg = result.msg;
      this.alertFlag = true;
      setTimeout(() => {
        this.alertFlag = false;
        this.canvasJson = [];
      }, 1500);
    })
  }

  public saveTemplate(file) {
    this.sidebarServiceService.saveSidebarJson(file);
  }

  addToexternalCSSArray(value: string) {
    if (this.externalCSSArray.includes(value) == true) {
      console.log(value);
      var index = this.externalCSSArray.indexOf(value);
      if (index > -1) {
        this.externalCSSArray.splice(index, 1);
      }
    }
    else {
      this.externalCSSArray.push(value);
    }
  }
}