import { Component, OnInit, Input } from '@angular/core';
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard-inbound-agents-distribution',
  templateUrl: './dashboard-inbound-agents-distribution.component.html',
  styleUrls: ['./dashboard-inbound-agents-distribution.component.scss']
})
export class DashboardInboundAgentsDistributionComponent implements OnInit {

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
