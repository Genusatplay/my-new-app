const api = {

    jwtHeader: function () {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', "Bearer " + sessionStorage.getItem("accessToken"));
        return myHeaders;
    }
}

export default api;


