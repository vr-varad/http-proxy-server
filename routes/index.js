const express = require('express')
const router = express.Router()
const axios = require('axios')
const url = require('url')
const apiCache = require('apicache') 


// Env variables
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

//initialize cache

let cache = apiCache.middleware


router.get('/',cache('2 minutes'),async (req,res)=>{
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME] : API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })
        const apiRes = await axios.get(`${API_BASE_URL}?${params}`)
        const data =   apiRes.data;
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;