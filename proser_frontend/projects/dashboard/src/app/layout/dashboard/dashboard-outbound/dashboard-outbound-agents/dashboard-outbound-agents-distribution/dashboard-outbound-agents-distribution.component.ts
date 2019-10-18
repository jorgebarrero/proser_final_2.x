import { Component, OnInit, Input } from '@angular/core';
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard-outbound-agents-distribution',
  templateUrl: './dashboard-outbound-agents-distribution.component.html',
  styleUrls: ['./dashboard-outbound-agents-distribution.component.scss']
})
export class DashboardOutboundAgentsDistributionComponent implements OnInit {

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
