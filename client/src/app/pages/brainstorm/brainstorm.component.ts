import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudData } from 'angular-tag-cloud-module';
import { WordResponse } from 'src/app/models/responses/wordresponse.model';
import { UserService } from 'src/app/services/user.service';
import { BrainstormService } from '../../services/brainstorm.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { BrainstormResponse } from 'src/app/models/responses/brainstormresponse.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { CreateDialogComponent } from 'src/app/components/create-dialog/create-dialog.component';
import { BrainstormRequest } from 'src/app/models/requests/brainstormrequest.model';

@Component({
  selector: 'app-brainstorm',
  templateUrl: './brainstorm.component.html',
  styleUrls: ['./brainstorm.component.css']
})
export class BrainstormComponent implements OnInit, OnDestroy {
  // Local Variables
  isUserAuthenticated: boolean = false;
  brainstormId: string = '';
  isHistoryLoading: boolean = true;
  isBrainstormLoading: boolean = false;

  // Brainstorm History Variables
  historyBrainstorms: BrainstormResponse[] = [];

  // Brainstorm Tab Variables
  data: CloudData[] = [];
  dataBackup: CloudData[] = [];
  maxWords: number = 0;
  brainstormTitle: string | undefined = undefined;
  brainstormCreator: string | undefined = undefined;
  websocketErrorMessage: string = '';
  isBrainstormIdSet: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private websocketService: WebsocketService,
    private brainstormService: BrainstormService
  ) { }

  async ngOnInit() {
    // Connect to Websocket
    await this.websocketService.connect();

    // Check if User is Authenticated
    if (this.userService.user) {
      this.userService.user.isAuthenticated.subscribe((isAuthenticated: boolean) => {
        this.isUserAuthenticated = isAuthenticated;
      });
    }

    // Load Brainstorm History if logged in
    if (this.isUserAuthenticated) this.brainstormService.getBrainstorms().subscribe((brainstorms: BrainstormResponse[]) => {
      this.historyBrainstorms = brainstorms
      this.isHistoryLoading = false;
    });

    // Load Brainstorm Data, if BrainstormId specified
    this.route.params.subscribe(async params => {
      this.brainstormId = params['id'];
      if (this.brainstormId) {
        this.isBrainstormLoading = true;
        this.isBrainstormIdSet = true;
        // Load Brainstorm Data
        this.brainstormService.getBrainstormById(this.brainstormId).subscribe((brainstorm: BrainstormResponse) => {
          this.loadBrainstorm(brainstorm)
          this.isBrainstormLoading = false;
        });

        // Join and Listen to Websocket
        await this.websocketService.joinGroup(this.brainstormId);
        this.websocketService.problems.subscribe((problem: string) => this.websocketErrorMessage = problem);
        this.websocketService.words.subscribe((word: WordResponse) => this.addWord(word));
      }
    });
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

  async onNewWord(word: string) {
    await this.websocketService.sendWord(this.brainstormId, word);
  }

  loadBrainstorm(brainstorm: BrainstormResponse) {
      // Load Brainstorm MetaData
      this.brainstormId = brainstorm.id;
      this.maxWords = brainstorm.maxWords;
      this.brainstormCreator = brainstorm.creator;
      this.brainstormTitle = brainstorm.title;

      // Load Brainstorm Words
      let wordBuffer: CloudData[] = []
      brainstorm.words.forEach((word: WordResponse) => {
        wordBuffer.push({
          text: word.value,
          weight: word.occurrence,
          color: word.color
        })
      })
      this.data = wordBuffer;
  }

  addWord(word: WordResponse) {
    const existingWord = this.data.find((cloudDataObj: CloudData) => cloudDataObj.text === word.value);
    // Check, if Word already exists in WordCloud
    if (existingWord) {
      // Resize Word if it already exists
      existingWord.weight++;
      this.data = [...this.data];
    } else {
      // Add new Word, if the word doesn't exist
      this.data = [...this.data, { 
          text: word.value, 
          weight: word.occurrence, 
          color: word.color
        }
      ];
      console.log(this.data);
    }
  }

  async onHistoryElementClick(id: string) {
    if (!this.brainstormId === undefined) {
      // Only leave, if user previously joined a group
      await this.websocketService.leaveGroup(this.brainstormId);
      await this.websocketService.disconnect();
    }
    this.router.navigate(['brainstorm', id]);
  }

  openCreateDialog() {
    // Open dialog and Inject Function with Context of this Component
    this.dialog.open(CreateDialogComponent, {
      data: {
        add: this.addBrainstorm.bind(this)
      }
    });
  }

  addBrainstorm(brainstorm: BrainstormRequest) {
    // Call API and add the created Brainstorm to the List and navigate to the new Brainstorm
    this.brainstormService.addBrainstorm(brainstorm).subscribe((brainstorm: BrainstormResponse) => {
        this.historyBrainstorms.unshift(brainstorm);
        this.router.navigate(['brainstorm', brainstorm.id]);
    });
  }

  openDeleteDialog(payload: any) {
    const { id, title } = payload;
    // Open dialog and Inject Function with Context of this Component
    this.dialog.open(DeleteDialogComponent, {
      data: {
        brainstormTitle: title,
        brainstormId: id,
        delete: this.deleteBrainstorm.bind(this)
      }
    });
  }

  deleteBrainstorm(id: string) {
    // Call API and delete Brainstorm from local List
    this.brainstormService.deleteBrainstorm(id).subscribe();
    this.historyBrainstorms = this.historyBrainstorms.filter((brainstorm: BrainstormResponse) => brainstorm.id !== id);
  }

  onToggleChange(active: boolean) {
      if (active) {
          // Load Cached Data with AI-Generated Colors (using deepcopy)
          this.data = JSON.parse(JSON.stringify(this.dataBackup));
      } else {
          // Cache Data with AI and Remove Colors
          this.dataBackup = JSON.parse(JSON.stringify(this.data));
          this.data = this.data.map((cloudData: CloudData) => {
              cloudData.color = ''
              return cloudData;
          });
      }
  }
}
