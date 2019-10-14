const request=require('request')


const forecast=(latitude,longititude,callback)=>{


    const url='https://api.darksky.net/forecast/3afb9f6b674e362170cc229a18ebb6f2/'+latitude+','+longititude
     

    request({url,json:true},(error,{body})=> //using destructuring here
    {
        if(error)
        {
            callback('Unable to connect with Weather API',undefined)
        }
        else if(body.error)
       {
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary +' It is currently '+ body.currently.temperature + 'degrees out There is a ' + body.currently.precipProbability+' % chance of rain')
        }

    })
}

module.exports=forecast

