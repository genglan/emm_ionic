angular.module('starter.controllers', [])
//登录
.controller('LoginCtrl',function ($scope,$http,$state){
	$scope.user = {
		'name': "8611018517",
		'pwd': "195788"
	}
	//登录
	$scope.login =function (user){
		loginFun ($scope,$http,$state,user);
        //$state.go('app.home_page');
    }
})
//个人中心
.controller('PersonalCtrl', function($scope) {
})
//主页
.controller('HomePageCtrl', function($scope,$http,$compile) {
	//查询所有应用
	loadApp($scope,$http,$compile);
	//更新、下载、打开
	$scope.downloadOrUpdate = function (i,appId) {
        $scope.objData = $scope.all_app[i];
        var state = document.getElementById(appId+"state").value;
        if('1'==state || '2'==state){//下载、更新
            downloadApp($scope,$http);
        }else{//打开
        	if ('APP' == $scope.objData.service_type) {//打开原生应用
        		openApp($scope.objData.schemesUrl,"",function (){
					console.log("原生应用打开成功！")
				},
				function (){
					console.log("打开原生应用失败！")
				});
        	}else if('NATIVE' == $scope.objData.service_type){//打开NATIVE应用
        		openNativeApp($scope.objData.appId);
        	}else{//打开SERVICE
                alert("打不开的！")
	     		//$state.go(page,{'appId':appId,'appsourceid':$scope.objData.appsourceid});
        	}
        }
	}
})
