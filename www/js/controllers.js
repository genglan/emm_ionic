angular.module('starter.controllers', [])
//登录
.controller('LoginCtrl',function ($scope,$http,$state,$timeout){
	$scope.user = {
		'userName': "8611018517",
		'password': "195788"
	}
    //登录
	$scope.login =function (user){
		loginFun ($scope,$http,$state,user);
        //$state.go('app.home_page');
    }
})
//个人中心
.controller('PersonalCtrl', function($scope) {
	$scope.name = storage.name ; 
	$scope.phone = storage.phone ; 
})
//主页
.controller('HomePageCtrl', function($scope,$http,$compile,$interval) {
	//查询所有应用
	loadApp($scope,$http,$compile);
	//间隔
	$interval(function (){
		loadApp($scope,$http,$compile);
	},2000000);//大概33分钟执行一次
	//更新、下载、打开
	$scope.downloadOrUpdate = function (i,appId) {
        $scope.objData = $scope.all_app[i];
        var state = document.getElementById(appId+"state").value;
        if('1'==state || '2'==state){//下载、更新
            downloadApp($scope,$http);
        }else{//打开
        	if ('NATIVE' == $scope.objData.codeStyleText) {//打开原生应用
        		var openUrl = "";
        		if(brows().android){
        			openUrl = $scope.objData.pkgname ;
        		}else{
        			openUrl = $scope.objData.schemesUrl;
        		}
        		var j={
        			"userName":storage.userName,
        			"password":storage.password
        		}
        		openApp(openUrl,j,function (){
					console.log("原生应用打开成功！")
				},
				function (){
					console.log("打开原生应用失败！")
				});
        	}else if('WEBSERVICE' == $scope.objData.codeStyleText){//打开WEBSERVICE应用
        		openNativeApp($scope.objData.appId);
        	}else{//打开SERVICE
                alert("打不开的！")
	     		//$state.go(page,{'appId':appId,'appsourceid':$scope.objData.appsourceid});
        	}
        }
	}
})
