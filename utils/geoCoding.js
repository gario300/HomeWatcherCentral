import axios from 'axios'
const GEOCODING_API_KEY = 'AIzaSyCculBHxwbJ_nLgZfGEEVP4hh7aoTcF6Ss'
class GeoCoding {
  constructor() {}
  
  reverseGeoCoding(lat, lng){
    return new Promise ( (resolve, reject) => {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODING_API_KEY}`)
        .then( response => {
          if (response.data.status == 'OK') {
            resolve(response.data.results[0].formatted_address)      
          } else {
            reject(false)
          }
        }).catch(err => {
          console.log(err)
        })
    })
  }

}

export default new GeoCoding()
