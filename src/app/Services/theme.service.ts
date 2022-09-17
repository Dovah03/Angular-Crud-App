import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class themeService {

  constructor() {}

  public getCurrentTheme():boolean{
    let theme = localStorage.getItem('Theme');
    if(theme == 'dark'){return true};
    return false;
  }

  public setCurrentTheme(){
    let theme = localStorage.getItem('Theme');
    if(!theme){theme = 'light';localStorage.setItem('Theme',theme);}
    if(theme == "dark"){
      $('h5').css('color','#f0f0f0dc');
      $('.details-title').css('color','#FF3636');
      $('body').css('background-color','#25302a');
      $('.modal-content').css('background-color','#25302a');
      $('.field-Label').css('color','rgba(240, 240, 240, 0.863)');
      $('.dataTables_wrapper .dataTables_filter input').css('color','#ffff');


    }
    else if(theme == "light"){
      $('h5').css('color','#020701');
      $('.details-title').css('color','#FF3636');
      $('body').css('background-color','#ebecf1');
      $('.modal-content').css('background-color','#ffff');
      $('.field-Label').css('color','rgb(2, 7, 1)');


    }
    $('.card').attr('theme',theme);
    $('.main-panel').attr('theme',theme);
    $('.sidebar').attr('theme',theme);
    $('.panel-header').attr('theme',theme);
    $('a').attr('theme',theme);
    $('.form-group').attr('theme',theme);
    $('.body').css('color','#05070654');
  }
  public ChangeTheme(theme:string){
    if(theme == "dark"){
      $('h5').css('color','#f0f0f0dc');
      $('.details-title').css('color','#FF3636');
      $('body').css('background-color','#25302a');
      $('table.dataTable.row-border tbody td').css('background-color','#899790');
      $('.modal-content').css('background-color','#25302a');
      $('.field-Label').css('color','rgba(240, 240, 240, 0.863)');
      $('.dataTables_wrapper .dataTables_filter input').css('color','#ffff');


     // table.dataTable.row-border tbody td
    }
    else if(theme == "light"){
      $('h5').css('color','#020701');
      $('.details-title').css('color','#FF3636');
      $('body').css('background-color','#ebecf1');
      $('.modal-content').css('background-color','#ffff');
      $('.field-Label').css('color','rgb(2, 7, 1)');
      $('table.dataTable.row-border tbody td').css('background-color','#fff');
    }
    $('a').attr('theme',theme);
    $('.form-group').attr('theme',theme);
    $('.card').attr('theme',theme);
    $('.main-panel').attr('theme',theme);
    $('.sidebar').attr('theme',theme);
    $('.panel-header').attr('theme',theme);
    $('.body').css('color','#05070654');
    localStorage.setItem('Theme',theme);
  }
}
