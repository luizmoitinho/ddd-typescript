import dotenv from 'dotenv'
import {app} from './express'

dotenv.config()

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, ()=>{
   console.log(`server is listening on port ${port}`)
})

