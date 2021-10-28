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

async function create_deal(deal_tittle,personId){   
    let body={
        "title":deal_tittle,
        "person_id": personId,
        "stage_id":28
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
