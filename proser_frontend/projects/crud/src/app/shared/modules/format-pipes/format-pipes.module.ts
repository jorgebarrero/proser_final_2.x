import { ArrayNamesPipe } from "projects/crud/src/app/shared/pipes";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ArrayNamesPipe],
  imports: [CommonModule],
  exports: [ArrayNamesPipe]
})
export class FormatPipesModule {}
