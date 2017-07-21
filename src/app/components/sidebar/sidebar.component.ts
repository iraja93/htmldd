import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import {SidebarServiceService} from './services/sidebar-service.service';

@Component({
  selector: 'sidebar-area',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 

  constructor(private sidebarServiceService : SidebarServiceService) { }
 

 transferData1: Object ={id:2,msg:"Hell"}
sourceList: any = [];

transferData: any=[];

sideBarHtmlItems:any=[];
 

  ngOnInit() {
  

   //this.sourceBuilderTools= this.sidebarServiceService.sharedSideBarData;



   this.sidebarServiceService.sideBarJson().subscribe(result=>{

      //console.log(result);
      this.sideBarHtmlItems=result;
      //this.transferData=result;
     
    });



   //console.log("Hello,There");

   //console.log(this.sourceBuilderTools);


    
  };
itemSelected:any={};
  doSomething(model){
    this.itemSelected=model;
    this.itemSelected.status=false;
    //console.log(model);
  }
}