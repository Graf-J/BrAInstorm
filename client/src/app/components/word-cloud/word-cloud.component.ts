import { Component, Input } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent {
  @Input() data: CloudData[] = []

  options: CloudOptions = {
    width: 0.98,
    height: 450,
    overflow: true,
    zoomOnHover: {
      scale: 1.3,
      transitionTime: 0.3,
      delay: 0.05
    },
    realignOnResize: true
  };
}
