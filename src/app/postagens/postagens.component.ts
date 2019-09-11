import { Component, OnInit } from '@angular/core';
import { Publication } from './../interfaces/publication';
import { AppService } from './../app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})

export class PostagensComponent implements OnInit {
  public publication: Publication = {} as Publication;
  public isMyProfile = true;
  public showSpinner = false;
  public userPublications: Publication[] = [];
  public numPublications: number;

  constructor(private appservice: AppService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.publication.professionalID = '5d719baf5c15490004e1f21e';
    this.publication.author = 'aaaaaaa';
    console.log(`aaaa`)
    this.appservice.listrarPostagens('5d719baf5c15490004e1f21e')
    .subscribe(publications => {
      publications.forEach(publication => {
        publication.publicationDate = this.formatDate(publication.publicationDate)
        this.userPublications.push(publication);
      });
      this.numPublications = this.userPublications.length;
    }, err => {
      this.snackbar.open('Ocorreu um erro ao listar as publicações!', 'Dismiss', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      console.log(err);
    });
  }

  onSubmit() {
    this.showSpinner = true;
    console.log(this.publication)
    this.appservice.cadastrarPublication(this.publication)
      .subscribe(res => {
        console.log(res);
        this.snackbar.open('Publicação feita com sucesso!', 'Dismiss', {
          duration: 4000,
          panelClass: ['success-snackbar']
        });
        res.publicationDate = this.formatDate(res.publicationDate)
        this.showSpinner = false;
        this.userPublications.unshift(res);
      }, err => {
        console.log(err);
        this.snackbar.open('Ocorreu um erro ao publicar!', 'Dismiss', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
        this.showSpinner = false;
      });
    this.publication.text = '';
  }

  formatDate(date: string) {
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    let dayMonthYearSTR = date.substr(0, 10);
    const dayMonthYearNBR = new Date(dayMonthYearSTR.replace(/-/g, '\/'));
    dayMonthYearSTR =  ('0' + dayMonthYearNBR.getDate()).substr(-2) + '/'
    + ('0' + (dayMonthYearNBR.getMonth() + 1)).substr(-2) + '/' + dayMonthYearNBR.getFullYear();

    if (minutes < 10 || hour < 10) {
      if (hour < 10 && minutes < 10) {
        date = (`0` + `${hour}` + ':' + `0` + `${minutes}` + ` - ` + dayMonthYearSTR);
      } else if (minutes < 10) {
        date = (`${hour}` + ':' + `0` + `${minutes}` + ` - ` + dayMonthYearSTR);
      } else {
        date = (`0` + `${hour}` + ':' + `0` + `${minutes}` + ` - ` + dayMonthYearSTR);
      }
    } else {
      date = (`${hour}` + ':' + `${minutes}` + ` - ` + dayMonthYearSTR);
    }
    return date;
  }

}
