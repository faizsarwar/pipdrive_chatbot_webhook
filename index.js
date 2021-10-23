const {Suggestions} = require('actions-on-google');
const {Suggestion} = require("dialogflow-fulfillment");
const {WebhookClient,Image}=require("dialogflow-fulfillment");
const { request, response } = require("express");
const express=require("express");
const app=express();
const get_post=require('./get_post')
const fs = require('fs')



app.get("/",(req,res)=>{
    res.sendFile('index.html',{root:__dirname});



})


app.post("/webhook",express.json(),(request,response)=>{          //fulfillment mai bhi url mai /webhook lagana huga 
    const agent=new WebhookClient({request:request,response:response});
    
    var obj={
        product:[]
    }

    function Default_Welcome_Intent(agent){

        //clearing both the files in the start
        fs.writeFile('./product.txt', '', err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })
          
          fs.writeFile('./notes.txt', '', err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })
          


        agent.add('Hallo, ich bin der Virtuelle Assistent von Kredithaus24 wie kann ich Ihnen weiterhelfen?')  //
    }

    function customer_selected_product(agent){
        
        let product=agent.parameters["product"]
        console.log(product)
        fs.writeFile('./product.txt', product, err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })
          

        agent.add(`Sie haben also Interesse an einer ${product}
        Haben Sie konkrete Fragen zu diesem Bereich oder möchten Sie, dass Sie einer unserer Berater anruft.`)
      
    }

    function Customers_more_questions(agent){
        let product=agent.parameters['product']
        // obj.product=[].push(product)
        fs.appendFile('./product.txt',"," + product, err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })
        console.log(obj)
        agent.add(`Das ist klasse! Wir würden uns freuen Sie bei dem Weg ins Eigenheim unterstützen zu können.  
        Um unser Beratungsgespräch besser vorbereiten zu können, wären ein paar Eckdaten sehr hilfreich.
       Wenn Sie bei einem Punkt nicht weiterwissen, schreiben Sie einfach einen ---- in die Zeile.`)
    }


    async function customer_wants_to_get_called(agent){
        let first_name=agent.parameters['person'].name
        let last_name=agent.parameters['last-name']
        let name=first_name+ ' '+ last_name
        let email=agent.parameters['email']
        let phone_number=agent.parameters['phone-number']
        let address=agent.parameters['address']
        let message=agent.parameters['any']

        let personID=await get_post.create_person(name,email,phone_number,"","")
        let Lead_name=name +" lead";
        await get_post.create_lead(Lead_name,personID)
        var dealID
        fs.readFile('./product.txt', 'utf8' , async(err, data) => {
            let deal_name=name+ " "+data
            console.log(deal_name)
            dealID=await get_post.create_deal(deal_name,personID)
            // return dealID

        })

        fs.readFile('./notes.txt', 'utf8' ,async (err, data) => {
            
            await get_post.create_note_inside_deal(data,dealID)
            return data

        })

        agent.add(`Vielen Dank für das Übermitteln Ihrer Kontaktdaten, einer unserer Berater wird sich in kürze bei Ihnen melden.`)
    }

    function customer_interested_in_property(agent){
        let plot_land=agent.parameters['unit-length1']
        let living_space=agent.parameters['unit-length']
        let capital_required=agent.parameters['unit-currency']
        let equity=agent.parameters['any']

        let additional_data=`Grundstück:${plot_land}\n  Wohnraum:${living_space}\n  Kapitalbedarf:${capital_required}\n  
        Eigenkapital:${equity}`

        fs.writeFile('./notes.txt', additional_data, err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })
          
    }


    let intentMap= new Map();
    intentMap.set("Default Welcome Intent",Default_Welcome_Intent);    //ju name intent ka dailog flow ai huga whi dena hai ,ju function call krwana hai wo
    intentMap.set("Customer_ask_for_something",customer_selected_product);
    intentMap.set("Customers_more_questions",Customers_more_questions);
    intentMap.set("customer_wants_to_get_called",customer_wants_to_get_called);
    intentMap.set("customer_interested_in_property",customer_interested_in_property);

    agent.handleRequest(intentMap)
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("server is up on 4000");
})
