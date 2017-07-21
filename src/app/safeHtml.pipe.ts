import { Component, OnInit , Pipe,PipeTransform} from '@angular/core';

import { DomSanitizer, SafeResourceUrl, SafeUrl ,SafeHtml,SafeScript,SafeStyle } from '@angular/platform-browser';


@Pipe({
	name: 'safeHtml'
})
export class CustomPipe implements OnInit , PipeTransform  {

  constructor(private sanitizer: DomSanitizer)  { }

  ngOnInit() {
  }


transform(value) {
    //console.log(this.sanitizer.bypassSecurityTrustHtml(value))
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
   
  
}




