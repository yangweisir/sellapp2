import axios from 'axios'






let req=axios.create({
    baseURL:'http://localhost:3000',
    timeout:10000
})

export function getSeller(){
    return req.get('/api/seller')
}

export function getCommodity(){
    return req.get('/api/goods')
}
export function getEvaluate(){
    return req.get('/api/ratings')
}
