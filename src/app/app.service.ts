import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professional } from './interfaces/professional';
import { Publication } from './interfaces/publication';
import { interestTopic } from './interfaces/interest-topic';
import { UserTopics } from './shared/interest-topics/interest-topics.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  cadastrarProfessional(professional: Professional): Observable<Professional> {
    const url = `${environment.dssmApiUrl}/signUp`;
    return this.http.post<Professional>(url,professional);
  }

  cadastrarPublication(publication: Publication): Observable<Publication> {
    const url = `${environment.dssmApiUrl}/publicate`;
    return this.http.post<Publication>(url,publication);
  }

  listrarPostagens(userId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/retrievePublicationsList/${userId}`;
    return this.http.get<Publication>(url);
  }

  retornarDadosUsuario(userId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/retrieveProfessionalData/${userId}`;
    return this.http.get<Professional>(url);
  }

  searchbar(searchitem): Observable<any>{
    const url = `${environment.dssmApiUrl}/search/${searchitem}`;
    return this.http.get(url);
  }

  login(login: Professional): Observable<any> {
    const url = `${environment.dssmApiUrl}/login`;
    return this.http.post<Professional>(url, login);
  }

  getInterestTopics(): Observable<any> {
    const url = `${environment.dssmApiUrl}/getInterestTopics`;
    return this.http.get(url);
  }

  getProfessionalTopics(userId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/getProfessionalInterestTopics/${userId}`;
    return this.http.get(url);
  }

  updateProfessionalInterestTopics(topics: UserTopics[]): Observable<any> {
    const url = `${environment.dssmApiUrl}/setProfessionalInterestTopics`;
    return this.http.post<UserTopics>(url, topics);
  }

  deletaPublication(publicationId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/deletePublication/${publicationId}`;
    return this.http.delete<Publication>(url);
  }

  updateProfessional(professional): Observable<any> {
    const url = `${environment.dssmApiUrl}/updateProfile`;
    return this.http.put(url, professional);
  }

  recommend(myId: string, profileId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/recommend`;
    return this.http.post(url, {recommenderID: myId, recommendedID: profileId});
  }

  statusRecommendation(myId: string, profileId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/getRecommendationStatus/${myId}/${profileId}`;
    return this.http.get(url);
  }

  deleteRecommendation(myId: string, profileId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/deleteRecommendation/${myId}/${profileId}`;
    return this.http.delete(url);
  }

  getProfessionalsWhoRecommended(professionalID: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/getProfessionalsWhoRecommended/${professionalID}`;
    return this.http.get(url);
  }

  likePublication(professionalId: string, publicationId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/reactToPublication`;
    return this.http.post(url, {professionalID: professionalId, publicationID: publicationId});
  }

  dislikePublication(professionalId: string, publicationId: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/unreactToPublication/${professionalId}/${publicationId}`;
    return this.http.delete(url);
  }

  getProfessionalsWhoReactedToPublication(publicationID: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/getProfessionalsWhoReactedToPublication/${publicationID}`;
    return this.http.get(url);
  }

  getStatusPublication(professionalID: string, publicationID: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/getPublicationStatus/${professionalID}/${publicationID}`;
    return this.http.get(url);
  }

  getFeedPublications(professionalID: string): Observable<any> {
    const url = `${environment.dssmApiUrl}/retrieveFeedPublicationsList/${professionalID}`;
    return this.http.get(url);
  }
}
