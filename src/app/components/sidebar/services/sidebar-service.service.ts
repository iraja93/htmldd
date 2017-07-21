import { Injectable,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class SidebarServiceService implements OnInit {

  constructor(private http: Http) {


    //console.log("Hey, There from Sidebar Service");
    this.sideBarJson().subscribe(result=>{

      //console.log(result);
      this.sharedSideBarData=result;
      //this.transferData=result;
     
    });
    

    //this.sharedSideBarData=this.sideBarJson();

    //console.log(this.sharedSideBarData);
   }

  ngOnInit()
  {
      //this.getSideBarData(); 
  }






  sharedSideBarData:any=[];
  public sideBarJson(){
    return this.http.get('./assets/json/sideBar.json')
      .map(res => res.json());
  }


  public getAllProjects(){
    return this.http.get('/api/getAllProjects')
      .map(res => res.json());
  }



  /*public appendTemplates(customTemplate){
    for(var i=0;i< (this.sharedSideBarData.length); i++ ){
      
      if(this.sharedSideBarData[i].key == "Templates") {
        this.sharedSideBarData[i].items.push(customTemplate);
        
}

}
this.saveProjectJson(this.sharedSideBarData);
  }
*/
public saveProjectJson(jsonObj)
{

  console.log("Hey,There from Sidebar Component TS File");
  
return this.http
    .post('/api/saveProject',jsonObj)
      .map(data => data.json(), error => {
          console.log("Failed");
      });

      
}


public saveSidebarJson(sidebarJSON)
{
return  this.http.post('/api/saveSidebarJSON',sidebarJSON)
      .map(data => {
            //alert('ok');

			console.log(data)
      }, error => {
          console.log("Failed");
      });

}

public openProjectJson(openJSONFile){

  return this.http.post('/api/openProject',openJSONFile).map(res => res.json(), error=>{
    console.log("Failed");
  })

}

public deleteProject(fileName){
  
  return this.http.post('/api/deleteFile',fileName).map(res=>res.json(),error =>{
    console.log("From Delete");
  console.log(fileName);
    console.log("Failed");
  })
}




}
