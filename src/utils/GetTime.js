import moment from 'moment';

// const GetTime = (timestemp, formate) => {
//     return moment(report.createdAt).local().format(formate)
// }


const GetDate = (timestemp, formate) => {
    return moment(timestemp).local().format(formate)
}



export default GetDate