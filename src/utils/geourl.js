 const request=require('request')

const geourl=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWFzYXJoc3NuIiwiYSI6ImNrMTdtbnVodTFkazIzbnBmOWFvMTNma28ifQ.89mowNdT5itcYu3gccyx2g&limit=1'
  request({url,json:true},(error,{body})=>{
      if(error)
      {
          callback('Unable to connect with Weather API',undefined)
      }
      else if(body.features.length==0)    
      {
          callback('Unable to find location',undefined)
      }
      else{

        callback(undefined,{
    latitude:body.features[0].center[1],
    longitude:body.features[0].center[0],
    location:body.features[0].place_name
      })
    }
  })
}


module.exports=geourl