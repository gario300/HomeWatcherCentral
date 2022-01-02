class Validator{
  constructor(){
  }

  vStringAlpha(key: string, value:string){
    if(!/^[A-Za-z]+$/.test(value)){
      return {
        status: false,
        message: `${key} no puede tener caracteres especiales`
      }
    }
    return{
      status: true
    }
  }

  vNotVoid(key: string , value: string){
    if(value == '' || value.length == 0){
      return {
        status: false,
        message: `${key} no puede ser un valor vacio`
      }
    }
    return {
      status: true
    }
  }

  vEmail(value:string){
     if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
        return{ 
          status: true
        }
     }

    return{
      status: false,
      message:'Porfavor introduce una dirección de email valida'
    }
  }
}

const validator = new Validator()

export default validator 
