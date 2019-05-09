import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data/data'
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'chatpage'
})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  chatusername:string="";
  chats:any=[];
  chatPayload:any=[];
  message:any="";
  card_header:any="";
  @ViewChild("content") content: any;
  questionsdata:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DataProvider) {
    let params=navParams.get('name');
    console.log("params",params)
      if(params)
      this.chatusername=params.charAt(0).toUpperCase()+params.substring(1);
      else
      this.chatusername="TestUser";
      this.db.loadData().then((data:any)=>{
        this.questionsdata=data;
      });
     
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.chats.push({
      message:`Hi `+this.chatusername+` .I am here to help you.Ask me some questions on either Dealer or Car`,
      sender:'chatbot'
    })
    
    console.log("Questions",this.questionsdata);
    this.content.scrollToBottom(300); 
  }
Checked(val)
{
  alert("Checked"+val);
}

  addChat()
  {
        if(this.message && this.message!="")
        {
          console.log(this.message);
          this.chatPayload.push({
            message:this.message,
            sender:this.chatusername,
            //time:new Date().getTime()
          })
          this.content.scrollToBottom(300); 
            this.chats.push({
              message:this.message,
              sender:this.chatusername
            })
      
           if(this.questionsdata.length>0)
           {
             let flag=false;
              this.questionsdata.forEach(element => {
                      if(this.message.toLowerCase().indexOf(element.keyword.toLowerCase())>=0)
                      {
                        flag=true;
                        this.chats.push({
                          message:element.question,
                          sender:'chatbot'
                        })
                      }
              });
              if(!flag)
              this.chats.push({
                message:this.message+' Is out of our context.Please type for Dealer or Car',
                sender:'chatbot'
              })
           }
           else
           {
            this.chats.push({
              message:this.message+' Is out of our context.Please type for Dealer or Car',
              sender:'chatbot'
            })
           }
           
      
            this.message="";
          }
      
        
  }
  isChatBot(sender)
  {
    return sender=='chatbot';
  }


}
