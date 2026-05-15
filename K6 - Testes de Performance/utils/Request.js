import http from 'k6/http';

class Request {
    
    get(url, headers){
        return http.get(url, { headers })
    }

    post(url, payload, headers){
        return http.post(url, payload, { headers})
    }

    put(url, payload, headers){
        return http.put(url, payload, { headers })
    }

}

export default new Request()
