import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shortNames"
})
export class ShortNamesPipe implements PipeTransform {
  transform(string) {
    let result = string;

    if (typeof string === "string" && string.length > 50) {
      result = string.slice(0, 20) + "...";
    }

    return result;
  }
}
