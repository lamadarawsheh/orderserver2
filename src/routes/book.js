const express = require('express')
const request = require('request')
const log = require('../middleware/log')
const router = express.Router()
// check book 
const checkBooks = (id)=>{
 
    return new Promise((resolve, reject)=>{
        const url = 'http://192.168.56.101:3000/books/info/'+id
        request({url, json:true}, (error, res, body)=>{
            if(error){
                console.log('check')
                return reject(error)

            } else if(res.statusCode ==404){
                console.log('check2')
                return reject("no book like this ")
            }  
            const count = body.numberinstock
            if(count<=0){
                 return reject("This item is out of stock")
            }
            console.log('hey')
            return resolve({msg:"available", count})

        })
    })
}
//buy book
const buyBook = (id,count)=>{
    console.log('buy')
    return new Promise((resolve, reject)=>{
        const decUrl = 'http://192.168.56.101:3000/books/'+id
        request.patch(
            decUrl,
            {json:{numberinstock: count-1}},
            (error, res)=>{ 
                if(error){
                    return reject(error)
                }else if(res.statusCode == 200){
                    return resolve("item purchased successfully")
                            }
                        })  
    }) 
}
//purchase a book

router.get('/books/purchase/:id', log, async(req, res)=>{
    try{
        const id = req.params.id
        const checked = await checkBooks(id)
        console.log(checked)
        const buy = await buyBook(id, checked.count)
        console.log(buy)
        res.status(200).send(buy)
    } catch(error){
      res.status(404).send(error)
    }
})

module.exports = router