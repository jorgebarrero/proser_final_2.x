import { Component, OnInit, OnDestroy } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import { AlertService } from "shared/services";
import { EnvService } from "shared/services/helpers/env.service";

import { UserSelectionModel } from "shared/models";
import { UserSelectionService } from "shared/services/crud/system/user-selection.service";
import { CallsDetailService } from "projects/reports/src/app/shared/services/reports/calls/reports-detail-calls.service";
import { CallsDetailModel } from "projects/reports/src/app/shared/models/reports/calls/CallsDetail.model";

@Component({
  selector: "app-reports-detail-report-audio",
  templateUrl: "./detail-report-audio.component.html",
  styleUrls: ["./detail-report-audio.component.scss"]
})
export class DetailReportAudioComponent implements OnInit, OnDestroy {
  alertMessage = new AlertModel();
  recordSelection;
  show = false;
  status = true;
  recording = false;

  // Material Style Basic Audio Player Title and Audio URL
  msbapTitle = "";
  msbapAudioUrl = "";

  msbapDisplayTitle = false;
  msbapDisplayVolumeControls = true;

  constructor(
    private callsDetailService: CallsDetailService,
    private alertService: AlertService,
    private userSelectionService: UserSelectionService,
    private env: EnvService
  ) {}

  ngOnInit() {
    this.recordSelection = JSON.parse(localStorage.getItem("selected_row"));

    this.recording = this.recordSelection.record === null ? false : true;

    this.status =
      this.recordSelection.call_status === "FAILED" ||
      this.recordSelection.call_status === "NO ANSWER"
        ? false
        : true;

    this.msbapAudioUrl = this.urlComposer("mp3");
    this.getRecording();
  }

  ngOnDestroy() {
    this.deleteRecording();
  }

  isFirstPlaying() {
    return false;
  }
  isLastPlaying() {
    return true;
  }

  playAudio() {
    let audio = new Audio();
    audio.src =
      "http://localhost:3151/audio/q-4000-2122095120-20190904-070825-1567595305.20723.gsm.mp3";
    audio.load();
    audio.play();
  }

  getRecording() {
    let selected = JSON.parse(localStorage.getItem("selected_row"));

    let record = selected;
    this.callsDetailService.getRecording(record).subscribe(
      res => {
        console.error("Result", res);
        this.show = true;
        if (res === null) {
          this.show = true;
        }
        this.alertMessage = new AlertModel();
      },
      error => {
        console.error("Error", error);
        this.show = false;
        this.alertService.error(error.status);
        this.alertMessage.alertTitle = "Error del servidor";
        this.alertMessage.alertText = error.statusText;
        this.alertMessage.alertShow = true;
        this.alertMessage.alertClass =
          "alert alert-danger alert-dismissible fade show";
      }
    );
  }

  deleteRecording() {
    let selected = JSON.parse(localStorage.getItem("selected_row"));
    console.error("deleteRecording", selected);

    let record = selected;
    this.callsDetailService.deleteRecording(record).subscribe(
      res => {
        console.error("Result", res);
        this.show = true;
        if (res === null) {
          this.show = true;
        }

        this.alertMessage = new AlertModel();
      },
      error => {
        console.error("Error", error);
        this.show = false;
        this.alertService.error(error.status);
        this.alertMessage.alertTitle = "Error del servidor";
        this.alertMessage.alertText = error.statusText;
        this.alertMessage.alertShow = true;
        this.alertMessage.alertClass =
          "alert alert-danger alert-dismissible fade show";
      }
    );
  }

  urlComposer(ext?) {
    const recordSelection = JSON.parse(localStorage.getItem("selected_row"));

    const url = recordSelection.record;
    const route = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = route.substring(route.lastIndexOf(".") + 1);
    let fileName = `${this.env.loopbackApiUrl}/audio/${route}`;

    if (ext) {
      fileName = fileName + "." + ext;
    }
    console.error("fileName", fileName);

    return fileName;
  }

  downloadFile(ext) {
    const recordSelection = JSON.parse(localStorage.getItem("selected_row"));
    const url = recordSelection.record;
    const route = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = route.substring(route.lastIndexOf(".") + 1);

    const src = recordSelection.call_source;
    const dst = recordSelection.call_destiny;

    let fileName = `${recordSelection.call_type}-${recordSelection.agent_name}-${recordSelection.start_date}-${recordSelection.start_time}-${src}-${dst}.${fileExtension}`;

    if (ext) {
      fileName = fileName + "." + ext;
    }

    this.callsDetailService.downloadFile(route, fileName).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (fileName) downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      error => {
        console.error("Error", error);
        this.show = false;
        this.alertService.error(error.status);
        this.alertMessage.alertTitle = "Error del servidor";
        this.alertMessage.alertText = error.statusText;
        this.alertMessage.alertShow = true;
        this.alertMessage.alertClass =
          "alert alert-danger alert-dismissible fade show";
      }
    );
  }
}
