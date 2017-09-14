app.controller('studentController',function(studentService, $scope){
    $scope.students = [];
    $scope.student = {id:'', firstName:'', lastName:''};
    $scope.errorMessages = [];
    $scope.editIndex = -1;
    
    $scope.getAll = ()=>{
        $scope.errorMessages = [];
        studentService.getStudents()
            .then((students)=>{
                $scope.students = students;
            }
        ,(error)=>{
            if(error){
                $scope.errorMessages = error.messages;
            }
        });
    }
    
    $scope.getAll();
    
    $scope.save = ()=>{
      $scope.errorMessages = [];
      studentService.save($scope.student)
          .then((student)=>{
            //$scope.getAll();
              if($scope.student.id){
                  $scope.students[$scope.editIndex] = student;
              }else{
                  $scope.students.push(student);
              }       
              $scope.resetForm();
          },(error)=>{
            if(error){
                $scope.errorMessages = error.messages;
            }
        });   
    }
    
    $scope.resetForm = ()=>{
        $scope.student = {id:'', firstName:'', lastName:''};
        $scope.studentForm.$setPristine();
        $scope.studentForm.$setUntouched();
    }
    
    $scope.edit = (index)=>{
        $scope.editIndex = index;
        $scope.student = angular.copy($scope.students[index],$scope.student);
    }
    
    $scope.delete = (studentId, index)=>{
        $scope.errorMessages = [];
        if(confirm('Are you sure you want to delete ?')){
            studentService.delete(studentId)
            .then(()=>$scope.students.splice(index, 1),
                  (error)=>$scope.errorMessages = error.messages
            );  
        }
        
    }
});