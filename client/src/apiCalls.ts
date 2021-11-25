import axios from 'axios'

export async function getHello() : Promise<any> {
    try{
        const res = await axios.get('http://localhost:5000/')
        return res.data
        
    } catch (error){
        console.log(error);
    }
}