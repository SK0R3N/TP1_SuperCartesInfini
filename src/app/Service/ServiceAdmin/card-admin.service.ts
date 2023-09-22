import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from 'src/app/model/Card';

const domain = "https://localhost:7219/";

@Injectable({
  providedIn: 'root'
})
export class CardAdminService {

  Cards : Card[] = []

  constructor(public http : HttpClient) { }

  async GetCards() : Promise<Card[]> {
    this.Cards = [];
    let x = await lastValueFrom(this.http.get<Card[]>(domain + "Admin/Cards/Index" ))
    console.log(x);
    this.Cards = x;
    return x;
  }

  async create(card : Card): Promise<void>
  {
    console.log(card)
    let x = await lastValueFrom(this.http.post<Card>(domain + "Admin/Cards/Create", card));
    console.log(x);
    this.Cards.push(x);
  }

  async edit(card : Card): Promise<void>
  {
    console.log(card)
    let x = await lastValueFrom(this.http.post<Card>("https://localhost:7219/Admin/Cards/Edit/" + card.id, card))
    console.log(x);
    this.GetCards();

  }
  async delete(id : Number): Promise<void>
  {
    let x = await lastValueFrom(this.http.delete<any>(domain + "Admin/Cards/Delete/" +  id));
    console.log(x);
    for(let i = this.Cards.length - 1; i>= 0; i--){
      if(this.Cards[i].id == id){
        this.Cards.splice(i,1);
      }
    }
  }
}
