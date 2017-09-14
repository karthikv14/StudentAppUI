var assert = chai.assert;
var expect = chai.expect;
var sandbox = sinon.sandbox.create();
describe("The Student CRUD App", function(){        
    describe("the student controller", function(){
        beforeEach(function(){
          module('StudentCrudApp');
          inject(function($injector, $rootScope){
                $scope = $rootScope.$new();
                studentService = $injector.get("studentService");
                $httpBackend = $injector.get("$httpBackend");  
                $controller = $injector.get("$controller");               
          });
          
        });
        
        it("should get all the students", function(){         
            $controller("studentController",{$scope:$scope, studentService : studentService});
            $httpBackend.expectGET('http://localhost:8080/students')
                .respond([{id:1,firstName:'John',lastName:'Doe'}]);
            $httpBackend.flush();
            $scope.getAll();           
            expect($scope.students.length).equal(1);              
        });
        
        it("should create a student", function(){         
            $controller("studentController",{$scope:$scope, studentService : studentService});
            $scope.student = {firstName:'John',lastName:'Doe'};
            $scope.resetForm = function(){}
            $httpBackend.expectPOST('http://localhost:8080/students',JSON.stringify($scope.student)).respond({id:1,firstName:'John',lastName:'Doe'});
            $scope.save(); 
            $httpBackend.flush();
                      
            expect($scope.students.length).equal(1);              
        });
        
        it("should update a student", function(){         
            $controller("studentController",{$scope:$scope, studentService : studentService});
            $scope.student = {id:1,firstName:'Jane',lastName:'Doe'};
            $scope.students = [{id:1,firstName:'John',lastName:'Doe'}]
            $scope.resetForm = function(){}
            $scope.editIndex = 0;
            $httpBackend.expectPUT('http://localhost:8080/students',JSON.stringify($scope.student)).respond({id:1,firstName:'Jane',lastName:'Doe'});
            $scope.save(); 
            $httpBackend.flush();
                      
            expect($scope.students[0].firstName).equal('Jane');              
        });
        
        it("should delete a student if confirmation is yes", function(){         
            $controller("studentController",{$scope:$scope, studentService : studentService});
            $scope.students = [{id:1,firstName:'John',lastName:'Doe'}]
            $scope.resetForm = function(){}
            $scope.editIndex = 0;
            sandbox.stub(window, 'confirm').returns(true); $httpBackend.expectDELETE('http://localhost:8080/students/1').respond();
            $scope.delete(1,0); 
            $httpBackend.flush();
                      
            expect($scope.students.length).equal(0);              
        });

        it("should not delete a student if confirmation is no", function(){           sandbox.restore();  
            $controller("studentController",{$scope:$scope, studentService : studentService});
            $scope.students = [{id:1,firstName:'John',lastName:'Doe'}]
            $scope.resetForm = function(){}
            $scope.editIndex = 0;
            sandbox.stub(window, 'confirm').returns(false); 
            $scope.delete(1,0); 
            expect($scope.students.length).equal(1);              
        });

    });
})

