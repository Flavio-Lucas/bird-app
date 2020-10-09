import { Component, OnInit } from '@angular/core';
import { FooterState } from 'src/app/models/enums/footer-satate';
import { FooterService } from 'src/app/services/footer/footer.service';

@Component({
  selector: 'bird-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private readonly footerService: FooterService,
  ) {
    this.footerService.getCurrentSelectedFooter$().subscribe(footerState => {
      this.currentSelectedFooter = footerState;
    });
  }

  ngOnInit() {
  }

  //#region public properties
  /**
   * o menu do footer q está atualmente selecionado
   */
  public currentSelectedFooter: FooterState = FooterState.CATEGORIES;
  
  /**
   * os estados possiveis para o menu do footer
   */
  public footerState: typeof FooterState = FooterState;
  //#endregion


}
