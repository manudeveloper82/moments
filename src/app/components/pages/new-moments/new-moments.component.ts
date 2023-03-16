import { Component } from '@angular/core'


import { Router } from '@angular/router'


import { MomentService } from 'src/app/services/moment.service'
import { MessagesComponent } from '../../messages/messages.component'
import { MessagesService } from 'src/app/services/messages.service'
import { Moment } from 'src/app/Moment'

@Component({
  selector: 'app-new-moments',
  templateUrl: './new-moments.component.html',
  styleUrls: ['./new-moments.component.css']
})
export class NewMomentsComponent {
  btnText = "Compartilhar!"

  constructor (
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
    ) {}

  async creatHandler(moment: Moment){
    const formData = new FormData()

    formData.append("title", moment.title)
    formData.append("description", moment.description)

    if (moment.image) {
      formData.append('image', moment.image)
    }
await this.momentService.createMoment(formData).subscribe()

this.messagesService.add('Momento adicionado com sucesso!')

this.router.navigate(['/'])

  }

}
