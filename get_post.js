const axios = require('axios');
//      getting query string
async function get_person(){
    const config = {
        method: 'get',
        url: `https://hyposmartag.pipedrive.com/v1/persons/954?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1`,
        headers: { "Content-Type": `application/json` }
    }

    let res = await axios(config)

    console.log(res.data.data.id)

    let personId=res.data.data.id

    return personId

}

async function create_person(name,email,phone,phone_mobile,phone_work){
    let body={
        "name": name,
        "email": email,
        "phone": [
        {
            "label":"mobile",
            "value": phone_mobile
        },
        {
            "label":"work",
            "value": phone_work
        },        
        {
            "label":"phone",
            "value": phone
        }
        ]
      }
  
      const res= await axios({
        method: 'POST',
        baseURL: 'https://hyposmartag.pipedrive.com/v1/persons?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1',
    
        headers: {
            "Content-Type": "application/json",
        },
        data:body,
      });
      console.log("Person created with id: "+res.data.data.id)

      let personId=res.data.data.id

      console.log("rtuening id :",personId)
  
      return personId
  
    }

async function create_lead(lead_tittle,personId){
    let body={
        "title": lead_tittle,
        "person_id": personId
      }

    axios.post('https://hyposmartag.pipedrive.com/v1/leads?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1', body)
      .then(function (response) {
        console.log("Lead is successfully created with id : ",personId);
      })
      .catch(function (error) {
        console.log("error in inserting lead ");
      });    
}

// create_lead("new test lead abakus",1)

async function create_deal(deal_tittle,personId,additional_data){   
    let body={
        "title":deal_tittle,
        "person_id": personId,
        "stage_id":28,
        "ea15d3bd1de35f51470d6b2dbfa7edd6a4faac49":additional_data['Baufinanzierung fuer'],
        "940847656a27dbd08f17eccf3fa1be9d1149974f":additional_data['HK Gesamtkosten'],
        "27ccb78c46d0581584f0fa8871cd644d379d5257":additional_data['HK Eigenkapital'],
        "ac2fac98fc333d20ace33f56b9974c03008495c0":additional_data['HK Eigenleistung'],
        "2938266251f47ba7cff9ee3eb4660cc3c567bd72":additional_data['Finanzierungsobjekt vorhanden'],
        "d645c0b8f941f6eb49cb815095abdaaec44a1579":additional_data['Finanzierungsobjekt Strasse Hausnummer'],
        "5c920391d526f35de455a73a5cc0907a9781841d":additional_data['Finanzierungsobjekt PLZ'],
        "0c9b170f09acc8ac9626f7b9ca148915186fda85":additional_data['Beleihungswert'],
        "f21fc2b9dff071d92396b9fe54b4aa4119ce1cb2":additional_data['Finanzierungsobjekt Ort'],
        "76a83d41aa4974aa8be93c0b673bb23ded565ed4":additional_data['Finanzierungsbedarf'],
        "1f89ccfd74eba4ed07fe5a1a14a38bffc5903503":additional_data['mtl finanzielle belastung'],
        "614f340d44a2c16ad4c9349217baa1a0867a4272":additional_data['Hypotheken vorhanden'],
        "314d8efb0494571ac964b5d6db14f1f6575388d8":additional_data['Hypotheken Umfang'],
        "b2068aa9b83020f3eae633cff9c8ac69676f208f":additional_data['Art des Objektes'],
        "724b66c5cb8ea99de8785dcc05fe08d703a3eb34":additional_data['Nutzung des Objektes'],
        "d5b1ce19924a57dcfe69161eaa2c2948cc407b93":additional_data.Staatsangehoerigkeit,
        "82687226f673eea1c4f076f1944a8fdb05c4b2a8":additional_data.Familienstand,
        "d53baf481584660c5c2743c2307fda6678cd1d6e":additional_data['Lebenspartner ohne Einkünfte'],
        "4abd928a76ff6ad6852620ae266d241b859f132d":additional_data['Einkommen des Antragstellers'],
        "c33cf72bf95ebb3f14551469b06352fce20bb743":additional_data['Einkommen des Mitantragstellers'],
        "a1adf6378af961cd9816cba9979854bb48a4bc7f":additional_data['Berufsgruppe des Mitantragstellers'],
        "2c4fac1b1fa9dc73839863971d3f30fdf8caa19a":additional_data['Personen im Haushalt'],
        "33a863a5b39423f5160a2574907cac6848a723f4":additional_data['Kinder Anzahl'],
        "fd1bd46168d35cf332fc2ba3322c66f22f067146":additional_data['Geburtsjahr Kind 1'],
        "b50382fb6112c6b795d4601064c6903fc9928164":additional_data['Geburtsjahr Kind 2'],
        "90a5388f339535b6003b9f07fff662a46048fa86":additional_data['Geburtsjahr Kind 3'],
        "6cc87eea6a70a0ccb8c51188dadd7c6a95a17152":additional_data['Geburtsjahr Kind 4'],
        "3dcc4b239b397601c41424a542ae1f4676884db3":additional_data['Geburtsjahr Kind 5'],
        "75a2735772ecc4208b88c5a2ce85b7a1c5ad4fec":additional_data['Mieteinnahmen kalt'],
        "e4c2a41b3ff93b95db2b0f448f3662608549c927":additional_data.Einnahme1,
        "eedeba916ad90f6286368946d540df4b738082d5":additional_data.Einnahme2,
        "30799ce89bc978cc1701cc4653861cfaabe7cb9e":additional_data.Einnahme3,
        "afde83de3ce21b3808ef65945aa5fd126f85b955":additional_data.Einnahme4,
        "b15ae177d70745026b5d469b3957a4d71277c5c1":additional_data.Ausgabe1,
        "a2f7c5c9d77a58d580528c5453cc760994ff9739":additional_data.Ausgabe2,
        "67b11f115db8c592c3125354c7880a7285a9247d":additional_data.Ausgabe3,
        "47865f625edbea1cadd31fea9cb8c1673fc3bf52":additional_data.Ausgabe4,
        "fd35ef9d15f99155705339ad06aedd643c07abf3":additional_data['sonstige Posten1'],
        "7c8a38c25a24ba47a53fd814c76c9334be190f73":additional_data['sonstige Posten3'],
        "b273d747de6b7f853d082ff8050ee902530605d5":additional_data['sonstige Posten4'],
        "f12f977ea241ab6123be82985b6216d3d75bc7b0":additional_data['Anmerkungen Wuensche']
      }
      const res= await axios({
        method: 'POST',
        baseURL: 'https://hyposmartag.pipedrive.com/v1/deals?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1',
    
        headers: {
            "Content-Type": "application/json",
        },
        data:body,
      });
      console.log("deal created with id: "+res.data.data.id)

      let dealId=res.data.data.id

      console.log("rtuening id :",dealId)
  
      return dealId
  
}


async function create_note_inside_deal(content,dealId){
    let body={
        "content": content,
        "deal_id": dealId
      }

    axios.post('https://hyposmartag.pipedrive.com/v1/notes?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1', body)
      .then(function (response) {
        console.log("Lead is successfully created with id : ",dealId);
      })
      .catch(function (error) {
        console.log(error);
      });    
}


// create_note_inside_deal("new note",850)

//850
module.exports={create_deal,create_lead,create_person,create_note_inside_deal}
