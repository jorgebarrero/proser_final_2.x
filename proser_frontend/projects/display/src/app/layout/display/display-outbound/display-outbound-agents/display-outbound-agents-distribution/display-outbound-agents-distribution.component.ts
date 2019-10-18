import { Component, OnInit, Input } from '@angular/core';
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-display-outbound-agents-distribution',
  templateUrl: './display-outbound-agents-distribution.component.html',
  styleUrls: ['./display-outbound-agents-distribution.component.scss']
})
export class DisplayOutboundAgentsDistributionComponent implements OnInit {

  @Input() userSelection;
  @Input()  rows;

  faUser=faUser;

  
   constructor() { }
  
   ngOnInit() {
    
   }


 getColor(color) {
  return color;
}


getValues(data) {
return data
.map(x => {
return x.value;
});
}


getLabels(data) {
return data
.map(x => {
return x.name;
});
}

getTotal(data ) {
return data
.map(x => {
return x.value;
})
.reduce( (x, y) => {
return x + y;
});
}


mergeColor( array1, colors) {
const result = array1;

const merged =
array1
.map((x,  index) => {
return  [colors[index]];
});

}

  
  }
