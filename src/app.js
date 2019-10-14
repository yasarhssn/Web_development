const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geourl=require('./utils/geourl')
const forecast=require('./utils/forecast')


const app=express()
//Define Paths For Express Config

const publicDirectorypath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//setup handlebars engine and view location of folders
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve

app.use(express.static(publicDirectorypath))


app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather App',
        name:'Yasar'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About',
        name:'Yasar'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'Help',
        message:'Any Help',
        name:'Yasar'
   })
})

app.get('/weather',(req,res)=>
{                     

    if(!req.query.address)
    {
        return res.send ({
            error:'You Must Provide an Address'
        })
    }
    geourl(req.query.address,(error,{latitude,longitude,location}={})=>
        {
            if(error)
            {
                return res.send({error})
            }

            forecast(latitude,longitude,(error,forecastData)=>
            {
                if(error)
                {
                    return res.send({error})
                }
                res.send({

                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            
            
            })

        })

})

app.get('/help/*',(req,res)=>
{
    res.render('404',{
        title:'404',
        name:'Yasar',
        errorMessage:'Help Article not Found'
    })
})

app.get('*',(req,res)=>
{
    res.render('404',{
        title:'404',
        name:'Yasar',
        errorMessage:'Page Not Found'
    })
})

app.listen(3000,()=>
{
    console.log('server is started')
})
