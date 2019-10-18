import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arrayNames"
})
export class ArrayNamesPipe implements PipeTransform {
  transform(matrix) {
    let result = matrix;

    if (Array.isArray(matrix)) {

      
      let temp = matrix.map(x => {
        return " " + x.name;
      });
      result = temp;
    } else {
      result = matrix;
    }
    return result;
  }
}
