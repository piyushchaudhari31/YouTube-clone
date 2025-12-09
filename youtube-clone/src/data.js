export const API_KEY = "AIzaSyBktQo90Fm_e8OlyuR1yVVMD1jwEXK0U38"

export const value_converter = (value)=>{
    if(value>=100000){
        return Math.floor(value/1000000)+"M"
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"k"
    }
    else{
        return value
    }
}