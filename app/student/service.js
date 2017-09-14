app.service('studentService',function($http, $q){
    const url = "http://localhost:8080/students";
    
    this.getStudents = ()=>{
       return $http.get(url)
           .then((result)=>result.data,(error)=> $q.reject(error.data)
        ); 
    }
    
    this.save = (student)=>{
        if(student.id){
           return $http.put(url,JSON.stringify(student))
               .then((result)=>result.data,(error)=>$q.reject(error.data)
           ); 
        }else{
          return $http.post(url,JSON.stringify(student))
              .then((result)=>result.data,
                    (error)=>$q.reject(error.data)
          );  
        }
    }
    
    this.delete = (studentId)=>{
      return $http.delete(url+"/"+studentId).then((result)=>result.data 
          ,(error)=>$q.reject(error.data)
      );   
    }
});