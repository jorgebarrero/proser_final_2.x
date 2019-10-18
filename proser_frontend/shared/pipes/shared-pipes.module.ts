import { ShortNamesPipe } from "./shortNames.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SecondsTimePipe } from "./seconds-time.pipe";
import { Sec2ttimePipe } from "./sec2ttime.pipe";
import { WeekDayPipe } from "./week-day.pipe";
import { ThousandPipe } from "./thousand.pipe";
import { ArrayNamesPipe } from "./arrayNames.pipe";

ArrayNamesPipe;

@NgModule({
  imports: [CommonModule],
  declarations: [
    SecondsTimePipe,
    Sec2ttimePipe,
    WeekDayPipe,
    ThousandPipe,
    ShortNamesPipe,
    ArrayNamesPipe
  ],
  exports: [
    SecondsTimePipe,
    Sec2ttimePipe,
    WeekDayPipe,
    ThousandPipe,
    ShortNamesPipe,
    ArrayNamesPipe
  ]
})
export class SharedPipesModule {}
