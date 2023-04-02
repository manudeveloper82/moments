import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormControlDirective, FormGroupDirective } from '@angular/forms';

import { MomentService } from 'src/app/services/moment.service';

import {Moment} from 'src/app/Moment'
import { Coment } from 'src/app/Coments';

import { environment } from 'src/environments/environment';

import {faTimes, faEdit} from '@fortawesome/free-solid-svg-icons'
import { MessagesService } from 'src/app/services/messages.service';
import { ComentService } from 'src/app/services/coment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']

})
export class MomentComponent implements OnInit{
  moment?: Moment
  baseApiUrl = environment.baseApiUrl
  comments: any = [];

  faTimes = faTimes
  faEdit = faEdit

  comentForm!: FormGroup

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private comentService: ComentService
  ){}

  ngOnInit():void {
    const id = Number (this.route.snapshot.paramMap.get("id"))

    this.momentService
    .getMoment(id)
    .subscribe((item) => {
      this.moment = item.data
      this.comments = this.moment.coments || []
      console.log(this.moment)
    })

    this.comentForm = new FormGroup({
      text:new FormControl('',[Validators.required,]),
      username:new FormControl('',[Validators.required,]),
    })
  }

  get text() {
    return this.comentForm.get('text')!
  }

  get username() {
    return this.comentForm.get('username')!
  }

  async removeHandler(id:number) {
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add("Momento excluído com sucesso!")

    this.router.navigate(['/'])
  }
async onSubmit(formDirective: FormGroupDirective){

  if(this.comentForm.invalid) {
    return
  }

  const data: Coment = this.comentForm.value

  data.momentId = `${this.moment!.id}`;

  await this.comentService
  .createComent(data)
  .subscribe((coment) => this.comments.push(coment.data))

}

}
