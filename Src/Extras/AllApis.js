
const Test = 'http://api-danzends.herokuapp.com';
const Live = 'https://danzen.a2hosted.com'
const jugaad = 'http://192.251.198.43:3000'




let GetCities = `${jugaad}/GetCities`;
let GetSpecialities = `${jugaad}/GetSpecialities`;
let LoginApi = `${jugaad}/LoginForDoctor`;
let SignUpApi = `${jugaad}/DoctorSignup`;
let BooksApi = `${jugaad}/GetBooks`;
let getProfileDetails = `${jugaad}/GetUserProfile`
let UpdateProfileForDoctors = `${jugaad}/UpdateProfileDoctor`
let DashboardBanners = `${jugaad}/getDashboardBanners`
let QuizQuestions = `${jugaad}/GetQuestions`
let getArticles = `${jugaad}/GetArticles`
let GetHangmanQuestions = `${jugaad}/GetHangmanQuestions`
let TimeInApi = `${jugaad}/TimeIn`
let TimeOutApi = `${jugaad}/TimeOut`
let GetNotifications = `${jugaad}/GetNotifications`
let forgetPw = `${jugaad}/forgotPassword`
let GetGFPQuestions = `${jugaad}/GetGFPQuestions`
let GetTimeSpent = `${jugaad}/GetTimeSpent`
let GetRewards = `${jugaad}/getRewardItems` 
let GetNews = `${jugaad}/Getnews` 
let GetTopScorer = `${jugaad}/GetTopScorer` 


// let GoogleKey = `AIzaSyCvfnL49gmlOZVHpD0hHREXmbTHFeuNuEM`; //Production key
let GoogleKey = `AIzaSyAX2oU9u2QkRrTCaG5tRAMG-Fq219mp0EI`; //Android Key


const GetCancelReasonsforMRIDE = `${jugaad}/api/MRide/GetCancelReasons?UserTypeId=2&ReasonType=1`;


const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
  }
  
export {GetCities, 
    GetSpecialities, 
    LoginApi, 
    SignUpApi,
    BooksApi,
    getProfileDetails,
    DashboardBanners,
    QuizQuestions,
    getArticles,
    GetTimeSpent,
    TimeInApi,
    GetNews,
    GetTopScorer,
    TimeOutApi,
    GetHangmanQuestions,
    GetNotifications,
    forgetPw,
    GetGFPQuestions,
    GetRewards,
    UpdateProfileForDoctors,
  fetch_url_encoded};

export  default encodeFormData;

const fetch_url_encoded = function(API, params){
  let BODY  = encodeFormData(params);
  var promise =  new Promise(function(resolve, reject){
    fetch(API, {
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: BODY
    })
    .then((res)=>res.json())
    .then((json)=>{
      let {Result} = json;
      console.log(Result)
      console.log(`Result Coded`)
      resolve(Result)
    }).catch((err)=>{
      reject(err)
    });
  });
  return promise;
}