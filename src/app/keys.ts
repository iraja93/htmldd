import { Component, OnInit , Pipe,PipeTransform} from '@angular/core';

@Pipe({
	name: 'keys'
})

export class CustomPipeForKey implements OnInit , PipeTransform  {

  constructor()  { }

  ngOnInit() {
  }


 transform(value, args:string[]):any {
    let keys = [];
    for (let key in value) {
        keys.push({key: key, value: value[key]});
    }
    return keys;
}
   
  
}
