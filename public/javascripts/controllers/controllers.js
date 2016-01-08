(function(){

	var app = angular.module('controllers',[]);

	var lipsum = "Lorem ipsum dolor sit amet, ut summo quaestio ius. Ea pri imperdiet prodesset theophrastus, sea cu ubique honestatis. Utamur albucius ius no, tantas qualisque pro cu. Probatus convenire deseruisse quo at, quidam qualisque his ei. Ei nam dicat semper, eripuit salutatus cu pri, cum et suas periculis aliquando. Ut vix enim stet, ea nibh oratio vivendum vis.Dolore feugait quo ei, vel nisl noluisse facilisi ex. Est id doming detracto oportere, te vis aperiri copiosae moderatius. Has in dicat lucilius, vix ullum tacimates maiestatis id. Dicam omnesque ei vel, choro dicam veritus no eam. No discere corrumpit vix.";


	//main-controller
	app.controller('MainCtrl',[ '$scope', 'posts','auth' , function($scope, posts, auth) {
		
		$scope.posts = posts.posts;
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.lipsum = lipsum;

		$scope.addPost = function(){
			if(!$scope.title || $scope.title === '') {return;}
			posts.create({
				title: $scope.title,
				link: $scope.link
			});
			$scope.title = '';
			$scope.link = '';
		};

		$scope.incrementUpvotes = function(post) {
			posts.upvote(post);
		};

	}]);

	//post-controller
	app.controller('PostsCtrl',['$scope', 'posts', 'post', 'auth', function($scope, posts, post, auth) {
		$scope.post = post;
		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.addComment = function() {
			if(!$scope.body || $scope.body === '') { return; }
			posts.addComment(post._id, {
				body: $scope.body,
				author: 'Razat'
			}).success(function(comment) {
				$scope.post.comments.push(comment);
			});

			$scope.body = '';
		}

		$scope.incrementUpvotes = function(comment) {
			posts.upvoteComment(post, comment);
		};

	}]);

	//Auth-controller
	app.controller('AuthCtrl',['$scope', '$state', 'auth', function($scope, $state, auth){
		$scope.user = {};

		$scope.register = function() {
			auth.register($scope.user).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('home');
			});
		};

		$scope.logIn = function() {
			auth.logIn($scope.user).error(function(error){
				$scope.error = error;
			}).then(function() {
				$state.go('home');
			});
		};
	}]);

	//Navbar-controller
	app.controller('NavCtrl',['$scope', 'auth', function($scope, auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logOut;
	}]);

})();