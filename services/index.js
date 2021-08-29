
import request from '../utils/request'


export const getToDayHot = title => request.get(`https://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=${title}`)